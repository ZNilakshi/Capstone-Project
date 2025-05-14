import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState(null);
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
    <div className="flex h-screen min-h-screen bg-black text-gray-100 px-6 pt-28 pb-12">
      {/* Main Content (3/4 of screen width) */}
      <main className="flex items-center justify-center w-3/4 h-full p-8">
        <div className="w-full max-w-lg">
          <h2 className="text-4xl font-extrabold text-orange-500 mb-6 text-center">
            MY ACCOUNT
          </h2>

          {/* Profile Image */}
          <div className="mb-6 text-center">
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

            {/* File Upload Input */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="fileInput"
              onChange={handleUpload}
            />
            <label
              htmlFor="fileInput"
              className="inline-block px-4 py-2 bg-orange-500 text-white rounded-md cursor-pointer"
            >
              UPLOAD
            </label>
          </div>

          {/* Account Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSave}>
            <input
              type="text"
              name="firstName"
              defaultValue={user.firstName || ""}
              placeholder="FIRST NAME"
              className="p-3 border border-gray-300 rounded-md text-gray-500"
            />
            <input
              type="text"
              name="lastName"
              defaultValue={user.lastName || ""}
              placeholder="LAST NAME"
              className="p-3 border border-gray-300 rounded-md text-gray-500"
            />
            <input
              type="email"
              name="email"
              defaultValue={user.email || ""}
              placeholder="EMAIL"
              className="p-3 border border-gray-300 rounded-md text-gray-500"
            />
            <input
              type="tel"
              name="phone"
              defaultValue={user.phone || ""}
              placeholder="PHONE NUMBER"
              className="p-3 border border-gray-300 rounded-md text-gray-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md"
            >
              SAVE
            </button>
          </form>
        </div>
      </main>

      {/* Sidebar (1/4 of screen width) - Now on the RIGHT */}
      <aside className="relative w-1/4 h-full">
        {/* Sidebar Image */}
        <img
          src="/account.png"
          alt="Cocktail"
          className="object-cover w-full h-full"
        />

        {/* Overlay Buttons */}
        <div className="absolute bottom-0 left-0 flex flex-col justify-end w-full h-full gap-4 p-4 bg-black bg-opacity-20">
          <button
            onClick={handleLogout}
            className="w-full py-2 text-white bg-orange-500 rounded-md"
          >
            LOGOUT
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-full py-2 text-white bg-red-500 rounded-md"
          >
            DELETE ACCOUNT
          </button>
        </div>
      </aside>
    </div>
  );
};

export default UserProfile;
