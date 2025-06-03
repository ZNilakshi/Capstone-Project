import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });

  const locations = ['Welimada', 'Badulla', 'Bandarawela', 'Hali-Ela', 'Passara', 'Mahiyanganaya'];
 // Add this useEffect to load user data on component mount
 useEffect(() => {
  console.log("Checking localStorage for user data...");
  const storedUser = localStorage.getItem("user"); // Ensure key is correct ("user")
  
  if (!storedUser) {
    console.warn("No user data in localStorage");
    return;
  }

  try {
    // Trim whitespace (in case of corruption)
    const trimmedUser = storedUser.trim();
    
    // Check if it starts/ends with { } (basic validation)
    if (!trimmedUser.startsWith("{") || !trimmedUser.endsWith("}")) {
      throw new Error("Invalid JSON format");
    }

    const parsedUser = JSON.parse(trimmedUser);
    console.log("Parsed user object:", parsedUser);

    setUserDetails({
      name: parsedUser.username || "", // Fallback to username if name missing
      email: parsedUser.email || "",   // Will be empty if not in data
      phone: parsedUser.phone || "",
      location: parsedUser.location || "",
    });

    if (parsedUser.username) {
      setShowDetailsForm(true);
    }
  } catch (error) {
    console.error("Failed to parse user data:", error);
    // Clear corrupted data (optional)
    localStorage.removeItem("user");
  }
}, []);
  const validateName = (name) => {
    return /^[a-zA-Z\s'-]+$/.test(name) && name.trim().length > 0;
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      setUserDetails(prev => ({
        ...prev,
        [name]: cleaned.substring(0, 10)
      }));
      
      setErrors(prev => ({
        ...prev,
        phone: cleaned.length > 0 && !validatePhone(cleaned) ? 'Phone must be 10 digits' : ''
      }));
      return;
    }
    
    if (name === 'name') {
      const cleaned = value.replace(/[^a-zA-Z\s'-]/g, '');
      setUserDetails(prev => ({
        ...prev,
        [name]: cleaned
      }));
      
      setErrors(prev => ({
        ...prev,
        name: cleaned.length > 0 && !validateName(cleaned) ? 'Please enter a valid name' : ''
      }));
      return;
    }
    
    if (name === 'email') {
      setUserDetails(prev => ({
        ...prev,
        [name]: value
      }));
      
      setErrors(prev => ({
        ...prev,
        email: value.length > 0 && !validateEmail(value) ? 'Please enter a valid email' : ''
      }));
      return;
    }
    
    // For location select
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    
    const isNameValid = validateName(userDetails.name);
    const isEmailValid = validateEmail(userDetails.email);
    const isPhoneValid = validatePhone(userDetails.phone);
    const isLocationValid = userDetails.location !== '';
    
    if (!isNameValid || !isEmailValid || !isPhoneValid || !isLocationValid) {
      setErrors({
        name: !isNameValid ? 'Please enter a valid name' : '',
        email: !isEmailValid ? 'Please enter a valid email' : '',
        phone: !isPhoneValid ? 'Phone must be 10 digits' : '',
        location: !isLocationValid ? 'Please select a location' : ''
      });
      return;
    }
    
    // Here you would typically save the details and proceed to payment
    alert('Details saved successfully!');
    // Proceed to payment or next step
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 mt-16">
        <h1 className="text-3xl font-bold mb-4">YOUR CART IS EMPTY</h1>
        <p className="mb-6 text-gray-600">Please add items to your cart before checkout.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700 transition"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  const subtotal = cart.items.reduce((sum, item) => {
    const price = item?.product?.price || 0;
    const quantity = item?.quantity || 0;
    return sum + (price * quantity);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold uppercase mb-8 text-left">YOUR ORDER</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Order Summary */}
          <div className="lg:w-1/2 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6 border-b pb-2">PRODUCT</h2>
            
            {/* Products List */}
            <div className="space-y-4">
              {cart.items.map((item) => {
                const price = item?.product?.price || 0;
                const quantity = item?.quantity || 0;
                const itemTotal = price * quantity;

                return (
                  <div key={item.product?._id} className="flex justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">{item.product?.name || 'Unknown Product'}</h3>
                      <p className="text-gray-500 text-sm">{quantity} x {item.product?.size || ''}</p>
                    </div>
                    <span className="font-bold">LKR.{itemTotal.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
            
            {/* Order Totals */}
            <div className="mt-8 border-t pt-6">
              <div className="flex justify-between py-2">
                <span className="font-medium">SUBTOTAL</span>
                <span className="font-bold">LKR.{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">SHIPPING</span>
                <span className="font-bold">FREE</span>
              </div>
              <div className="flex justify-between py-4 border-t border-gray-200 font-bold text-lg">
                <span>TOTAL</span>
                <span>LKR.{subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Details Form */}
          <div className="lg:w-1/2 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6 border-b pb-2">Your Details</h2>
            
            <div className="space-y-6">
              {!showDetailsForm ? (
                <button 
                  onClick={() => setShowDetailsForm(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  ADD YOUR DETAILS
                </button>
              ) : (
                <form onSubmit={handleSubmitDetails} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={userDetails.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userDetails.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={userDetails.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0771234567"
                      maxLength="10"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Nearest Location to You
                    </label>
                    <select
                      id="location"
                      name="location"
                      value={userDetails.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a location</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                    {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                  >
                    SAVE DETAILS
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;