import { useState } from "react";
import { motion } from "framer-motion";

const products = [
  { id: 1, name: "Château Margaux", price: 950, brand: "ROCKLANDS", size: "1L", points: "4.8", abv: "5%", image: "/bottle1.png", type: "Red Wine", varietal: "Cabernet Sauvignon", vintage: "2020" },
  { id: 2, name: "Merlot Reserve", price: 3200, brand: "ROCKLANDS", size: "1L", points: "4.6", abv: "5%", image: "/bottle2.png", type: "Red Wine", varietal: "Merlot", vintage: "2019" },
  { id: 3, name: "Pinot Noir Prestige", price: 9050, brand: "ROCKLANDS", size: "1L", points: "4.7", abv: "5%", image: "/bottle3.png", type: "Rose", varietal: "Pinot Noir", vintage: "2018" },
  { id: 4, name: "Fortified Sweet Wine", price: 2500, brand: "ROCKLANDS", size: "1L", points: "4.5", abv: "5%", image: "/bottle4.png", type: "Fortified Wine", varietal: "Port", vintage: "2017" },
];

const FilterableProductList = () => {
  const [priceRange, setPriceRange] = useState(9050);
  const [selectedBrand, setSelectedBrand] = useState("Any Brand");
  const [selectedSize, setSelectedSize] = useState("Any Size");
  const [selectedAbv, setSelectedAbv] = useState("Any ABV");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const brands = ["ANY BRAND", "ROCKLANDS", "DLL", "DCSL", "MENDIS", "LION", "HEINEKEN"];
  const sizes = ["ANY SIZE", "750ML", "1L", "500ML"];
  const abvLevels = ["ANY ABV", "5%", "6%", "7%", "10%"];

  const filteredProducts = products.filter(
    (product) =>
      product.price <= priceRange &&
      (selectedBrand === "Any Brand" || product.brand === selectedBrand) &&
      (selectedSize === "Any Size" || product.size === selectedSize) &&
      (selectedAbv === "Any ABV" || product.abv === selectedAbv)
  );

  return (
    <div className="flex flex-col md:flex-row p-6 mt-20 gap-6 bg-black text-white">
      {/* Sidebar Filter */}
      <div className="w-full md:w-1/4 p-6 rounded-lg bg-[#2A1205] border  border-orange-500">
        <h2 className="font-bold text-xl mb-4 uppercase text-white tracking-wide">Filter by Price</h2>

        {/* Price Slider */}
        <div className="relative flex flex-col items-center w-full">
          <input
            type="range"
            className="w-full cursor-pointer"
            min="950"
            max="9050"
            step="50"
            value={priceRange}
            onChange={(e) => setPriceRange(parseInt(e.target.value))}
            style={{
              WebkitAppearance: "none",
              appearance: "none",
              height: "6px",
              borderRadius: "5px",
              background: `linear-gradient(to right, red 0%, red ${
                ((priceRange - 950) / (9050 - 950)) * 100
              }%, #ccc ${((priceRange - 950) / (9050 - 950)) * 100}%, #ccc 100%)`,
              outline: "none",
            }}
          />
        </div>

        {/* Price Display */}
        <p className="text-center mt-2 font-semibold">Price: LKR 950 — LKR {priceRange}</p>

        {/* Dropdowns */}
        <h2 className="mt-6 font-bold text-lg mb-2 uppercase text-white">Filter by Brand</h2>
        <select
          className="w-full p-3 bg-white text-black rounded"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          {brands.map((brand, idx) => (
            <option key={idx} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <h2 className="mt-4 font-bold text-lg mb-2 uppercase text-white">Filter by Size</h2>
        <select
          className="w-full p-3 bg-white text-black rounded"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          {sizes.map((size, idx) => (
            <option key={idx} value={size}>
              {size}
            </option>
          ))}
        </select>

        <h2 className="mt-4 font-bold text-lg mb-2 uppercase text-white">Filter by ABV</h2>
        <select
          className="w-full p-3 bg-white text-black rounded"
          value={selectedAbv}
          onChange={(e) => setSelectedAbv(e.target.value)}
        >
          {abvLevels.map((abv, idx) => (
            <option key={idx} value={abv}>
              {abv}
            </option>
          ))}
        </select>
      </div>

      {/* Product Section */}
      <div className="w-full md:w-4/5 bg-black">
      <h1 className="text-center text-4xl font-bold text-gray-300 mb-6">SPITE</h1>

        <div className="w-full flex flex-col md:flex-row items-center bg-orange-500 text-white rounded-lg mb-6 p-6 relative z-10">
  {/* Left Side - Image */}
  <div className="w-full md:w-1/3 flex justify-center">
    <img src="/sprit.jpg" alt="Beer Selection" className="w-60 h-auto rounded-lg shadow-lg" />
  </div>

  {/* Right Side - Details */}
  <div className="w-full md:w-2/3 text-center md:text-left p-4">
    <h2 className="text-lg font-bold uppercase">Our sprite selection is as diverse as it is delightful. From craft brews to classic favorites, we offer a spectrum that caters to every palate. Whether you prefer a crisp lager, a robust stout, or something in between, our curated collection promises to elevate your beer experience. Discover the perfect brew to suit any occasion and indulge in the art of great taste at De Silva Wine Store!</h2>
   
  </div>
</div>


        {/* Product Display Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="relative border border-gray-300 p-6 shadow-md bg-white flex flex-col items-center text-center rounded-lg"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-full p-2">
                <span className="absolute top-2 right-2 border border-orange-400 px-3 py-1 text-xs font-bold bg-white z-10 text-orange-500">
                  {product.points} POINTS
                </span>

                <img src={product.image} alt={product.name} className="w-41 mx-auto" />
                <h3 className="font-bold mt-2 text-black">{product.name}</h3>
                <p className="font-semibold text-lg mt-1 text-black">Rs.{product.price.toFixed(2)}</p>
              </div>
              <motion.div
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                className="absolute bottom-0 bg-white border border-gray-400 p-4 shadow-lg w-full flex flex-col items-center text-center rounded-lg transition-opacity duration-300 z-20"
              >
                <h3 className="font-bold text-black">{product.name}</h3>
                <p className="text-gray-700">
                  <span className="font-semibold">Price</span> <br /> Rs.{product.price.toFixed(2)}
                </p>
                  <div className="flex items-center mt-2 space-x-2 bg-gray-100 p-2 rounded">
                  <button className="border border-gray-400 px-2 py-1 bg-gray-200 hover:bg-gray-300 text-black rounded">-</button>
                  <span className="px-4 text-black font-semibold">1</span>
                  <button className="border border-gray-400 px-2 py-1 bg-gray-200 hover:bg-gray-300 text-black rounded">+</button>
                  <span className="ml-2 text-black">Qty</span>
                </div>
                  <button className="mt-2 w-full bg-orange-500 text-white py-2 rounded">ADD TO CART</button>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterableProductList;
