import React from "react";
import men from "../assets/men.png";
import women from "../assets/women.png";
import bag from "../assets/bag.png";
import beauty from "../assets/beauty.png";
import { useNavigate } from "react-router-dom";
export default function HomeCategeory() {
    let navigate = useNavigate()
    let route = (s)=>{
        navigate(`/list?q=${s}`);
    }
  return (
    <div className="min-w-full min-h-fit flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Featured Collections</h1>
      <div className="min-w-full bg-gray-700 text-gray-500 flex flex-wrap justify-around items-center p-4">
        {/* Men's Collection */}
        <div className="w-1/3 h-80 bg-gray-700 flex flex-col items-center justify-between m-2 p-4 rounded shadow-lg shadow-black m-8">
          <img src={men} alt="Men's Collection" className="h-3/4 w-full object-cover rounded-t" />
          <h2 className="text-lg text-white font-semibold mt-2">Men's Collection</h2>
          <button className="bg-gray-800 text-white px-4 py-2 mt-2 rounded hover:bg-gray-900" onClick={()=>route("boy")}>Shop Now</button>
        </div>

        {/* Women's Collection */}
        <div className="w-1/3 h-80 bg-gray-700 flex flex-col items-center justify-between m-2 p-4 rounded shadow-lg shadow-black m-8">
          <img src={women} alt="Women's Collection" className="h-3/4 w-full object-cover rounded-t" />
          <h2 className="text-lg text-white font-semibold mt-2">Women's Collection</h2>
          <button className="bg-gray-800 text-white px-4 py-2 mt-2 rounded hover:bg-gray-900" onClick={()=>route("girl")}>Shop Now</button>
        </div>

        {/* Bags Collection */}
        <div className="w-1/3 h-80 bg-gray-700 flex flex-col items-center justify-between m-2 p-4 rounded shadow-lg shadow-black m-8">
          <img src={bag} alt="Bags Collection" className="h-3/4 w-full object-cover rounded-t" />
          <h2 className="text-lg text-white font-semibold mt-2">Bags Collection</h2>
          <button className="bg-gray-800 text-white px-4 py-2 mt-2 rounded hover:bg-gray-900" onClick={()=>route("bag")}>Shop Now</button>
        </div>

        {/* Beauty Collection */}
        <div className="w-1/3 h-80 bg-gray-700 flex flex-col items-center justify-between m-2 p-4 rounded shadow-lg shadow-black	m-8">
          <img src={beauty} alt="Beauty Collection" className="h-3/4 w-full object-cover rounded-t" />
          <h2 className="text-lg text-white font-semibold mt-2">Beauty Collection</h2>
          <button className="bg-gray-800 text-white px-4 py-2 mt-2 rounded hover:bg-gray-900 m-4" onClick={()=>route("beauty")} >Shop Now</button>
        </div>
      </div>
    </div>
  );
}
