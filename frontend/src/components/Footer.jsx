// const Footer = () => {
//     return <footer className="bg-black text-white text-center py-4">Footer Content</footer>;
//   };

//   export default Footer;


import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-4">
      {/* Horizontal Line */}
      <hr className="border-gray-600 mb-6" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">

        {/* Our Branches */}
        <div>
          <h3 className="text-lg font-semibold mb-2">OUR BRANCHES</h3>
          <ul className="space-y-1">
            <li className="hover:text-orange-500 cursor-pointer">Welimada</li>
            <li className="hover:text-orange-500 cursor-pointer">Badulla</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-2">FOLLOW US</h3>

          <div className="flex justify-center md:justify-start space-x-3 mt-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-xl cursor-pointer hover:text-orange-500" />
            </a>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-xl cursor-pointer hover:text-orange-500" />
            </a>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-xl cursor-pointer hover:text-orange-500" />
            </a>
          </div>

        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-lg font-semibold mb-2">PAYMENT METHODS</h3>
          <button className="bg-gray-700 px-4 py-2 mt-2 flex items-center justify-center w-full sm:w-auto">
            <span className="text-white mr-2">PAY HERE</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Visa"
              className="h-5 mx-1"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="MasterCard"
              className="h-5 mx-1"
            />
          </button>
        </div>

        {/* Place an Order */}
        <div>
          <h3 className="text-lg font-semibold mb-2"> DE SILVA WINE STORE </h3>
          <ul className="space-y-1">
            <ul className="space-y-1">
              <li>
                <Link to="/" className="hover:text-orange-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-500">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/ourstory" className="hover:text-orange-500">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-orange-500">
                  Privacy Policy
                </Link>
              </li>
            </ul>

          </ul>
        </div>
      </div>

      {/* Custmer Service */}
      <div className="text-center mt-8">
        <h3 className="text-lg font-semibold">Customer Service</h3>
        <p>(8.00AM – 10.00PM)</p>
      </div>
    </footer>
  );
};

export default Footer;
