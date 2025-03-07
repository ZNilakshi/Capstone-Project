import React, { useState } from "react";

const Account = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleLogout = () => {
    alert("Logging out...");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      alert("Account deleted!");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Main Content (3/4 of screen width) */}
      <main className="flex items-center justify-center w-3/4 h-full p-8">
        <div className="w-full max-w-lg">
          <h2 className="mt-8 mb-6 text-xl font-semibold text-left">
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
              className="inline-block px-4 py-2 text-white bg-gray-700 rounded-md cursor-pointer"
            >
              UPLOAD
            </label>
          </div>

          {/* Account Form */}
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="FIRST NAME"
              className="p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="LAST NAME"
              className="p-3 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              placeholder="EMAIL"
              className="p-3 border border-gray-300 rounded-md"
            />
            <input
              type="tel"
              placeholder="PHONE NUMBER"
              className="p-3 border border-gray-300 rounded-md"
            />
            <button className="px-4 py-2 text-white bg-gray-700 rounded-md">
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

export default Account;
