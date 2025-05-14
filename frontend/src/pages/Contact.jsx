import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram } from "react-icons/fa";

function Contact() {
    return (
        <div className="min-h-screen bg-black text-gray-100 px-6 pt-28 pb-16">
            <div className="max-w-4xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold text-orange-500 mb-4">Contact Us</h1>
                    <p className="text-lg text-gray-300">We'd love to hear from you! Reach out to us through any of the following methods.</p>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <FaPhoneAlt className="text-orange-400 text-2xl mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-white">Phone</h3>
                                <p className="text-gray-300">+94 77 123 4567</p>
                                <p className="text-gray-300">+94 71 987 6543</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <FaEnvelope className="text-orange-400 text-2xl mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-white">Email</h3>
                                <p className="text-gray-300">info@desilvawinestore.lk</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <FaMapMarkerAlt className="text-orange-400 text-2xl mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-white">Main Branch Address</h3>
                                <p className="text-gray-300">De Silva Wine Store, Main Street, Welimada, Sri Lanka</p>
                            </div>
                        </div>
                    </div>

                    {/* Google Map */}
                    <div className="rounded-xl overflow-hidden border-2 border-orange-300">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12674.83081233136!2d81.1002124!3d6.9904296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae4ef85b86e9c33%3A0x81e71d7d64eebb1f!2sWelimada!5e0!3m2!1sen!2slk!4v1618729162304!5m2!1sen!2slk"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full min-h-[300px]"
                            title="De Silva Wine Store Welimada"
                        ></iframe>
                    </div>
                </div>

                {/* Social Links */}
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-semibold text-orange-400">Follow Us</h2>
                    <div className="flex justify-center gap-6 text-2xl">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange-400 transition">
                            <FaFacebookF />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange-400 transition">
                            <FaInstagram />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Contact;
