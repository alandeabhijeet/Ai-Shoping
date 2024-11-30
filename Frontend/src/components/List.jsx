import React, { useState, useEffect } from "react";
import { getAuthCookie } from "../utils/cookie.js";
import { useNavigate , useLocation  } from "react-router-dom";

const List = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("q");
  const navigate = useNavigate();
  const token = getAuthCookie();
  const backendUrl = import.meta.env.VITE_URL;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const customerName = "Anita";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${backendUrl}/product/list?q=${searchQuery}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          navigate("/error", {
            state: { message: errorData.message || "Something went wrong!" },
          });
          return;
        }

        const productList = await response.json();
        setProducts(productList.data);
      } catch (error) {
        console.error("Fetch error:", error);
        navigate("/error", { state: { message: "Network error!" } });
      }
    };

    fetchProducts();
  }, [backendUrl, token, navigate]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      ></i>
    ));
  };

  const handleBuyNow = async () => {
    if (!selectedProduct) {
      alert("Please select a product first!");
      return;
    }

    if (isNaN(quantity) || quantity < 1) {
      alert("Please enter a valid quantity!");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/buy`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: selectedProduct._id,
          quantity,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Failed to create Razorpay order");
        return;
      }

      const data = await response.json();

      const options = {
        key: import.meta.env.VITE_RAZERPAY_KEYID,
        amount: data.amount,
        currency: data.currency,
        name: "ABHIJEET RAMCHANDRA ALANDE",
        description: "Purchase Product",
        order_id: data.razorpayOrderId,
        handler: async (response) => {
          alert("Payment successful!");
          try {
            const paymentUpdate = await fetch(`${backendUrl}/buy/completed`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ orderId: data.orderId }),
            });

            if (!paymentUpdate.ok) {
              alert("Payment completed, but failed to update order status.");
            }
          } catch (error) {
            console.error("Error updating payment status:", error);
          }
        },
        prefill: { name: customerName },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => setSelectedProduct(product)}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <img
              src={product.images}
              alt={`${product.name} product image`}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="font-crimson-text text-xl font-bold mb-2">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">{renderStars(Math.round(product.AvgRating))}</div>
                <span className="text-gray-600">({product.ratingCount} reviews)</span>
              </div>
              <p className="text-green-600 font-bold text-lg">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-200 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <img
                    src={selectedProduct.images}
                    alt={`${selectedProduct.name} detailed view`}
                    className="w-full h-[400px] object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-1/2">
                  <div className="flex justify-between items-start">
                    <h1 className="font-crimson-text text-2xl font-bold mb-2">
                      {selectedProduct.name}
                    </h1>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <i className="fas fa-times text-2xl"></i>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {renderStars(Math.round(selectedProduct.AvgRating))}
                    </div>
                    <span className="text-gray-600">
                      ({selectedProduct.ratingCount} reviews)
                    </span>
                  </div>
                  <p className="text-green-600 font-bold text-2xl mb-4">
                    ${selectedProduct.price}
                  </p>
                  <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
                  <div className="mb-4">
                    <label htmlFor="quantity" className="block font-bold mb-2">
                      Quantity:
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="px-4 py-2 border rounded-md w-full"
                      min="1"
                    />
                  </div>
                  <button
                    className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                    onClick={handleBuyNow}
                  >
                    <i className="fas fa-shopping-cart"></i> Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
