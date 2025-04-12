import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const AuthForm = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/auth-bg.png')" }}
        >

            <div className="bg-[#2c0f0f]/90 p-8 rounded-2xl w-full max-w-md text-white shadow-2xl backdrop-blur transition-all duration-300 h-[540px] flex flex-col">
                {/* Tabs */}
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

                {/* Form Content - Centered */}
                <div className="transition-all duration-300 flex-1 flex flex-col justify-center">
                    {!isSignIn && (
                        <>
                            <InputBox icon={<FaUser />} placeholder="First Name" />
                            <InputBox icon={<FaUser />} placeholder="Last Name" />
                            <InputBox icon={<FaEnvelope />} placeholder="Email" type="email" />
                        </>
                    )}

                    <InputBox
                        icon={<FaUser />}
                        placeholder={isSignIn ? "User Name" : "Username"}
                    />
                    <InputBox icon={<FaLock />} placeholder="Password" type="password" />

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

                    {/* Action */}
                    <button className="w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition">
                        {isSignIn ? "Sign in" : "Create Account"}
                    </button>

                    {/* Toggle Form */}
                    <button
                        onClick={() => setIsSignIn(!isSignIn)}
                        className="text-sm mt-4 text-center block w-full text-gray-300 hover:text-white"
                    >
                        {isSignIn
                            ? "Don’t have an account?"
                            : "Already have an account?"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const InputBox = ({ icon, placeholder, type = "text", marginBottom = "mb-4" }) => (
    <div className={`flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 ${marginBottom}`}>
        <span className="text-white">{icon}</span>
        <input
            type={type}
            placeholder={placeholder}
            className="bg-transparent outline-none text-white w-full placeholder-gray-300"
        />
    </div>
);


export default AuthForm;
