import React, { useState, useEffect } from "react";

const AgeVerification = () => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const storedVerification = localStorage.getItem("ageVerified");
    if (storedVerification === "true") {
      setIsVerified(true);
    }
  }, []);

  const handleVerification = (verified) => {
    if (verified) {
      localStorage.setItem("ageVerified", "true");
      setIsVerified(true);
    } else {
      alert("You must be 21 or older to access this site.");
    }
  };

  if (isVerified) return null; // Hide modal if verified

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm  px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-20 rounded-lg text-center shadow-2xl border border-white border-opacity-30 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Are you over 21 years of age?
        </h2>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-orange-500 text-black px-10 py-3 rounded-lg font-bold transition-transform hover:scale-105 hover:bg-white hover:text-orange-600"
            onClick={() => handleVerification(true)}
          >
            Yes
          </button>
          <button
            className="bg-white text-black px-10 py-3 rounded-lg font-bold transition-transform hover:scale-105 hover:bg-orange-600 hover:text-white "
            onClick={() => handleVerification(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;
