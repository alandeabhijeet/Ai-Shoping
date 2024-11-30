import React, { useState, useEffect } from "react";
import neArri from "../assets/newArri.png";
import custfav from "../assets/custfav.png";
import trading from "../assets/trading.png";
import toprated from "../assets/toprated.png";
import { useNavigate } from "react-router-dom";

function HomeSlider() {
  let navigate = useNavigate()
  let route = (s)=>{
    navigate(`/list?q=${s}`);
  }
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    {
      id: 1,
      name: "New Arrivals",
      image: neArri,
      description: "Check out our latest products and collections",
    },
    {
      id: 2,
      name: "Top-rated Products",
      image: toprated,
      description: "Most loved items by our customers",
    },
    {
      id: 3,
      name: "Trending Products",
      image: trading,
      description: "See what's popular right now",
    },
    {
      id: 4,
      name: "Customer Favorites",
      image: custfav,
      description: "Highest rated items chosen by our community",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) =>
        current === categories.length - 1 ? 0 : current + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setActiveIndex((current) =>
      current === categories.length - 1 ? 0 : current + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? categories.length - 1 : current - 1
    );
  };

  return (
    <div className="w-full px-4 py-8 bg-gray-700">
      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center">
          <button
            onClick={prevSlide}
            className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-700"
          >
            <span className="text-gray-600 text-2xl">{"<"}</span>
          </button>

          <div className="w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {categories.map((category) => (
                <div key={category.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="relative h-[400px]">
                      <img
                        src={category.image}
                        alt={`${category.name} category showcase`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-6 text-white">
                          <h2 className="font-montserrat text-3xl font-bold mb-2">
                            {category.name}
                          </h2>
                          <p className="font-montserrat text-lg mb-4">
                            {category.description}
                          </p>
                          <button
                            onClick={() => route(category.name)}
                            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                          >
                            Explore Collection
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-800"
          >
            <span className="text-gray-600 text-2xl">{">"}</span>
          </button>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex ? "bg-blue-600" : "bg-gray-800"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeSlider;
