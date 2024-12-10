import React, { useEffect, useState } from "react";

const Ai = () => {
  const backendUrl = import.meta.env.VITE_URL;
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const starterMessage = {
    type: "ai",
    message: "Hello! How can I assist you today? Feel free to ask anything.",
  };

  useEffect(() => {
    setMessages([starterMessage]);
  }, []);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = { type: "user", message: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userInput }),
      });

      const result = await response.json();
      const productId = result.search_results[0]._id;
      console.log(productId)
      const productResponse = await fetch(`${backendUrl}/ai?id=${productId}`);
      const productResult = await productResponse.json();

      const productDetails = productResult.product;
      const aiMessage = {
        type: "ai",
        message: (
          <div className="p-4 bg-gray-700 rounded-lg text-white">
            <img
              src={productDetails.images}
              alt={productDetails.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold">{productDetails.name}</h3>
            <p className="text-sm text-gray-300">{productDetails.description}</p>
            <p className="mt-2">
              <span className="font-bold">Price:</span> ${productDetails.price}
            </p>
            <p>
              <span className="font-bold">Stock:</span> {productDetails.stock}
            </p>
          </div>
        ),
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      const errorMessage = {
        type: "ai",
        message: "Sorry, something went wrong. Please try again later.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setUserInput("");
  };

  return (
    <div className="p-1 w-full min-h-screen text-stone-50 bg-gray-600 flex flex-col justify-between items-center">
      <div className="flex justify-between items-center w-full p-4 bg-gray-700">
        <i className="fas fa-robot text-3xl text-blue-400"></i>
        <div>
          <h2 className="font-roboto text-xl font-bold text-gray-100">AI Assistant</h2>
          <p className="font-roboto text-sm text-gray-400">Always here to help</p>
        </div>
      </div>
      <div className="flex-grow w-full p-4 overflow-y-auto bg-gray-800">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.type === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              {message.message}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full p-4 bg-gray-700 flex gap-4">
        <input
          className="flex-grow p-2 border rounded-lg text-zinc-800"
          type="text"
          placeholder="Enter your message"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          type="button"
          className="w-1/5 font-roboto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSend}
        >
          <i className="fas fa-paper-plane mr-2"></i>
          Send
        </button>
      </div>
    </div>
  );
};

export default Ai;
