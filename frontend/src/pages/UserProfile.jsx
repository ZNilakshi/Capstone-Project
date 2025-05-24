import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile"); // New state for tab management
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/auth"); // redirect to login
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      alert("Account deleted!");
    }
  };

  const handleSave = (event) => {
    event.preventDefault();
    const updatedUser = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profile updated successfully!");
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
        {/* Main Content Box */}
        <div className="w-[800px] min-h-[600px] bg-black bg-opacity-50 backdrop-blur-md rounded-lg p-6 mt-20">
          {/* Tab Navigation */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center bg-white rounded-lg">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-8 py-2 transition-all rounded-l-lg ${
                  activeTab === "profile"
                    ? "bg-gray-300 text-black"
                    : "bg-white text-black"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-8 py-2 transition-all rounded-r-lg ${
                  activeTab === "orders"
                    ? "bg-gray-300 text-black"
                    : "bg-white text-black"
                }`}
              >
                Order History
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="text-white">
            {activeTab === "profile" ? (
              // Profile Content
              <div className="space-y-6">
                {/* Profile Image */}
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 overflow-hidden bg-gray-300 rounded-full">
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Profile"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="fileInput"
                    onChange={handleUpload}
                  />
                  <label
                    htmlFor="fileInput"
                    className="inline-block px-4 py-2 text-black bg-white rounded-md cursor-pointer"
                  >
                    UPLOAD
                  </label>
                </div>

                {/* Profile Form */}
                <form className="space-y-4" onSubmit={handleSave}>
                  <input
                    type="text"
                    name="firstName"
                    defaultValue={user.firstName || ""}
                    placeholder="FIRST NAME"
                    className="w-full p-3 text-white border rounded-md bg-white/10 border-white/30"
                  />
                  <input
                    type="text"
                    name="lastName"
                    defaultValue={user.lastName || ""}
                    placeholder="LAST NAME"
                    className="w-full p-3 text-white border rounded-md bg-white/10 border-white/30"
                  />
                  <input
                    type="email"
                    name="email"
                    defaultValue={user.email || ""}
                    placeholder="EMAIL"
                    className="w-full p-3 text-white border rounded-md bg-white/10 border-white/30"
                  />
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={user.phone || ""}
                    placeholder="PHONE NUMBER"
                    className="w-full p-3 text-white border rounded-md bg-white/10 border-white/30"
                  />
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-6 py-2 text-black bg-white rounded-md"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="px-6 py-2 text-white bg-red-500 rounded-md"
                    >
                      Logout
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      className="px-6 py-2 text-white bg-red-700 rounded-md"
                    >
                      Delete Account
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // Order History Content
              <div className="text-center">
                <h3 className="mb-4 text-xl">Order History</h3>
                <p>No orders found.</p>
                {/* You can add order history content here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
