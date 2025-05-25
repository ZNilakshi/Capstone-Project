import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");

    if (!query) {
      navigate("/");
      return;
    }

   
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/products/search', {
          params: { q: query },
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.status !== 200) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        
        setSearchResults(response.data);
        setError(null);
      } catch (err) {
        console.error("Search error details:", {
          message: err.message,
          config: err.config,
          response: err.response?.data
        });
        
        setError(err.response?.data?.message || 
                "Failed to perform search. Please try again.");
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location.search, navigate]);

  return (
    <div className="container min-h-screen px-4 py-24 mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Search Results for:{" "}
          <span className="text-orange-500">
            {new URLSearchParams(location.search).get("q")}
          </span>
        </h1>
        {searchResults.length === 0 && !loading && (
          <p className="mt-2 text-gray-600">No products found</p>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-t-2 border-b-2 border-orange-500 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {searchResults.map((product, index) => (
            <div
              key={product._id || product.id}
              className="relative flex flex-col items-center p-6 text-center bg-gray-200 border border-gray-300 rounded-lg shadow-md"
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
                <h3 className="mt-2 font-bold text-black">{product.name}</h3>
                <p className="mt-1 text-lg font-semibold text-black">
                  Rs.{product.price.toFixed(2)}
                </p>
                {product.vintage && (
                  <p className="text-sm text-gray-600">Vintage: {product.vintage}</p>
                )}
              </div>
              
              <motion.div
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                className="absolute bottom-0 z-20 flex flex-col items-center w-full p-4 text-center transition-opacity duration-300 bg-white border border-gray-400 rounded-lg shadow-lg"
              >
                <h3 className="font-bold text-black">{product.name}</h3>
                <p className="text-gray-700">
                  <span className="font-semibold">Price</span> <br /> 
                  Rs.{product.price.toFixed(2)}
                </p>
                <div className="flex items-center p-2 mt-2 space-x-2 bg-gray-100 rounded">
                  <button className="px-2 py-1 text-black bg-gray-200 border border-gray-400 rounded hover:bg-gray-300">
                    -
                  </button>
                  <span className="px-4 font-semibold text-black">1</span>
                  <button className="px-2 py-1 text-black bg-gray-200 border border-gray-400 rounded hover:bg-gray-300">
                    +
                  </button>
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
      )}
    </div>
  );
};

export default SearchPage;