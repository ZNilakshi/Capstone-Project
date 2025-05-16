import { useCart } from "../context/CartContext";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 mt-16">
        <h1 className="text-3xl font-bold mb-4">YOUR CART IS EMPTY</h1>
        <p className="mb-6 text-gray-600">Looks like you haven't added any items yet.</p>
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
        <h1 className="text-3xl font-bold uppercase mb-8 text-left">CART</h1>
        
        {/* Cart Items Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 font-bold uppercase text-sm text-gray-600">
            <div className="col-span-1"></div> {/* Empty column for delete icon */}
            <div className="col-span-4">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-2 text-right">Subtotal</div>
          </div>
          
          {/* Cart Items */}
          {cart.items.map((item) => {
            const price = item?.product?.price || 0;
            const quantity = item?.quantity || 0;
            const subtotal = price * quantity;

            return (
              <div 
                key={item.product?._id || Math.random()} 
                className="grid grid-cols-12 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {/* Delete Button Column - Moved to first column */}
                <div className="col-span-1 flex items-center">
                  <button
                    onClick={() => removeFromCart(item.product?._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
                
                {/* Product Column */}
                <div className="col-span-11 md:col-span-4 flex items-center mb-4 md:mb-0">
                  <img
                    src={item.product?.photo || '/placeholder-product.png'}
                    alt={item.product?.name || 'Product'}
                    className="w-20 h-20 object-contain mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{item.product?.name || 'Unknown Product'}</h3>
                    <p className="text-gray-500 text-sm">{item.product?.brand || ''}</p>
                  </div>
                </div>
                
                {/* Price Column */}
                <div className="col-span-4 md:col-span-2 flex items-center md:justify-center">
                  <span className="font-bold">Rs.{price.toFixed(2)}</span>
                </div>
                
                {/* Quantity Column */}
                <div className="col-span-4 md:col-span-3 flex items-center justify-center">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => {
                        if (quantity > 1) {
                          updateQuantity(item.product?._id, quantity - 1);
                        } else {
                          removeFromCart(item.product?._id);
                        }
                      }}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="px-4 py-1 border-x border-gray-300 font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product?._id, quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>
                
                {/* Subtotal Column */}
                <div className="col-span-4 md:col-span-2 flex items-center justify-end">
                  <span className="font-bold">
                    Rs.{subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Cart Total Section */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">CART TOTAL</h2>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between py-2">
              <span className="font-medium">Subtotal</span>
              <span className="font-bold">Rs.{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-200">
              <span className="font-medium">Shipping</span>
              <span className="font-bold">FREE</span>
            </div>
            <div className="flex justify-between py-4 border-t border-gray-200 font-bold text-lg">
              <span>Total</span>
              <span>Rs.{subtotal.toFixed(2)}</span>
            </div>
            
           <button
  onClick={() => navigate("/checkout")}
  className="w-full bg-gray-800 text-white py-3 rounded-lg font-bold hover:bg-gray-700 transition mt-4"
>
  PROCEED TO CHECKOUT
</button>
          </div>
        </div>

        {/* Action Buttons at Bottom */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition"
          >
            CONTINUE SHOPPING
          </button>
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition"
          >
            CLEAR CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;