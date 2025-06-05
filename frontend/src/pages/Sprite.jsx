import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { FaMinus, FaPlus, FaCheck, FaFilter, FaTimes } from "react-icons/fa";

const FilterableProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState(9050);
  const [selectedBrand, setSelectedBrand] = useState("Any Brand");
  const [selectedCategory, setSelectedCategory] = useState("Any Category");
  const [selectedSize, setSelectedSize] = useState("Any Size");
  const [selectedAbv, setSelectedAbv] = useState("Any ABV");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [addedItems, setAddedItems] = useState({});
  const [showFilters, setShowFilters] = useState(false); // New state for mobile filters
  const { addToCart } = useCart();

  const brands = ["Any Brand","ROCKLAND","IDL","DCSL","MENDIS","LION","DCSL BREWERIES","HEINEKEN","ANCHOR","TIGER","BISON","DCSL BEER"];
  const categories = ["Any Category","Arrack","Gin","Whisky","Rum","Vodka","Brandy","Nine Arches"];
  const sizes = ["Any Size", "750ML", "1L", "625ML","500ML","375ML", "330ML","325ML","180ML"];
  const abvLevels = ["Any ABV", "5%", "6%", "7%", "10%"];
  
  useEffect(() => {
    const fetchWines = async () => {
      try {
        const categories = ["Gin", "Arrack", "Whisky", "Rum", "Vodka", "Brandy", "Nine Arches"];

        const requests = categories.map((category) =>
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/category/${category}`)
        );
        
        const responses = await Promise.all(requests);
        const allProducts = responses.flatMap((res) => res.data);

        setProducts(allProducts);

        const initialQuantities = {};
        allProducts.forEach((product) => {
          initialQuantities[product._id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (err) {
        console.error("Failed to fetch products", err);
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
      (selectedCategory === "Any Category" || product.categories === selectedCategory) &&
      (selectedSize === "Any Size" || product.size === selectedSize) &&
      (selectedAbv === "Any ABV" || product.abv === selectedAbv)
  );

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="py-20 text-center text-white">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-xl font-light">Loading our exquisite Sprite collection...</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen gap-6 p-4 mt-20 text-white bg-black md:flex-row">
      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center w-full py-3 mb-4 space-x-2 text-white bg-orange-600 rounded-lg"
        >
          {showFilters ? (
            <>
              <FaTimes /> <span>Hide Filters</span>
            </>
          ) : (
            <>
              <FaFilter /> <span>Show Filters</span>
            </>
          )}
        </button>
      </div>

      {/* Sidebar Filter - Now conditionally rendered on mobile */}
      <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-72 lg:w-80 p-4 md:p-6 rounded-xl bg-gradient-to-b from-[#1a0a03] to-[#2A1205] border border-orange-900 shadow-lg md:sticky md:top-4 h-auto md:h-[calc(100vh-6rem)] overflow-y-auto`}>
        <h2 className="pb-3 mb-6 text-2xl font-bold tracking-wide text-white uppercase border-b border-orange-800">Filters</h2>

        <div className="space-y-8 overflow-y-auto max-h-[calc(100%-4rem)] pr-2">
          {/* Price Filter */}
          <div>
            <h3 className="mb-3 text-lg font-bold text-orange-300">Price Range</h3>
            <div className="relative flex flex-col items-center w-full">
              <input
                type="range"
                className="w-full cursor-pointer filter-slider"
                min="300"
                max="20000"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
              />
              <div className="flex justify-between w-full mt-2 text-sm text-gray-300">
                <span>LKR 300</span>
                <span>LKR 20000</span>
              </div>
              <div className="mt-3 px-3 py-2 bg-[#3a1a0a] rounded-lg text-center w-full">
                <span className="font-bold text-orange-300">Selected: </span>
                <span className="font-medium">LKR {priceRange.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <h3 className="mb-3 text-lg font-bold text-orange-300">Brand</h3>
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

          {/* Category
          <div>
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
           Filter */}

          {/* Size Filter */}
          <div>
            <h3 className="mb-3 text-lg font-bold text-orange-300">Bottle Size</h3>
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
          <div>
            <h3 className="mb-3 text-lg font-bold text-orange-300">Alcohol Content</h3>
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
              setSelectedCategory("Any Category");
              setSelectedSize("Any Size");
              setSelectedAbv("Any ABV");
            }}
            className="w-full py-2 text-orange-400 transition-colors bg-transparent border border-orange-600 rounded-lg hover:bg-orange-900"
          >
            Reset All Filters
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Hero Section - Hidden on mobile */}
        <div className="relative hidden w-full mb-8 overflow-hidden rounded-xl md:block">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black to-transparent"></div>
          <img 
            src="/winebanner.webp" 
            alt="Wine Selection" 
            className="object-cover w-full h-64"
          />
          <div className="absolute inset-0 z-20 flex items-center p-8 md:p-12">
            <div className="max-w-2xl">
              <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Premium Sprite Collection</h1>
              <p className="text-lg text-gray-200">
                Discover our exquisite selection of fine sprite from around the world. 
                Each bottle tells a story of tradition, passion, and exceptional craftsmanship.
              </p>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex flex-col items-start justify-between mb-6 md:flex-row">
          <h2 className="text-xl font-light text-gray-300 md:text-2xl">
            Showing <span className="font-bold text-orange-400">{filteredProducts.length}</span> wines
          </h2>
          <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-400 md:mt-0">
            {selectedBrand !== "Any Brand" && (
              <span className="bg-[#3a1a0a] px-3 py-1 rounded-full">
                Brand: {selectedBrand} ×
              </span>
            )}
            {selectedSize !== "Any Size" && (
              <span className="bg-[#3a1a0a] px-3 py-1 rounded-full">
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, index) => (
            <div
              key={product._id || product.id}
              className="relative flex flex-col items-center p-4 text-center bg-gray-200 border border-gray-300 rounded-lg shadow-md sm:p-6"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-full p-2">
                <span className="absolute z-10 px-3 py-1 text-xs font-bold text-orange-500 bg-white border border-orange-400 top-2 right-2">
                  {product.points || "4.5"} POINTS
                </span>

                <img 
                  src={product.image || product.photo || "/default-wine.png"} 
                  alt={product.name} 
                  className="object-contain h-48 mx-auto w-41"
                />
                <h3 className="mt-2 text-sm font-bold text-black sm:text-base">{product.name}</h3>
                <p className="mt-1 text-base font-semibold text-black sm:text-lg">Rs.{product.price.toFixed(2)}</p>
                {product.size && <p className="text-xs text-gray-600 sm:text-sm"> {product.size}</p>}
              </div>
              
              <motion.div
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                className="absolute bottom-0 z-20 flex flex-col items-center w-full p-4 text-center transition-opacity duration-300 bg-white border border-gray-400 rounded-lg shadow-lg"
              >
                <h3 className="text-sm font-bold text-black sm:text-base">{product.name}</h3>
                <p className="text-xs text-gray-700 sm:text-sm">
                  <span className="font-semibold">Price</span> <br /> Rs.{product.price.toFixed(2)}
                </p>
                <div className="flex items-center p-2 mt-2 space-x-2 bg-gray-100 rounded">
                  <button
                    onClick={() => handleQuantityChange(product._id, quantities[product._id] - 1)}
                    className="px-3 py-1 text-gray-800 rounded hover:bg-gray-300"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="px-4 py-1 font-normal text-gray-800 border-gray-300 border-x">
                    {quantities[product._id]}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(product._id, quantities[product._id] + 1)}
                    className="px-3 py-1 text-gray-600 rounded hover:bg-gray-300"
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