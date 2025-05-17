import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { FaMinus, FaPlus, FaCheck } from "react-icons/fa";

const FilterableProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState(9050);
  const [selectedBrand, setSelectedBrand] = useState("Any Brand");
  const [selectedSize, setSelectedSize] = useState("Any Size");
  const [selectedAbv, setSelectedAbv] = useState("Any ABV");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [addedItems, setAddedItems] = useState({});

  const { addToCart } = useCart();

  const brands = ["Any Brand", "ROCKLANDS", "DLL", "DCSL", "MENDIS", "LION", "HEINEKEN"];
  const sizes = ["Any Size", "750ML", "1L", "500ML"];
  const abvLevels = ["Any ABV", "5%", "6%", "7%", "10%"];
  
  useEffect(() => {
    const fetchWines = async () => {
      try {
        const response = await axios.get("https://capstone-project-production-df71.up.railway.app/api/products/category/Wine");
        setProducts(response.data);
        // Initialize quantities
        const initialQuantities = {};
        response.data.forEach(product => {
          initialQuantities[product._id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (err) {
        console.error("Failed to fetch wines", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWines();
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  };

  const handleAddToCart = (productId) => {
    addToCart(productId, quantities[productId]);
    setAddedItems(prev => ({
      ...prev,
      [productId]: true
    }));
    // Reset the "Added" state after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => ({
        ...prev,
        [productId]: false
      }));
    }, 2000);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.price <= priceRange &&
      (selectedBrand === "Any Brand" || product.brand === selectedBrand) &&
      (selectedSize === "Any Size" || product.size === selectedSize) &&
      (selectedAbv === "Any ABV" || product.abv === selectedAbv)
  );

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center py-20 text-white">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-xl font-light">Loading our exquisite wine collection...</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row p-6 mt-20 gap-6 bg-black text-white min-h-screen">
      {/* Sidebar Filter */}
      <div className="w-full md:w-72 lg:w-80 p-6 rounded-xl bg-gradient-to-b from-[#1a0a03] to-[#2A1205] border border-orange-900 shadow-lg sticky top-4 h-fit">
        <h2 className="font-bold text-2xl mb-6 uppercase text-white tracking-wide border-b border-orange-800 pb-3">Filters</h2>

        {/* Price Filter */}
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-3 text-orange-300">Price Range</h3>
          <div className="relative flex flex-col items-center w-full">
            <input
              type="range"
              className="w-full cursor-pointer filter-slider"
              min="950"
              max="9050"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
            />
            <div className="flex justify-between w-full mt-2 text-sm text-gray-300">
              <span>LKR 950</span>
              <span>LKR 9050</span>
            </div>
            <div className="mt-3 px-3 py-2 bg-[#3a1a0a] rounded-lg text-center w-full">
              <span className="font-bold text-orange-300">Selected: </span>
              <span className="font-medium">LKR {priceRange.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Brand Filter */}
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-3 text-orange-300">Brand</h3>
          <div className="grid grid-cols-2 gap-2">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${selectedBrand === brand 
                  ? 'bg-orange-600 text-white font-bold' 
                  : 'bg-[#3a1a0a] hover:bg-[#4a2a1a] text-gray-200'}`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-3 text-orange-300">Bottle Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${selectedSize === size 
                  ? 'bg-orange-600 text-white font-bold' 
                  : 'bg-[#3a1a0a] hover:bg-[#4a2a1a] text-gray-200'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* ABV Filter */}
        <div className="mb-4">
          <h3 className="font-bold text-lg mb-3 text-orange-300">Alcohol Content</h3>
          <div className="flex flex-wrap gap-2">
            {abvLevels.map((abv) => (
              <button
                key={abv}
                onClick={() => setSelectedAbv(abv)}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${selectedAbv === abv 
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
            setSelectedBrand("Any Brand");
            setSelectedSize("Any Size");
            setSelectedAbv("Any ABV");
          }}
          className="mt-6 w-full py-2 bg-transparent border border-orange-600 text-orange-400 rounded-lg hover:bg-orange-900 transition-colors"
        >
          Reset All Filters
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Hero Section */}
        <div className="w-full rounded-xl overflow-hidden mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
          <img 
            src="/winebanner.webp" 
            alt="Wine Selection" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 flex items-center z-20 p-8 md:p-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Premium Wine Collection</h1>
              <p className="text-lg text-gray-200">
                Discover our exquisite selection of fine wines from around the world. 
                Each bottle tells a story of tradition, passion, and exceptional craftsmanship.
              </p>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-light text-gray-300">
            Showing <span className="font-bold text-orange-400">{filteredProducts.length}</span> wines
          </h2>
          <div className="text-sm text-gray-400">
            {selectedBrand !== "Any Brand" && (
              <span className="bg-[#3a1a0a] px-3 py-1 rounded-full mr-2">
                Brand: {selectedBrand} ×
              </span>
            )}
            {selectedSize !== "Any Size" && (
              <span className="bg-[#3a1a0a] px-3 py-1 rounded-full mr-2">
                Size: {selectedSize} ×
              </span>
            )}
            {selectedAbv !== "Any ABV" && (
              <span className="bg-[#3a1a0a] px-3 py-1 rounded-full">
                ABV: {selectedAbv} ×
              </span>
            )}
          </div>
        </div>

        {/* Product Display Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product, index) => (
            <div
              key={product._id || product.id}
              className="relative border border-gray-300 p-6 shadow-md bg-gray-200 flex flex-col items-center text-center rounded-lg"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-full p-2">
                <span className="absolute top-2 right-2 border border-orange-400 px-3 py-1 text-xs font-bold bg-white z-10 text-orange-500">
                  {product.points || "4.5"} POINTS
                </span>

                <img 
                  src={product.image || product.photo || "/default-wine.png"} 
                  alt={product.name} 
                  className="w-41 mx-auto h-48 object-contain"
                />
                <h3 className="font-bold mt-2 text-black">{product.name}</h3>
                <p className="font-semibold text-lg mt-1 text-black">Rs.{product.price.toFixed(2)}</p>
                {product.vintage && <p className="text-sm text-gray-600">Vintage: {product.vintage}</p>}
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
                  <button
                    onClick={() => handleQuantityChange(product._id, quantities[product._id] - 1)}
                    className="px-3 py-1 text-gray-800 hover:bg-gray-300 rounded"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="text-gray-800 font-normal px-4 py-1 border-x border-gray-300">
                    {quantities[product._id]}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(product._id, quantities[product._id] + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-300 rounded"
                  >
                    <FaPlus size={12} />
                  </button>
                  <span className="ml-2 text-black">Qty</span>
                </div>
                <button 
                  className={`mt-2 w-full py-2 rounded flex items-center justify-center gap-2 ${
                    addedItems[product._id] 
                      ? 'bg-gray-500 text-white' 
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                  onClick={() => handleAddToCart(product._id)}
                  disabled={addedItems[product._id]}
                >
                  {addedItems[product._id] ? (
                    <>
                      <FaCheck /> Added
                    </>
                  ) : (
                    "ADD TO CART"
                  )}
                </button>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterableProductList;