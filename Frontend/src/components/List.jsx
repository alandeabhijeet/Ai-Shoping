import React from 'react';

const List = () => {
  return (
    <div className="p-1 w-full min-h-screen text-stone-50 bg-gray-700 flex flex-col	 justify-center items-center">
      <div className="flex flex-wrap justify-around items-center">
        <div className="w-72 h-1/3 bg-gray-700 rounded-lg overflow-hidden shadow-lg shadow-black m-4"  >
          <img
            src="https://images.unsplash.com/photo-1561909848-977d0617f275?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Spark Shoe"
            className="h-48 w-full object-cover"
          />
          <div className="p-4 text-center">
            <div className="text-gray-400 mb-1">7 Colors</div>
            <div className="text-gray-400 mb-2">Sizes: 7, 8, 9</div>
            <div className="text-lg font-bold mb-2">Spark Shoe</div>
            <div className="text-gray-300 text-sm mb-2">
              <span className="line-through text-red-500 mr-2">
                Original Price: $120
              </span>
              <span className="text-green-400 font-bold">Discount: 18%</span>
            </div>
            <hr></hr>
            <button className="mt-2
            bg-gray-900 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition-all">
            MRP: $100 (<i>including GST</i>)
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default List;
