import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    rememberMe: false,
    acceptTerms: false
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isSignIn ? "/signin" : "/signup";
      const payload = isSignIn
        ? {
            username: formData.username,
            password: formData.password
          }
        : {
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            email: formData.email,
            password: formData.password
          };

      const response = await axios.post(
        `http://localhost:8080/api/auth${endpoint}`,
        payload
      );

      if (isSignIn) {
       
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          roles: response.data.roles
        }));

       
        if (response.data.roles.includes("ROLE_ADMIN")) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        // Show success message and switch to sign in
        setIsSignIn(true);
        setError(""); // Clear any errors
        alert("Registration successful! Please sign in.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="bg-[#2c0f0f]/90 p-8 rounded-2xl w-full max-w-md text-white shadow-2xl backdrop-blur transition-all duration-300 h-[540px] flex flex-col">
        {/* Tabs */}
        <div className="flex justify-between border-b border-orange-500 mb-6">
          <button
            className={`w-1/2 text-lg font-semibold py-2 ${
              isSignIn
                ? "border-b-2 border-orange-500 text-white"
                : "text-gray-400"
            }`}
            onClick={() => {
              setIsSignIn(true);
              setError("");
            }}
          >
            Sign in
          </button>
          <button
            className={`w-1/2 text-lg font-semibold py-2 ${
              !isSignIn
                ? "border-b-2 border-orange-500 text-white"
                : "text-gray-400"
            }`}
            onClick={() => {
              setIsSignIn(false);
              setError("");
            }}
          >
            Sign up
          </button>
        </div>

        
        {error && (
          <div className="mb-4 p-2 bg-red-500/80 text-white text-sm rounded-lg">
            {error}
          </div>
        )}

        
        <form
          onSubmit={handleSubmit}
          className="transition-all duration-300 flex-1 flex flex-col justify-center"
        >
          {!isSignIn && (
            <>
              <InputBox
                icon={<FaUser />}
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <InputBox
                icon={<FaUser />}
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <InputBox
                icon={<FaEnvelope />}
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </>
          )}

          <InputBox
            icon={<FaUser />}
            placeholder={isSignIn ? "Username" : "Username"}
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <InputBox
            icon={<FaLock />}
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

         
          {isSignIn ? (
            <div className="flex justify-between items-center text-sm text-gray-300 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-orange-500"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-xs bg-white/10 px-2 py-1 rounded-xl hover:text-white"
              >
                Forget Password?
              </button>
            </div>
          ) : (
            <div className="text-sm text-gray-300 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-orange-500"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                />
                I accept the terms and conditions
              </label>
            </div>
          )}

        
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : isSignIn ? (
              "Sign in"
            ) : (
              "Create Account"
            )}
          </button>

         
          <button
            type="button"
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-sm mt-4 text-center block w-full text-gray-300 hover:text-white"
          >
            {isSignIn
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

const InputBox = ({
  icon,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  marginBottom = "mb-4"
}) => (
  <div className={`flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 ${marginBottom}`}>
    <span className="text-white">{icon}</span>
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="bg-transparent outline-none text-white w-full placeholder-gray-300"
    />
  </div>
);

export default AuthForm;