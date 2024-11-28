import React, { useState } from 'react';

const List = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "Classic White Sneakers",
      price: 89.99,
      rating: 4.5,
      reviews: 128,
      sizes: ["6", "7", "8", "9", "10", "11"],
      colors: ["White", "Black", "Gray"],
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=60",
      description:
        "Premium comfort sneakers perfect for everyday wear. Features breathable mesh upper and cushioned sole.",
      inStock: true,
      brand: "Comfort Plus",
    },

  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
        ></i>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-400 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <img
              src={product.image}
              alt={`${product.name} product image`}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="font-crimson-text text-xl font-bold mb-2">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">{renderStars(Math.round(product.rating))}</div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
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
                    src={selectedProduct.image}
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
                      <i className="fas fa-times text-2xl"> </i>
                    </button>
                  </div>
                  <p className="text-gray-600 mb-4">{selectedProduct.brand}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">{renderStars(Math.round(selectedProduct.rating))}</div>
                    <span className="text-gray-600">
                      ({selectedProduct.reviews} reviews)
                    </span>
                  </div>
                  <p className="text-green-600 font-bold text-2xl mb-4">
                    ${selectedProduct.price}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {selectedProduct.description}
                  </p>
                  <div className="mb-4">
                    <h3 className="font-bold mb-2">Available Sizes:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          className="px-4 py-2 border  border-slate-900 rounded-md hover:bg-gray-100"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-bold mb-2">Available Colors:</h3>
                    <div className="flex gap-2">
                      {selectedProduct.colors.map((color) => (
                        <div
                          key={color}
                          className="w-8 h-8 rounded-full border"
                          style={{ backgroundColor: color.toLowerCase() }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
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
