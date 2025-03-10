import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-black text-white px-4 py-6">

        <section className="flex flex-col md:flex-row items-center justify-center    bg-black">
            <div className="w-full  pr-6 mr-6 md:w-1/2 md:pl-12 mt-6 md:mt-0 text-center ">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">FEATURED PRODUCTS</h2>
            </div>
        </section>
           
            
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-4">
                <button
                    className="bg-orange-500 text-black px-8 md:px-4 py-3 md:py-4 font-semibold border border-black hover:bg-white hover:text-orange-500 transition"
                    onClick={() => navigate("/sprite")}
                >
                    SPRIRIT
                    <div className="flex justify-center mt-2">
                         <img
                         src="/sprit.jpg"
                         alt="sprit"
                         className="w-40 max-w-2xl h-60 object-cover"
                         />
                    </div>
                </button>
                <button
                    className=" bg-orange-500 text-black px-4 md:px-4 py-3 md:py-4 font-semibold border border-black hover:bg-white hover:text-orange-500 transition"
                    onClick={() => navigate("/ShakeBeer")}
                >
                    SHAKE AND BEER
                    <div className="flex justify-center mt-2">
                         <img
                         src="/beer.jpg"
                         alt="beer"
                         className="w-40 max-w-2xl h-60 object-cover"
                         />
                    </div>
                </button>
                <button
                    className="bg-orange-500 text-black px-8 md:px-4 py-3 md:py-4 font-semibold border border-black hover:bg-white hover:text-orange-500 transition"
                    onClick={() => navigate("/WineStore")}
                >
                    WINE
                    <div className="flex justify-center mt-2">
                        <img
                        src="/wine.jpg"
                        alt="wine"
                        className="w-40 max-w-2xl h-60 object-cover"
                        />
                    </div>
                </button>
            </div>
             </div>
    );
};

export default FeaturedProducts;
