import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useParams } from "react-router-dom";

const BrandPage = () => {
  const { brandName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState(100000);
  const [selectedSize, setSelectedSize] = useState("Any Size");
  const [selectedAbv, setSelectedAbv] = useState("Any ABV");
  const [selectedCategory, setSelectedCategory] = useState("Any Category");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { addToCart } = useCart();

  const sizes = ["Any Size", "750ML", "1L", "625ML","500ML","375ML", "330ML","325ML","180ML"];
  const abvLevels = ["Any ABV", "5%", "6%", "7%", "10%"];
  const categories = ["Any Category", "Shake & Beer", "Wine", "Sprite","Arrack","Gin","Whisky","Rum","Vodka","Brandy","Nine Arches"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://capstone-project-production-df71.up.railway.app/api/products/brand/${brandName}`);
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    if (brandName) fetchProducts();
    else setLoading(false);
  }, [brandName]);

  const filteredProducts = products.filter(
    (product) =>
      product.price <= priceRange &&
      (selectedSize === "Any Size" || product.size === selectedSize) &&
      (selectedAbv === "Any ABV" || product.abv === selectedAbv) &&
      (selectedCategory === "Any Category" || product.category === selectedCategory)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-black">
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-4 border-white rounded-full animate-spin border-r-transparent"></div>
          <p className="mt-4 text-xl font-light">Loading {brandName || "brand"} collection...</p>
        </div>
      </div>
    );
  }

  if (!brandName) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-black">
        <p className="text-2xl font-bold">Brand not found in the URL</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen gap-6 p-6 mt-20 text-white bg-black md:flex-row">
      {/* Sidebar Filter */}
      <div className="w-full md:w-72 lg:w-80 p-6 rounded-xl bg-gradient-to-b from-[#1a0a03] to-[#2A1205] border border-orange-900 shadow-lg sticky top-4 h-fit">
        <h2 className="pb-3 mb-6 text-2xl font-bold tracking-wide text-white uppercase border-b border-orange-800">Filters</h2>

        {/* Price Filter */}
        <div className="mb-8">
          <h3 className="mb-3 text-lg font-bold text-orange-300">Price Range</h3>
          <input
            type="range"
            min="950"
            max="100000"
            step="50"
            value={priceRange}
            onChange={(e) => setPriceRange(parseInt(e.target.value))}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-300">
            <span>LKR 950</span>
            <span>LKR 9050</span>
          </div>
          <div className="mt-3 px-3 py-2 bg-[#3a1a0a] rounded-lg text-center">
            <span className="font-bold text-orange-300">Selected: </span>
            LKR {priceRange.toLocaleString()}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="mb-3 text-lg font-bold text-orange-300">Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-lg text-sm ${selectedCategory === category
                  ? 'bg-orange-600 text-white font-bold'
                  : 'bg-[#3a1a0a] hover:bg-[#4a2a1a] text-gray-200'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-8">
          <h3 className="mb-3 text-lg font-bold text-orange-300">Bottle Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-2 rounded-lg text-sm ${selectedSize === size
                  ? 'bg-orange-600 text-white font-bold'
                  : 'bg-[#3a1a0a] hover:bg-[#4a2a1a] text-gray-200'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* ABV Filter */}
        <div>
          <h3 className="mb-3 text-lg font-bold text-orange-300">Alcohol Content</h3>
          <div className="flex flex-wrap gap-2">
            {abvLevels.map((abv) => (
              <button
                key={abv}
                onClick={() => setSelectedAbv(abv)}
                className={`px-3 py-2 rounded-lg text-sm ${selectedAbv === abv
                  ? 'bg-orange-600 text-white font-bold'
                  : 'bg-[#3a1a0a] hover:bg-[#4a2a1a] text-gray-200'}`}
              >
                {abv}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Filters */}
        <button 
          onClick={() => {
            setPriceRange(9050);
            setSelectedSize("Any Size");
            setSelectedAbv("Any ABV");
            setSelectedCategory("Any Category");
          }}
          className="w-full py-2 mt-6 text-orange-400 border border-orange-600 rounded-lg hover:bg-orange-900"
        >
          Reset All Filters
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Hero Section */}
        <div className="relative w-full mb-8 overflow-hidden rounded-xl">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black to-transparent"></div>
          <img
            src={`/${brandName.toLowerCase()}-banner.webp`}
            alt={`${brandName} Banner`}
            className="object-cover w-full h-64"
          />
          <div className="absolute inset-0 z-20 flex items-center p-8 md:p-12">
            <div className="max-w-2xl">
              <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                {brandName.toUpperCase()} COLLECTION
              </h1>
              <p className="text-lg text-gray-200">
                Discover our exquisite selection of {brandName} products.
              </p>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light text-gray-300">
            Showing <span className="font-bold text-orange-400">{filteredProducts.length}</span> products
          </h2>
          <div className="text-sm text-gray-400">
            {selectedSize !== "Any Size" && <span className="bg-[#3a1a0a] px-3 py-1 rounded-full mr-2">Size: {selectedSize} ×</span>}
            {selectedAbv !== "Any ABV" && <span className="bg-[#3a1a0a] px-3 py-1 rounded-full mr-2">ABV: {selectedAbv} ×</span>}
            {selectedCategory !== "Any Category" && <span className="bg-[#3a1a0a] px-3 py-1 rounded-full">Category: {selectedCategory} ×</span>}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filteredProducts.map((product, index) => (
            <div
              key={product._id}
              className="relative flex flex-col items-center p-6 text-center bg-gray-200 border border-gray-300 rounded-lg shadow-md"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-full p-2">
                <span className="absolute z-10 px-3 py-1 text-xs font-bold text-orange-500 bg-white border border-orange-400 top-2 right-2">
                  {product.points || "4.5"} POINTS
                </span>
                <img 
                  src={product.image || product.photo || "/default-product.png"} 
                  alt={product.name} 
                  className="object-contain h-48 mx-auto w-41"
                />
                <h3 className="mt-2 font-bold text-black">{product.name} - {product.size}</h3>
                <p className="mt-1 text-lg font-semibold text-black">Rs.{product.price.toFixed(2)}</p>
                {product.vintage && <p className="text-sm text-gray-600">Vintage: {product.vintage}</p>}
              </div>

              <motion.div
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                className="absolute bottom-0 z-20 flex flex-col items-center w-full p-4 text-center transition-opacity duration-300 bg-white border border-gray-400 rounded-lg shadow-lg"
              >
                <h3 className="font-bold text-black">{product.name}- {product.size}</h3>
                <p className="text-gray-700">
                  <span className="font-semibold">Price</span> <br /> Rs.{product.price.toFixed(2)}
                </p>
                <div className="flex items-center p-2 mt-2 space-x-2 bg-gray-100 rounded">
                  <button className="px-2 py-1 text-black bg-gray-200 border border-gray-400 rounded hover:bg-gray-300">-</button>
                  <span className="px-4 font-semibold text-black">1</span>
                  <button className="px-2 py-1 text-black bg-gray-200 border border-gray-400 rounded hover:bg-gray-300">+</button>
                  <span className="ml-2 text-black">Qty</span>
                </div>
                <button 
                  className="w-full py-2 mt-2 text-white bg-orange-500 rounded"
                  onClick={() => addToCart(product._id, 1)}
                >
                  ADD TO CART
                </button>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandPage;