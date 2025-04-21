import { useState, useEffect } from "react";
import { FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/auth"); // redirect to login
  };

  const handleProfileClick = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user-profile");
    }
  };

  return (
    <nav className="bg-black text-white py-4 px-6 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-orange-500 font-bold text-lg tracking-wide cursor-pointer" onClick={() => navigate("/")}>
          LOGO
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg font-semibold">
          <li className="hover:text-orange-500 cursor-pointer" onClick={() => navigate("/")}>HOME</li>
          <li className="hover:text-orange-500 cursor-pointer" onClick={() => navigate("/about")}>ABOUT</li>
          <li className="hover:text-orange-500 cursor-pointer" onClick={() => navigate("/contact")}>CONTACT</li>
        </ul>

        {/* Search */}
        <div className="relative hidden md:block w-72">
          <input
            type="text"
            placeholder="What are you looking for today?"
            className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-black"
          />
          <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
        </div>

        {/* User Controls */}
        <div className="hidden md:flex space-x-10 text-lg items-center">
          <FaShoppingCart className="cursor-pointer hover:text-orange-500" onClick={() => navigate("/cart")} />

          <div className="relative group">
            <FaUser className="cursor-pointer hover:text-orange-500" />
            <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              {user ? (
                <>
                  <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={handleProfileClick}>
                    Profile
                  </button>
                  <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={() => navigate("/auth")}>
                    Login
                  </button>
                  <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={() => navigate("/register")}>
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-black text-white text-center absolute top-14 left-0 w-full shadow-md">
          <ul className="py-4 space-y-4">
            <li onClick={() => { navigate("/"); setIsMenuOpen(false); }} className="hover:text-orange-500 cursor-pointer">HOME</li>
            <li onClick={() => { navigate("/about"); setIsMenuOpen(false); }} className="hover:text-orange-500 cursor-pointer">ABOUT</li>
            <li onClick={() => { navigate("/contact"); setIsMenuOpen(false); }} className="hover:text-orange-500 cursor-pointer">CONTACT</li>
          </ul>

          <div className="relative w-3/4 mx-auto mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-lg text-black"
            />
            <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
          </div>

          <div className="flex justify-center space-x-6 text-lg pb-4">
            <FaShoppingCart className="cursor-pointer hover:text-orange-500" onClick={() => { navigate("/cart"); setIsMenuOpen(false); }} />
            <div className="relative group">
              <FaUser className="cursor-pointer hover:text-orange-500" />
              <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                {user ? (
                  <>
                    <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={() => { handleProfileClick(); setIsMenuOpen(false); }}>
                      Profile
                    </button>
                    <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={() => { navigate("/auth"); setIsMenuOpen(false); }}>
                      Login
                    </button>
                    <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={() => { navigate("/register"); setIsMenuOpen(false); }}>
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
