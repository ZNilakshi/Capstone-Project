import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const AuthForm = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        role: "user",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = isSignIn
                ? "http://localhost:5000/api/auth/login"
                : "http://localhost:5000/api/auth/register";

            const payload = isSignIn
                ? { username: formData.username, password: formData.password }
                : formData;

            const res = await axios.post(url, payload);
            console.log("Response:", res.data);

            if (isSignIn) {
                alert("Login successful!");
                localStorage.setItem("user", JSON.stringify(res.data.user)); // store user info
                window.location.href = "/"; // redirect to home
            } else {
                alert("Registration successful! You can now log in.");
                setIsSignIn(true);
            }
        } catch (err) {
            console.error("Error:", err.response?.data?.message || err.message);
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/auth-bg.png')" }}
        >
            <div className="bg-[#2c0f0f]/90 p-8 rounded-2xl w-full max-w-md text-white shadow-2xl backdrop-blur transition-all duration-300 h-[540px] flex flex-col">
                <div className="flex justify-between border-b border-orange-500 mb-6">
                    <button
                        className={`w-1/2 text-lg font-semibold py-2 ${isSignIn
                            ? "border-b-2 border-orange-500 text-white"
                            : "text-gray-400"
                            }`}
                        onClick={() => setIsSignIn(true)}
                    >
                        Sign in
                    </button>
                    <button
                        className={`w-1/2 text-lg font-semibold py-2 ${!isSignIn
                            ? "border-b-2 border-orange-500 text-white"
                            : "text-gray-400"
                            }`}
                        onClick={() => setIsSignIn(false)}
                    >
                        Sign up
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center">
                    {!isSignIn && (
                        <>
                            <InputBox
                                icon={<FaUser />}
                                placeholder="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <InputBox
                                icon={<FaUser />}
                                placeholder="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            <InputBox
                                icon={<FaEnvelope />}
                                placeholder="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </>
                    )}

                    <InputBox
                        icon={<FaUser />}
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <InputBox
                        icon={<FaLock />}
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

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
                                <input type="checkbox" className="accent-orange-500" required />
                                I accept the terms and conditions
                            </label>
                        </div>
                    )}

                    <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition">
                        {isSignIn ? "Sign in" : "Create Account"}
                    </button>

                    <button
                        onClick={() => setIsSignIn(!isSignIn)}
                        type="button"
                        className="text-sm mt-4 text-center block w-full text-gray-300 hover:text-white"
                    >
                        {isSignIn ? "Don’t have an account?" : "Already have an account?"}
                    </button>
                </form>
            </div>
        </div>
    );
};

const InputBox = ({ icon, placeholder, type = "text", name, value, onChange }) => (
    <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 mb-4">
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
);

export default AuthForm;
