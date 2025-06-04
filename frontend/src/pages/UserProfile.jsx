import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (err) {
        console.error("Failed to fetch user data", err);
        setError("Failed to load user data");
      }
    };

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetchUserData();
    }
  }, []);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  // Fetch user orders
  const fetchUserOrders = useCallback(async () => {
    try {
      setLoadingOrders(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/orders/user/${user.email}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      setError("Failed to load orders");
    } finally {
      setLoadingOrders(false);
    }
  }, [user?.email]);

  useEffect(() => {
    if (activeTab === "orders" && user?.email) {
      fetchUserOrders();
    }
  }, [activeTab, user?.email, fetchUserOrders]);

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      navigate("/auth");
      alert("Account deleted successfully!");
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const updatedUser = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
      };
      
      
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Failed to update profile");
    }
  };

  const renderProfileContent = () => {
    if (!isEditing) {
      return (
        <div className="flex flex-col h-full">
          <div className="flex-grow px-8 mt-8 space-y-6">
            <div className="py-4 border-b border-white/30">
              <p className="mb-2 text-base text-gray-400">Name</p>
              <p className="text-lg text-white">{`${user.firstName || ""} ${
                user.lastName || ""
              }`}</p>
            </div>
            <div className="py-4 border-b border-white/30">
              <p className="mb-2 text-base text-gray-400">Email</p>
              <p className="text-lg text-white">{user.email || ""}</p>
            </div>
            <div className="py-4 border-b border-white/30">
              <p className="mb-2 text-base text-gray-400">Phone</p>
              <p className="text-lg text-white">{user.phone || ""}</p>
            </div>
          </div>
          <div className="flex justify-end gap-4 px-8 mt-8">
            <button
              onClick={handleDeleteAccount}
              className="px-6 py-2.5 text-white transition-all border border-red-500 rounded-md hover:bg-red-500/10"
            >
              Delete Account
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2.5 text-white transition-all border rounded-md border-white/30 hover:bg-white/10"
            >
              Edit Profile
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full">
        <form className="flex-grow px-8 mt-8 space-y-6" onSubmit={handleSave}>
          <div>
            <label className="block mb-2 text-sm text-gray-400">Name</label>
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                defaultValue={user.firstName || ""}
                placeholder="First Name"
                className="w-full p-3 text-white border rounded-md bg-white/10 border-white/30"
                required
              />
              <input
                type="text"
                name="lastName"
                defaultValue={user.lastName || ""}
                placeholder="Last Name"
                className="w-full p-3 text-white border rounded-md bg-white/10 border-white/30"
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user.email || ""}
              placeholder="Email"
              className="w-full p-3 text-white border rounded-md bg-white/10 border-white/30"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-400">Phone</label>
            <input
              type="tel"
              name="phone"
              defaultValue={user.phone || ""}
              placeholder="Phone Number"
              className="w-full p-3 text-white border rounded-md bg-white/10 border-white/30"
              required
            />
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2.5 text-white transition-all border rounded-md border-white/30 hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderOrderHistory = () => {
    if (error) {
      return (
        <div className="mt-8 text-center">
          <p className="text-red-400">{error}</p>
          <button 
            onClick={fetchUserOrders}
            className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      );
    }

    if (loadingOrders) {
      return (
        <div className="mt-8 text-center">
          <p className="text-gray-400">Loading orders...</p>
        </div>
      );
    }

    if (!orders.length) {
      return (
        <div className="mt-8 text-center">
          <h3 className="mb-4 text-xl text-white">Order History</h3>
          <p className="text-gray-400">No orders found.</p>
        </div>
      );
    }

    return (
      <div className="px-8 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl text-white">Order History</h3>
          <button 
            onClick={fetchUserOrders}
            className="px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600"
          >
            Refresh
          </button>
        </div>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 border rounded-lg border-white/30 bg-white/5"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-400">Order Date</p>
                  <p className="text-white">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
               
                <div className="text-right">
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="text-white">Rs.{order.total.toFixed(2)}</p>
                </div>
              </div>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between py-2 border-t border-white/10"
                  >
                    <div className="flex-1">
                      <p className="text-white">{item.name}</p>
                      <p className="text-sm text-gray-400">
                        {item.size && `Size: ${item.size} | `}
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="text-white">Rs.{item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: "url('/profile-bg.webp')" }}
    >
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="w-[800px] min-h-[600px] bg-black bg-opacity-50 backdrop-blur-md rounded-lg p-6 mt-20">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-8 border-b border-gray-300">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-8 py-2 transition-all text-lg relative ${
                  activeTab === "profile"
                    ? "text-white font-semibold"
                    : "text-gray-400"
                }`}
              >
                Profile
                {activeTab === "profile" && (
                  <div className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-orange-500"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-8 py-2 transition-all text-lg relative ${
                  activeTab === "orders"
                    ? "text-white font-semibold"
                    : "text-gray-400"
                }`}
              >
                Order History
                {activeTab === "orders" && (
                  <div className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-orange-500"></div>
                )}
              </button>
            </div>
          </div>

          <div className="text-white">
            {activeTab === "profile"
              ? renderProfileContent()
              : renderOrderHistory()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;