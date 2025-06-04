import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useParams } from "react-router-dom";
import { FaMinus, FaPlus, FaCheck } from "react-icons/fa";

const BrandPage = () => {
  const { brandName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState(100000);
  const [selectedSize, setSelectedSize] = useState("Any Size");
  const [selectedAbv, setSelectedAbv] = useState("Any ABV");
  const [selectedCategory, setSelectedCategory] = useState("Any Category");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [addedItems, setAddedItems] = useState({});
  const { addToCart } = useCart();

  const sizes = ["Any Size", "750ML", "1L", "625ML","500ML","375ML", "330ML","325ML","180ML"];
  const abvLevels = ["Any ABV", "5%", "6%", "7%", "10%"];
  const categories = ["Any Category", "Shake & Beer", "Wine", "Sprite","Arrack","Gin","Whisky","Rum","Vodka","Brandy","Nine Arches"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await axios.get(`${baseUrl}/api/products/brand/${brandName}`);
        setProducts(response.data);
        
        // Initialize quantities with 1 for each product
        const initialQuantities = {};
        response.data.forEach(product => {
          initialQuantities[product._id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    if (brandName) fetchProducts();
    else setLoading(false);
  }, [brandName]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  };

  const handleAddToCart = (productId) => {
    const product = products.find(p => p._id === productId);
    if (product) {
      const quantityToAdd = quantities[productId] || 1;
      console.log(`Adding ${quantityToAdd} of ${product.name} to cart`);
      
      addToCart({
        ...product,
        quantity: quantityToAdd
      });

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
    }
  };

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
        {/* ... (keep all your existing filter code) ... */}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Hero Section */}
        <div className="relative w-full mb-8 overflow-hidden rounded-xl">
          {/* ... (keep your hero section code) ... */}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          {/* ... (keep your results count code) ... */}
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
              {/* Product Image and Basic Info */}
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

              {/* Hover Actions */}
              <motion.div
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                className="absolute bottom-0 z-20 flex flex-col items-center w-full p-4 text-center transition-opacity duration-300 bg-white border border-gray-400 rounded-lg shadow-lg"
              >
                <h3 className="font-bold text-black">{product.name}- {product.size}</h3>
                <p className="text-gray-700">
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

export default BrandPage;