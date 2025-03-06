import { useState } from "react";
import { motion } from "framer-motion";

const products = [
    { id: 1, name: "Sprite Classic", price: 2.00, points: "4.5", image: "/bottle1.png", type: "Classic" },
    { id: 2, name: "Sprite Zero", price: 2.50, points: "4.7", image: "/bottle2.png", type: "Zero" },
    { id: 3, name: "Sprite Lemon", price: 2.20, points: "4.6", image: "/bottle3.png", type: "Lemon" },
];

const FilterableProductList = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [priceRange, setPriceRange] = useState(5);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const filters = [
    { name: "SPRITE TYPE", options: ["Classic", "Zero", "Lemon"] },
    { name: "PRICE RANGE", options: [], isRange: true },
  ];

  const toggleTypeFilter = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredProducts = products.filter(
    (product) => product.price <= priceRange && (selectedTypes.length === 0 || selectedTypes.includes(product.type))
  );

  return (
    <div className="flex flex-col md:flex-row p-4 mt-24 gap-4">
      {/* Filters Section */}
      <div className="w-full md:w-1/5 border-r pr-4">
        <h2 className="font-bold text-lg mb-4">FILTER</h2>
        {filters.map((filter, index) => (
          <div key={index} className="border-b py-3">
            <button
              onClick={() => setActiveFilter(activeFilter === index ? null : index)}
              className="w-full text-left font-semibold flex items-center justify-between"
            >
              {filter.name}
              <motion.span
                animate={{ rotate: activeFilter === index ? 90 : 0 }}
                className="ml-2 text-2xl font-bold"
              >
                ›
              </motion.span>
            </button>
            {activeFilter === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden p-2 text-sm text-gray-700"
              >
                {filter.isRange ? (
                  <div>
                    <input 
                      type="range" 
                      className="w-full" 
                      min="2" 
                      max="5" 
                      step="0.1" 
                      value={priceRange} 
                      onChange={(e) => setPriceRange(parseFloat(e.target.value))} 
                    />
                    <div className="text-center mt-2 font-semibold">Rs.{priceRange.toFixed(2)}</div>
                  </div>
                ) : (
                  filter.options.map((option, idx) => (
                    <label key={idx} className="block items-center space-x-2">
                      <input 
                        type="checkbox" 
                        className="mr-2" 
                        checked={selectedTypes.includes(option)}
                        onChange={() => toggleTypeFilter(option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))
                )}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Products Section */}
      <div className="w-full md:w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {filteredProducts.map((product, index) => (
        <div
          key={product.id}
          className="relative border border-gray-300 p-6 shadow-md bg-white flex flex-col items-center text-center rounded-lg"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative w-full p-2">
            <span className="absolute top-2 right-2 border border-orange-400 px-3 py-3 text-xs font-bold bg-white">
            {product.points} POINTS
            </span>
            <img src={product.image} alt={product.name} className="w-41 mx-auto" />
            <h3 className="font-bold mt-2">{product.name}</h3>
            <p className="font-semibold text-lg mt-1">Rs.{product.price.toFixed(2)}</p>
          </div>
          <motion.div
            animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
            className="absolute bottom-0 bg-white border border-gray-400 p-4 shadow-lg w-full flex flex-col items-center text-center rounded-lg transition-opacity duration-300"
          >
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-gray-700">
              <span className="font-semibold">Price</span> <br /> Rs.{product.price.toFixed(2)}
            </p>
            <div className="flex items-center mt-2">
              <button className="border border-gray-400 px-2">-</button>
              <span className="px-2">1</span>
              <button className="border border-gray-400 px-2">+</button>
              <span className="ml-2">Qty</span>
            </div>
            <button className="mt-2 w-full bg-orange-500 text-white py-2 rounded">
              ADD TO CART
            </button>
          </motion.div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default FilterableProductList;
