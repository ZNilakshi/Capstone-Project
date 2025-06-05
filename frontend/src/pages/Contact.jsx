import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

function Contact() {
  return (
    <div className="min-h-screen px-6 pb-16 text-gray-100 bg-black pt-28">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-4 text-5xl font-extrabold text-orange-500">
            Contact Us
          </h1>
          <p className="text-lg text-gray-300">
            We'd love to hear from you! Reach out to us through any of the
            following methods.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="mt-1 text-2xl text-orange-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">Phone</h3>
                <p className="text-gray-300">+94 77 727 5104</p>
                <p className="text-gray-300">+94 77 566 4800</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaEnvelope className="mt-1 text-2xl text-orange-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">Email</h3>
                <p className="text-gray-300">info@desilvawinestore.lk</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="mt-1 text-2xl text-orange-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Main Branch Address
                </h3>
                <p className="text-gray-300">
                  De Silva Wine Store, Main Street, Welimada, Sri Lanka
                </p>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="overflow-hidden border-2 border-orange-300 rounded-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.876590074438!2d80.91208929169974!3d6.905357906461594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae47bef190157d9%3A0x84f34a6deba62987!2sDe%20Silva%20Wine%20Stores!5e0!3m2!1sen!2slk!4v1748005068145!5m2!1sen!2slk"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[300px]"
              title="De Silva Wine Store Welimada"
            ></iframe>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold text-orange-400">Follow Us</h2>
          <div className="flex justify-center gap-6 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 transition hover:text-orange-400"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 transition hover:text-orange-400"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
