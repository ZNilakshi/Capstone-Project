import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const navigate = useNavigate();

  // Common axios config
  const authAxios = axios.create({
    baseURL: API_BASE_URL,
  });

  // Add request interceptor to handle token refresh if needed
  authAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const handleAuthError = useCallback((err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Store the current path for redirect after login
      localStorage.setItem("redirectPath", window.location.pathname);
      navigate("/auth", { state: { from: window.location.pathname } });
    }
  }, [navigate]);

  const protectedCartAction = useCallback(async (action) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Store current path for redirect
      localStorage.setItem("redirectPath", window.location.pathname);
      navigate("/auth");
      throw new Error("Authentication required");
    }
    
    try {
      return await action();
    } catch (err) {
      handleAuthError(err);
      throw err;
    }
  }, [navigate, handleAuthError]);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setCart(null);
        return;
      }

      const response = await authAxios.get("/api/cart");
      setCart(response.data);
    } catch (err) {
      handleAuthError(err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [authAxios, handleAuthError]);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    return protectedCartAction(async () => {
      const response = await authAxios.post("/api/cart/add", {
        productId,
        quantity
      });
      setCart(response.data);
      return response.data;
    });
  }, [authAxios, protectedCartAction]);

  const updateQuantity = useCallback(async (productId, quantity) => {
    return protectedCartAction(async () => {
      const response = await authAxios.put(`/api/cart/update/${productId}`, {
        quantity
      });
      setCart(response.data);
      return response.data;
    });
  }, [authAxios, protectedCartAction]);

  const removeFromCart = useCallback(async (productId) => {
    return protectedCartAction(async () => {
      const response = await authAxios.delete(`/api/cart/remove/${productId}`);
      setCart(response.data);
      return response.data;
    });
  }, [authAxios, protectedCartAction]);

  const clearCart = useCallback(async () => {
    return protectedCartAction(async () => {
      const response = await authAxios.delete("/api/cart/clear");
      setCart(response.data);
      return response.data;
    });
  }, [authAxios, protectedCartAction]);

  const submitOrder = useCallback(async (orderData) => {
    try {
      setOrderLoading(true);
      setOrderError(null);
      
      const response = await protectedCartAction(async () => {
        return await authAxios.post("/api/orders", orderData);
      });
      
      // Clear cart after successful order
      await clearCart();
      
      return response.data;
    } catch (err) {
      setOrderError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setOrderLoading(false);
    }
  }, [authAxios, clearCart, protectedCartAction]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        orderLoading,
        orderError,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
        submitOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
