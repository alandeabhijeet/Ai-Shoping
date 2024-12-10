from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient, errors
from transformers import AutoTokenizer, AutoModelForCausalLM
from sentence_transformers import SentenceTransformer
import os
from dotenv import load_dotenv
import numpy as np

app = Flask(__name__)
CORS(app) 
mongo_uri = "mongodb+srv://filmwatch2023api:22bcs007@cluster0.duzc2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
try:
    client = MongoClient(mongo_uri)
    db = client["api"]
    collection = db["mongo"]
except errors.ConnectionFailure as e:
    raise RuntimeError(f"Failed to connect to MongoDB: {e}")

load_dotenv()
HF_TOKEN = "apikey"
os.environ["HUGGINGFACE_TOKEN"] = HF_TOKEN

try:
    tokenizer = AutoTokenizer.from_pretrained("gpt2")
    model = AutoModelForCausalLM.from_pretrained("gpt2").to("cpu")
except Exception as e:
    raise RuntimeError(f"Failed to load Hugging Face model/tokenizer: {e}")

try:
    embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
except Exception as e:
    raise RuntimeError(f"Failed to load SentenceTransformer model: {e}")

def get_embedding(text: str) -> list:
    if not text.strip():
        return []
    try:
        embedding = embedding_model.encode(text)
        return embedding.tolist()
    except Exception as e:
        raise RuntimeError(f"Error generating embedding: {e}")

def vector_search(user_query: str, collection):
    query_embedding = get_embedding(user_query)
    if not query_embedding:
        return "Invalid query or embedding generation failed."

    pipeline = [
        {
            "$vectorSearch": {
                "index": "vector_index",
                "queryVector": query_embedding,
                "path": "embedding",
                "numCandidates": 150,
                "limit": 1, 
            }
        },
        {
            "$project": {
                "description": 1,
                "price": 1,
                "_id" : 1 ,
                "category": 1,
                "score": {"$meta": "vectorSearchScore"},
            }
        },
    ]

    try:
        result = collection.aggregate(pipeline)
        return list(result)
    except Exception as e:
        return f"Error during vector search: {e}"


@app.route("/api/query", methods=["POST"])
def handle_query():
    data = request.json
    user_query = data.get("query", "").strip()

    if not user_query:
        return jsonify({"error": "Query is required"}), 400

    search_results = vector_search(user_query, collection)

    if isinstance(search_results, str):
        return jsonify({"error": search_results}), 500

    enriched_data = []
    for res in search_results:
        category = res.get("category", "N/A")
        description = res.get("description", "N/A")
        price = res.get("price", "N/A")
        res["_id"] = str(res["_id"])
        enriched_data.append(
            f"Category: {category}, Description: {description}, Price: {price}"
        )

    context_data = "\n".join(enriched_data)
    combined_information = (
        f"You are an AI assistant for a shopping mall.\n\n"
        f"User Query: {user_query}\n\n"
        f"Relevant search results:\n{context_data}\n\n"
        f"Please provide additional suggestions or details based on the description above."
    )

    try:
        input_ids = tokenizer(combined_information, return_tensors="pt").to("cpu")
        response = model.generate(
            **input_ids,
            max_new_tokens=150,
            do_sample=True,
            top_k=50,
            top_p=0.95
        )
        ai_response = tokenizer.decode(response[0], skip_special_tokens=True)
    except Exception as e:
        return jsonify({"error": f"AI response generation failed: {e}"}), 500

    return jsonify({
        "query": user_query,
        "response": ai_response,
        "search_results": search_results
    })


@app.route("/ai/add", methods=["POST"])
def add_to_ai():
    try:
        data = request.json
        product_id = data.get("id")
        name = data.get("name")
        category = data.get("category")
        description = data.get("description")
        price = data.get("price")
        stock = data.get("stock")

        combined_text = f"{description} {name} {price}"
        embedding = get_embedding(combined_text)
        ai_collection = db["mongo"]
        print(product_id + " this is product id ")
        ai_data = {
            "_id": product_id,  
            "name": name,
            "category": category,
            "description": description,
            "price": price,
            "stock": stock,
            "embedding": embedding  
        }
        ai_collection.insert_one(ai_data)

        return jsonify({"success": True, "message": "Data added to AI server"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
