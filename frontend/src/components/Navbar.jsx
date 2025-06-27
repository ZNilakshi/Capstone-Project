import { useState, useEffect } from "react";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { cart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/auth");
  };

  const handleProfileClick = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/userprofile");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-black text-white py-1 px-6 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <img
          src="/logo.png" 
          alt="Company Logo"
          className="h-[66px] cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg font-semibold">
          <li
            className="hover:text-orange-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            HOME
          </li>
          <li
            className="hover:text-orange-500 cursor-pointer"
            onClick={() => navigate("/OurStory")}
          >
            ABOUT
          </li>
          <li
            className="hover:text-orange-500 cursor-pointer"
            onClick={() => navigate("/contact")}
          >
            CONTACT
          </li>
        </ul>

        {/* Desktop Search - Now a proper form */}
        <form onSubmit={handleSearch} className="hidden md:block relative w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What are you looking for today?"
            className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-black"
          />
          <button 
            type="submit"
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
          >
            <FaSearch className="text-gray-500 hover:text-orange-500" />
          </button>
        </form>

        {/* User Controls */}
        <div className="hidden md:flex space-x-10 text-lg items-center">
          <div className="relative">
            <FaShoppingCart
              className="cursor-pointer hover:text-orange-500"
              onClick={() => navigate("/cart")}
            />
            {cart?.items?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>

          <div className="relative group">
            <FaUser className="cursor-pointer hover:text-orange-500" />
            <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              {user ? (
                <>
                  <button
                    type="button"
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    onClick={handleProfileClick}
                  >
                    Profile
                  </button>
                  <button
                    type="button"
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    onClick={() => navigate("/auth")}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    onClick={() => navigate("/auth")}
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-black text-white text-center absolute top-14 left-0 w-full shadow-md">
          <ul className="py-4 space-y-4">
            <li
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
              className="hover:text-orange-500 cursor-pointer"
            >
              HOME
            </li>
            <li
              onClick={() => {
                navigate("/OurStory");
                setIsMenuOpen(false);
              }}
              className="hover:text-orange-500 cursor-pointer"
            >
              ABOUT
            </li>
            <li
              onClick={() => {
                navigate("/contact");
                setIsMenuOpen(false);
              }}
              className="hover:text-orange-500 cursor-pointer"
            >
              CONTACT
            </li>
          </ul>

          {/* Mobile Search Form - Removed hidden class */}
          <form onSubmit={handleSearch} className="relative w-3/4 mx-auto mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for today?"
              className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-black"
            />
            <button 
              type="submit"
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              <FaSearch className="text-gray-500 hover:text-orange-500" />
            </button>
          </form>

          <div className="flex justify-center space-x-6 text-lg pb-4">
            <FaShoppingCart
              className="cursor-pointer hover:text-orange-500"
              onClick={() => {
                navigate("/cart");
                setIsMenuOpen(false);
              }}
            />
            <div className="relative group">
              <FaUser className="cursor-pointer hover:text-orange-500" />
              <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                {user ? (
                  <>
                    <button
                      type="button"
                      className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                      onClick={() => {
                        handleProfileClick();
                        setIsMenuOpen(false);
                      }}
                    >
                      Profile
                    </button>
                    <button
                      type="button"
                      className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                      onClick={() => {
                        navigate("/auth");
                        setIsMenuOpen(false);
                      }}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                      onClick={() => {
                        navigate("/register");
                        setIsMenuOpen(false);
                      }}
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;