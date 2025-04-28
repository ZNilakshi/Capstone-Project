import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCart(null);
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data);
    } catch (err) {
      setError(err);
      if (err.response?.status === 401) {
        navigate("/auth");
      }
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/cart/update/${productId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data);
    } catch (err) {
      setError(err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }

      const response = await axios.delete(
        `http://localhost:5000/api/cart/remove/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data);
    } catch (err) {
      setError(err);
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }

      const response = await axios.delete(
        "http://localhost:5000/api/cart/clear",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);