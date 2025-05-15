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
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Search Results for:{" "}
          <span className="text-orange-500">
            {new URLSearchParams(location.search).get("q")}
          </span>
        </h1>
        {searchResults.length === 0 && !loading && (
          <p className="text-gray-600 mt-2">No products found</p>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {searchResults.map((product, index) => (
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
                <p className="font-semibold text-lg mt-1 text-black">
                  Rs.{product.price.toFixed(2)}
                </p>
                {product.vintage && (
                  <p className="text-sm text-gray-600">Vintage: {product.vintage}</p>
                )}
              </div>
              
              <motion.div
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                className="absolute bottom-0 bg-white border border-gray-400 p-4 shadow-lg w-full flex flex-col items-center text-center rounded-lg transition-opacity duration-300 z-20"
              >
                <h3 className="font-bold text-black">{product.name}</h3>
                <p className="text-gray-700">
                  <span className="font-semibold">Price</span> <br /> 
                  Rs.{product.price.toFixed(2)}
                </p>
                <div className="flex items-center mt-2 space-x-2 bg-gray-100 p-2 rounded">
                  <button className="border border-gray-400 px-2 py-1 bg-gray-200 hover:bg-gray-300 text-black rounded">
                    -
                  </button>
                  <span className="px-4 text-black font-semibold">1</span>
                  <button className="border border-gray-400 px-2 py-1 bg-gray-200 hover:bg-gray-300 text-black rounded">
                    +
                  </button>
                  <span className="ml-2 text-black">Qty</span>
                </div>
                <button 
                  className="mt-2 w-full bg-orange-500 text-white py-2 rounded"
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