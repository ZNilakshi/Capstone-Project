import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});
  const [addedItems, setAddedItems] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const searchProducts = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams(location.search).get("q");
        
        if (!query) {
          navigate("/");
          return;
        }

        const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (response.ok) {
          setResults(data);
          // Initialize quantities
          const initialQuantities = {};
          data.forEach(product => {
            initialQuantities[product._id] = 1;
          });
          setQuantities(initialQuantities);
        } else {
          setError(data.message || "Failed to fetch results");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    searchProducts();
  }, [location.search, navigate]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  };

  const handleAddToCart = (productId) => {
    const product = results.find(p => p._id === productId);
    if (product) {
      addToCart({
        ...product,
        quantity: quantities[productId]
      });
      setAddedItems(prev => ({
        ...prev,
        [productId]: true
      }));
    }
  };

  if (loading) return <div className="container mx-auto py-8">Loading...</div>;
  if (error) return <div className="container mx-auto py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{new URLSearchParams(location.search).get("q")}"
      </h1>
      
      {results.length === 0 ? (
        <p>No products found. Try a different search term.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product, index) => (
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
      )}
    </div>
  );
};

export default SearchResults;