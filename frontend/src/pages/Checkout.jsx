import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically process the payment
    alert('Payment processed successfully!');
    navigate("/order-confirmation");
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
          
          {/* Payment Form */}
          <div className="lg:w-1/2 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6 border-b pb-2">PAYMENT METHODS</h2>
            <p className="text-gray-600 mb-6">YOUR PAYMENT INFORMATION IS SAFE WITH US</p>
            
            <div className="space-y-6">
              {!showCardForm ? (
                <button 
                  onClick={() => setShowCardForm(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  ADD A NEW CARD
                </button>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-8 w-12 bg-blue-50 flex items-center justify-center rounded">
                      <span className="text-blue-800 font-bold">VISA</span>
                    </div>
                    <span className="text-gray-700">CARD</span>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1">CARD NUMBER</label>
                      <input
                        type="text"
                        name="number"
                        value={cardDetails.number}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">CARDHOLDER NAME</label>
                      <input
                        type="text"
                        name="name"
                        value={cardDetails.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">MM/YY</label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardDetails.expiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                          required
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gray-800 text-white py-3 rounded-lg font-bold hover:bg-gray-700 transition mt-6"
                    >
                      PAY NOW
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;