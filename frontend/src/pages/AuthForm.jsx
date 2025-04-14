import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const AuthForm = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // clear error on change
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = "Username is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";

        if (!isSignIn) {
            if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
            if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
            if (!formData.email.trim()) {
                newErrors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = "Invalid email format";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted:", formData);
            // Proceed with submission or API call here
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/auth-bg.png')" }}
        >
            <div className="bg-[#2c0f0f]/90 p-0 rounded-2xl w-full max-w-md text-white shadow-2xl backdrop-blur transition-all duration-300 h-[540px] flex flex-col">
                {/* Tabs */}
                <div className="flex justify-between bg-[#1e0a0a] rounded-t-2xl">
                    <button
                        className={`w-1/2 text-lg font-semibold py-3 relative transition-colors duration-300 ${isSignIn ? "text-white" : "text-gray-400"
                            }`}
                        onClick={() => {
                            setIsSignIn(true);
                            setErrors({});
                        }}
                    >
                        Sign in
                        {isSignIn && (
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-[3px] bg-orange-500 rounded-full" />
                        )}
                    </button>
                    <button
                        className={`w-1/2 text-lg font-semibold py-3 relative transition-colors duration-300 ${!isSignIn ? "text-white" : "text-gray-400"
                            }`}
                        onClick={() => {
                            setIsSignIn(false);
                            setErrors({});
                        }}
                    >
                        Sign up
                        {!isSignIn && (
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-[3px] bg-orange-500 rounded-full" />
                        )}
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 flex-1 flex flex-col justify-center">
                    {!isSignIn && (
                        <>
                            <InputBox
                                icon={<FaUser />}
                                placeholder="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                error={errors.firstName}
                            />
                            <InputBox
                                icon={<FaUser />}
                                placeholder="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                error={errors.lastName}
                            />
                            <InputBox
                                icon={<FaEnvelope />}
                                placeholder="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={errors.email}
                            />
                        </>
                    )}

                    <InputBox
                        icon={<FaUser />}
                        placeholder={isSignIn ? "User Name" : "Username"}
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        error={errors.username}
                    />
                    <InputBox
                        icon={<FaLock />}
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />

                    {/* Options */}
                    {isSignIn ? (
                        <div className="flex justify-between items-center text-sm text-gray-300 mb-4">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-orange-500" />
                                Remember me
                            </label>
                            <button className="text-xs bg-white/10 px-2 py-1 rounded-xl hover:text-white">
                                Forget Password?
                            </button>
                        </div>
                    ) : (
                        <div className="text-sm text-gray-300 mb-4">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-orange-500" />
                                I accept the terms and conditions
                            </label>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition"
                    >
                        {isSignIn ? "Sign in" : "Create Account"}
                    </button>

                    <button
                        onClick={() => setIsSignIn(!isSignIn)}
                        type="button"
                        className="text-sm mt-4 text-center block w-full text-gray-300 hover:text-white"
                    >
                        {isSignIn
                            ? "Don’t have an account?"
                            : "Already have an account?"}
                    </button>
                </form>
            </div>
        </div>
    );
};

// Reusable InputBox component
const InputBox = ({
    icon,
    placeholder,
    type = "text",
    name,
    value,
    onChange,
    error,
    marginBottom = "mb-4",
}) => (
    <div className={`${marginBottom}`}>
        <div className={`flex items-center gap-3 bg-white/10 rounded-full px-4 py-2`}>
            <span className="text-white">{icon}</span>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="bg-transparent outline-none text-white w-full placeholder-gray-300"
            />
        </div>
        {error && <p className="text-sm text-red-400 mt-1 ml-2">{error}</p>}
    </div>
);

export default AuthForm;
