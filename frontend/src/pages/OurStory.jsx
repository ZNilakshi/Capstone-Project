import React from "react";
import { motion } from "framer-motion";

const timelineItems = [
    { year: "2003", text: "De Silva Wine Store is established in Welimada." },
    { year: "2010", text: "Second branch opened in Bandarawela." },
    { year: "2018", text: "Expanded product range and services." },
    { year: "2023", text: "Opened new branch in Badulla." },
];

const branches = [
    {
        name: "Welimada (Main Branch)",
        description: "Heart of the hill country, our origin and flagship store.",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12674.83081233136!2d81.1002124!3d6.9904296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae4ef85b86e9c33%3A0x81e71d7d64eebb1f!2sWelimada!5e0!3m2!1sen!2slk!4v1618729162304!5m2!1sen!2slk"
    },
    {
        name: "Bandarawela",
        description: "Serving the bustling town with premium service.",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.774179434003!2d80.989807!3d6.830641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3b1f65ad7ce97%3A0x3441f4126e1f1c9d!2sBandarawela!5e0!3m2!1sen!2slk!4v1618732944569!5m2!1sen!2slk"
    },
    {
        name: "Badulla",
        description: "Our newest branch, delivering convenience and excellence.",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12670.902637697166!2d81.056915!3d6.991065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae4f8dc2f8d79f7%3A0x4e47e671a8b5ae42!2sBadulla!5e0!3m2!1sen!2slk!4v1618733123121!5m2!1sen!2slk"
    }
];

function OurStory() {
    return (
        <div className="min-h-screen bg-black text-gray-100 px-6 pt-28 pb-12">
            <div className="max-w-6xl mx-auto space-y-20">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold text-orange-500 mb-4">Our Story</h1>
                    <p className="text-lg text-gray-300">Welcome to De Silva Wine Store – Welimada</p>
                </div>

                {/* Owner & History in one row */}
                <section className="flex flex-col md:flex-row gap-10">

                    {/* About the Owner */}
                    <div className="bg-zinc-900 p-8 rounded-2xl shadow-xl flex-1 flex flex-col items-center text-center md:items-start md:text-left">
                        <div className="w-full flex justify-center md:justify-start mb-6">
                            <img
                                src="/owner.jpg" // need to replace with the actual  image
                                alt="Owner - Mr. De Silva"
                                className="w-44 h-44 rounded-full object-cover border-4 border-orange-400 shadow-md"
                            />
                        </div>
                        <h2 className="text-3xl font-semibold text-orange-400 mb-4">About the Owner</h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Founded by Mr. De Silva, a visionary entrepreneur with over 20 years in the beverage industry.
                            He’s known for his deep commitment to quality, community, and outstanding service.
                        </p>
                    </div>


                    {/* Our History */}
                    <div className="bg-zinc-900 p-8 rounded-2xl shadow-xl flex-1">
                        <h2 className="text-3xl font-semibold text-orange-400 mb-6 text-center md:text-left">Our History</h2>
                        <div className="space-y-6 pl-4 border-l-4 border-orange-500">
                            {timelineItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <h4 className="text-xl font-bold text-white">{item.year}</h4>
                                    <p className="text-gray-300 text-md">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </section>

                {/* Our Branches */}
                <section className="space-y-12">
                    <h2 className="text-3xl font-semibold text-orange-400 text-center mb-10">Our Branches</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {branches.map((branch, index) => (
                            <div key={index} className="bg-zinc-800 p-6 rounded-2xl shadow-lg space-y-4">
                                <h3 className="text-2xl font-bold text-white">{branch.name}</h3>
                                <p className="text-gray-400 text-md">{branch.description}</p>
                                <div className="w-full aspect-square overflow-hidden rounded-xl border-2 border-orange-300">
                                    <iframe
                                        className="w-full h-full"
                                        src={branch.mapUrl}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`Map of ${branch.name}`}
                                    ></iframe>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}


export default OurStory;
