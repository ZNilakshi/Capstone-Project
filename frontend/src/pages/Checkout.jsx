import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";

const Checkout = () => {
  const { cart , clearCart } = useCart();
  const navigate = useNavigate();
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: ''
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: ''
  });
  const [orderConfirmation, setOrderConfirmation] = useState({
    isConfirmed: false,
    orderId: null
  });

  const locations = ['Welimada', 'Badulla', 'Kesbewa', 'Arawwa'];

 useEffect(() => {
  console.log("Checking localStorage for user data...");
  const storedUser = localStorage.getItem("user");
  
  if (!storedUser) {
    console.warn("No user data in localStorage");
    return;
  }

  try {
    const trimmedUser = storedUser.trim();
    if (!trimmedUser.startsWith("{") || !trimmedUser.endsWith("}")) {
      throw new Error("Invalid JSON format");
    }

    const parsedUser = JSON.parse(trimmedUser);
    console.log("Parsed user object:", parsedUser);

    setUserDetails({
      firstName: parsedUser.firstName || "",
      lastName: parsedUser.lastName || "",      
      email: parsedUser.email || "",
      phone: parsedUser.phone || "",
      location: parsedUser.location || "",
    });

    if (parsedUser.firstName || parsedUser.lastName) {
      setShowDetailsForm(true);
    }
  } catch (error) {
    console.error("Failed to parse user data:", error);
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

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isFirstNameValid = validateName(userDetails.firstName);
    const isLastNameValid = validateName(userDetails.lastName);
    const isEmailValid = validateEmail(userDetails.email);
    const isPhoneValid = validatePhone(userDetails.phone);
    const isLocationValid = userDetails.location !== '';
    
    if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isPhoneValid || !isLocationValid) {
      setErrors({
        firstName: !isFirstNameValid ? 'Please enter first name' : '',
        lastName: !isLastNameValid ? 'Please enter last name' : '',
        email: !isEmailValid ? 'Please enter a valid email' : '',
        phone: !isPhoneValid ? 'Please enter Phone number' : '',
        location: !isLocationValid ? 'Please select a location' : ''
      });
      return;
    }
    
    try {
      // Prepare order data
      const orderData = {
        user: {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          phone: userDetails.phone,
          location: userDetails.location
        },
        items: cart.items.map(item => ({
          productId: item.product._id,
          name: item.product.name,
          size: item.product.size,
          price: item.product.price,
          quantity: item.quantity
        })),
        subtotal: subtotal,
        total: subtotal,
        status: 'pending', // or 'processing'
        createdAt: new Date().toISOString()
      };
  
      // Send to  backend API
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit order');
      }
  
      const result = await response.json();
      
      // Clear cart after successful order
    clearCart();
    
    // Set order confirmation state
    setOrderConfirmation({
      isConfirmed: true,
      orderId: result.orderId
    });

    // Send email to manager )
    try {
      await fetch('http://localhost:5000/api/send-order-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: result.orderId,
          customerName: `${userDetails.firstName} ${userDetails.lastName}`,
          customerEmail: userDetails.email,
          totalAmount: subtotal
        })
      });
    } catch (emailError) {
      console.error('Failed to send manager email:', emailError);
      // This shouldn't affect the user experience
    }

  } catch (error) {
    console.error('Order submission error:', error);
    alert('There was an error submitting your order. Please try again.');
  }
};
if (orderConfirmation.isConfirmed) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 mt-16">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h1 className="text-2xl font-bold mb-4 mt-4">ORDER CONFIRMED!</h1>
        <p className="mb-4 text-gray-600">
          Your order ID is: <span className="font-bold">{orderConfirmation.orderId}</span>
        </p>
        <p className="mb-6 text-gray-600">
          For order details, you can view in your profile order history.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700 transition w-full"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  );
}
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
            <h2 className="text-xl font-bold mb-6 border-b pb-2">PRODUCTS</h2>
            
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
            <div className="mt-8 pt-6">
             
              
              <div className="flex justify-between py-4  border-gray-200 font-bold text-lg">
                <span>TOTAL</span>
                <span>LKR.{subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Details Form */}
          <div className="lg:w-1/2 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6 border-b pb-2">YOUR DETAILS</h2>
            
            <div className="space-y-6">
              {!showDetailsForm ? (
                <button 
                  onClick={() => setShowDetailsForm(true)}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition"
                >
                  ADD YOUR DETAILS
                </button>
              ) : (
                <form onSubmit={handleSubmitDetails} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
    <div>
      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
        First Name
      </label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={userDetails.firstName || ""}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        placeholder="John"
      />
      {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
    </div>
    <div>
      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
        Last Name
      </label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={userDetails.lastName || ""}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        placeholder="Doe"
      />
      {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
    </div>
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
                    className="w-full px-4 py-3 h-12 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition"
                  >
                    CONFIRM ORDER
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