import React from "react";
import { useNavigate } from "react-router-dom";

const brands = [
    { name: "Rockland", logo: "/Rockland-Logo.png", path: "/brand/rockland", glow: "hover:shadow-yellow-500" },
    { name: "IDL", logo: "/idl-logo.png", path: "/brand/idl", glow: "hover:shadow-cyan-400" },
    { name: "DCSL", logo: "/DCSL_Logo.png", path: "/brand/dcsl", glow: "hover:shadow-red-500" },
    { name: "Mendis", logo: "/mendis_logo.png", path: "/brand/mendis", glow: "hover:shadow-blue-500" },
    { name: "Lion", logo: "/lion-logo.png", path: "/brand/lion", glow: "hover:shadow-amber-400" },
    { name: "Heineken", logo: "/heineken-logo.png", path: "/brand/heineken", glow: "hover:shadow-lime-400" },
];

const ShopByBrand = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen px-6 py-20 font-sans text-white bg-gradient-to-br from-gray-950 via-black to-gray-900">
            <header className="mb-16 text-center">
                <h1 className="text-5xl font-bold uppercase tracking-[0.3em] text-orange-400">
                    Shop by Brand
                </h1>
                <p className="mt-4 text-lg tracking-wider text-gray-400">
                    Navigate the universe of premium spirits
                </p>
            </header>

            {/* Horizontal scroll with responsive boxes */}
            <div className="flex px-4 py-8 space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {brands.map((brand, index) => (
                    <button
                        key={index}
                        onClick={() => navigate(brand.path)}
                        className={`flex-shrink-0 relative bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-[2rem] p-4 sm:p-6 md:p-8 w-40 h-52 sm:w-52 sm:h-64 md:w-60 md:h-72 flex flex-col items-center justify-center border border-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 ${brand.glow} hover:ring-2 hover:ring-offset-2 hover:ring-white shadow-xl`}
                    >
                        <img
                            src={brand.logo}
                            alt={`${brand.name} Logo`}
                            className="object-contain mb-4 h-14 sm:h-16 md:h-24 sm:mb-6"
                        />
                        <p className="text-sm font-semibold tracking-wide text-center text-white uppercase sm:text-base md:text-lg drop-shadow-sm">
                            {brand.name}
                        </p>
                        <div className="absolute inset-0 rounded-[2rem] pointer-events-none shadow-[0_0_60px_10px_rgba(255,255,255,0.06)]" />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ShopByBrand;
