// const Footer = () => {
//     return <footer className="bg-black text-white text-center py-4">Footer Content</footer>;
//   };
  
//   export default Footer;
  

import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-4">
      {/* Horizontal Line */}
      <hr className="border-gray-600 mb-6" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* Our Branches */}
        <div>
          <h3 className="text-lg font-semibold mb-2">OUR BRANCHES</h3>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-2">CONTACT US</h3>
          <p>Email</p>
          <p>Phone Number</p>
          <div className="flex justify-center md:justify-start space-x-3 mt-2">
            <FaFacebookF className="text-xl cursor-pointer hover:text-orange-500" />
            <FaInstagram className="text-xl cursor-pointer hover:text-orange-500" />
            <FaYoutube className="text-xl cursor-pointer hover:text-orange-500" />
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-lg font-semibold mb-2">PAYMENT METHOD</h3>
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
          <h3 className="text-lg font-semibold mb-2">PLACE AN ORDER</h3>
          <ul className="space-y-1">
            <li className="hover:text-orange-500 cursor-pointer">Place an Order</li>
            <li className="hover:text-orange-500 cursor-pointer">Returns and Refunds</li>
            <li className="hover:text-orange-500 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-orange-500 cursor-pointer">Terms and Conditions</li>
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
