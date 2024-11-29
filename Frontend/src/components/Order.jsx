import React from 'react';

const Order = () => {
  return (
    <div className="p-4 w-full min-h-screen text-stone-50 bg-gray-700 flex flex-col items-center space-y-6">
      <div className="w-full bg-gray-600 rounded-lg p-4 shadow-lg shadow-black">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Order #2</h3>
          <span className="px-4 py-2 bg-gray-800 text-white rounded-lg">In Transit</span>
        </div>
        <div className="flex justify-between items-center">
          <img
            src=    "https://images.unsplash.com/photo-1521774971864-62e842046145?w=600&auto=format&fit=crop&q=60"
            alt="Running Shoes"
            className="w-1/6 rounded-lg h-24"
          />
          <div className="h-full w-px bg-gray-400 mx-4"></div>
          <div className="text-right space-y-2">
            <p>Quantity: 1</p>
            <p className="text-lg font-semibold">$89.99</p>
          </div>
        </div>
        <hr className="my-4 border-gray-500" />
        <div className="flex justify-end space-x-4">
          <button className="px-4 py-2 bg-white text-black rounded-lg">Review Order</button>
          <button className="px-4 py-2 bg-black text-white rounded-lg">Buy Again</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Cancel Order</button>
        </div>
      </div>
    </div>
  );
};

export default Order;
