import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/auth");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        if (error.response?.status === 401) {
          navigate("/auth");
        }
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (activeTab === "orders") {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            navigate("/auth");
            return;
          }

          const response = await axios.get(
            "http://localhost:5000/api/user/orders",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setOrders(response.data);
        } catch (error) {
          console.error("Error fetching orders:", error);
          if (error.response?.status === 401) {
            navigate("/auth");
          }
        }
      }
    };

    fetchOrders();
  }, [activeTab, navigate]);

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/auth");
      alert("Account deleted successfully!");
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const updatedUser = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
      };

      await axios.put("http://localhost:5000/api/user/profile", updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(updatedUser);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
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
              />
              <input
                type="text"
                name="lastName"
                defaultValue={user.lastName || ""}
                placeholder="Last Name"
                className="w-full p-3 text-white border rounded-md bg-white/10 border-white/30"
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
            />
          </div>
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="px-6 py-2.5 text-white transition-all border rounded-md border-white/30 hover:bg-white/10"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderOrderHistory = () => {
    if (!orders || orders.length === 0) {
      return (
        <div className="mt-8 text-center">
          <h3 className="mb-4 text-xl text-white">Order History</h3>
          <p className="text-gray-400">No orders found.</p>
        </div>
      );
    }

    return (
      <div className="px-8 mt-8">
        <h3 className="mb-6 text-xl text-white">Order History</h3>
        <div className="space-y-4">
          {orders
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((order, index) => (
              <div
                key={order.id || index}
                className="p-4 border rounded-lg border-white/30 bg-white/5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Order Date</p>
                    <p className="text-white">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Total</p>
                    <p className="text-white">${order.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {order.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between py-2 border-t border-white/10"
                    >
                      <div className="flex-1">
                        <p className="text-white">{item.name}</p>
                        <p className="text-sm text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="text-white">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-white">Loading...</p>
      </div>
    );
  }

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
