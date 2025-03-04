import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-black text-white ">
      <h2 className="text-center text-xl font-semibold mb-4">FEATURED PRODUCTS</h2>
      <div className="flex justify-center gap-4 mb-4">
        <button className="bg-orange-500 text-black px-16 py-4 font-semibold border border-black hover:bg-white hover:text-orange-500"
         onClick={() => navigate("/spirit")} >
          SPIRIT
        </button>
        <button className="bg-orange-500 text-black px-6 py-4 font-semibold border border-black hover:bg-white hover:text-orange-500 "
         onClick={() => navigate("/shake-and-beer")}>
          SHAKE AND BEER
        </button>
        <button className="bg-orange-500 text-black px-16 py-4 font-semibold border border-black hover:bg-white hover:text-orange-500 "
        onClick={() => navigate("/WineStore")}>
          WINE
        </button>
      </div>
      <div className="flex justify-center">
        <img
          src="/back.jpg"
          alt="Featured Products"
          className="w-full max-w-full h-[400px]"
        />
      </div>
    </div>
  );
};

export default FeaturedProducts;
