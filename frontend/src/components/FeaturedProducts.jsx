import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-black text-white px-4 py-6">
            <h2 className="text-center text-xl font-semibold mb-4">
                FEATURED PRODUCTS
            </h2>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4">
                <button
                    className="bg-orange-500 text-black px-8 md:px-16 py-3 md:py-4 font-semibold border border-black hover:bg-white hover:text-orange-500 transition"
                    onClick={() => navigate("/Sprite")}
                >
                    SPRITE
                </button>
                <button
                    className="bg-orange-500 text-black px-4 md:px-6 py-3 md:py-4 font-semibold border border-black hover:bg-white hover:text-orange-500 transition"
                    onClick={() => navigate("/ShakeBeer")}
                >
                    SHAKE AND BEER
                </button>
                <button
                    className="bg-orange-500 text-black px-8 md:px-16 py-3 md:py-4 font-semibold border border-black hover:bg-white hover:text-orange-500 transition"
                    onClick={() => navigate("/WineStore")}
                >
                    WINE
                </button>
            </div>
            <div className="flex justify-center">
                <img
                    src="/back.jpg"
                    alt="Featured Products"
                    className="w-full max-w-3xl h-auto object-cover"
                />
            </div>
        </div>
    );
};

export default FeaturedProducts;
