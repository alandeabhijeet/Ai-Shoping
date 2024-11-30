import React, { useState, useEffect } from 'react';
import { getAuthCookie } from "../utils/cookie.js";
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const [showFlash, setShowFlash] = useState(false);
  const [orderArr, setOrder] = useState([]);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_URL;
  const token = getAuthCookie();


  function onSubmitReview (product_id, order_id, user_id , paymentStatus){
    navigate("/list/review", {
      state: { product_id, order_id, user_id , paymentStatus},
    })
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${backendUrl}/order`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          navigate('/error', { state: { message: errorData.message || "Something went wrong!" } });
          return;
        }

        const orderData = await response.json();
        setOrder(orderData.orders); 
      } catch (error) {
        setShowFlash(true);
        navigate("/login", { state: { flashMessage: "Session expired. Please log in again." } });
      }
    }

    fetchData();
  }, [backendUrl, token, navigate]);

  return (
    <div className="p-4 w-full min-h-screen text-stone-50 bg-gray-700 flex flex-col items-center space-y-6">
      {Array.isArray(orderArr) && orderArr.map((oneOrder, index) => (
        <div
          id={`order-${oneOrder._id || index}`} 
          key={oneOrder._id || index} 
          className="w-full bg-gray-600 rounded-lg p-4 shadow-lg shadow-black"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Order #{oneOrder._id}</h3>
            <span className="px-4 py-2 bg-gray-800 text-white rounded-lg">
              {oneOrder.paymentStatus}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <img
              src={oneOrder.product?.images || '/fallback-image.jpg'}
              alt={oneOrder.product?.name || 'Product Image'}
              className="w-1/6 rounded-lg h-24"
            />
            <div className="h-full w-px bg-gray-400 mx-4"></div>
            <div className="text-right space-y-2">
              <p>Quantity: {oneOrder.quantity}</p>
              <p className="text-lg font-semibold">Total: ${oneOrder.totalAmount}</p>
            </div>
          </div>
          <hr className="my-4 border-gray-500" />
          <div className="flex justify-end space-x-4">
            {oneOrder.paymentStatus === "Completed" ? (
              <button className="px-4 py-2 bg-white text-black rounded-lg" onClick={ ()=>onSubmitReview( oneOrder.product._id , oneOrder._id ,oneOrder.user , oneOrder.paymentStatus)}>Review Order</button>
            ) : (
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Cancel Order</button>
            )}
            {oneOrder.stock >= 1 && (
              <button className="px-4 py-2 bg-black text-white rounded-lg">Buy Again</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
