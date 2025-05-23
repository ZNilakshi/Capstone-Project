import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    name: "Spirit",
    image: "/sprit.jpg",
    path: "/sprite",
    tag: "🔥 Bestseller",
    description: "Refined and bold. Discover a collection of premium spirits to elevate your evenings.",
  },
  {
    name: "Shake & Beer",
    image: "/beer.jpg",
    path: "/ShakeBeer",
    tag: "🍺 Chill Vibes",
    description: "Crisp and refreshing. The perfect choice for relaxed moments and friendly hangouts.",
  },
  {
    name: "Wine",
    image: "/wine.jpg",
    path: "/WineStore",
    tag: "🍷 Classic Taste",
    description: "Sophistication in every sip. Explore the finest selection of red, white, and sparkling wines.",
  },
];

const FeaturedProducts = () => {
  const navigate = useNavigate();

  return (
    <section className="relative px-4 py-20 overflow-hidden text-white sm:px-10 lg:px-20 bg-gradient-to-b from-black via-zinc-900 to-black">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[80vw] h-[80vw] bg-gradient-to-tr from-orange-500 to-pink-500 rounded-full opacity-10 blur-3xl -top-20 -left-40" />
        <div className="absolute w-[60vw] h-[60vw] bg-gradient-to-bl from-purple-500 to-orange-400 rounded-full opacity-10 blur-2xl bottom-0 right-0" />
      </div>

      {/* Title */}
      <h2 className="mb-16 text-4xl font-extrabold tracking-tight text-center text-orange-400 md:text-5xl drop-shadow-xl">
        ✨ Featured Products
      </h2>

      {/* Cards Container */}
      <div className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {products.map((product, index) => (
          <div
            key={index}
            onClick={() => navigate(product.path)}
            className="snap-center shrink-0 relative w-[280px] md:w-[280px] lg:w-[300px] transition-transform duration-300 border border-orange-500 shadow-lg cursor-pointer group bg-white/5 rounded-3xl backdrop-blur-lg hover:shadow-orange-300/40 hover:-translate-y-2"
          >
            {/* Image */}
            <div className="overflow-hidden rounded-t-3xl">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-56 transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Tag */}
            <span className="absolute px-4 py-1 text-xs font-semibold text-black bg-orange-500 rounded-full shadow-md top-4 left-4">
              {product.tag}
            </span>

            {/* Content */}
            <div className="p-6 space-y-4 text-center">
              <h3 className="text-2xl font-bold text-orange-200 transition group-hover:text-white">
                {product.name}
              </h3>
              <p className="text-sm leading-relaxed text-gray-300">
                {product.description}
              </p>
              <button className="px-6 py-2 mt-4 font-semibold text-black transition-all bg-orange-500 rounded-full hover:bg-white hover:text-orange-500">
                Explore Now →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
