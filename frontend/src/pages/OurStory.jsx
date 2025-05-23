import React from "react";
import { motion } from "framer-motion";

const timelineItems = [
    { year: "2005", text: "Dinan restaurant is established in Badulla." },
    { year: "2007", text: "De Silva Wine Store is established in Welimada." },
    { year: "2020", text: "Welimada pub is established in Welimada." },
    { year: "2024", text: "De Silva Wine Store is established in Kesbewa." },
    { year: "2024", text: "De Silva Wine Store is established in Arawwala." },
];

const branches = [
    {
        name: "De Silva Wine Store - Welimada (Main Branch)",
        description: "Retail sale of foreign liquor.",
        mapUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.876590074438!2d80.91208929169974!3d6.905357906461594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae47bef190157d9%3A0x84f34a6deba62987!2sDe%20Silva%20Wine%20Stores!5e0!3m2!1sen!2slk!4v1748005068145!5m2!1sen!2slk" 
    },
    {
        name: "Dinan restaurant - Badulla",
        description: "Retail sale of beer & stout.",
        mapUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.1779020737304!2d81.05586167499715!3d6.988314893012677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae463b76002d11b%3A0xbe6fbbe098a5b8fa!2sDinan%20Restaurant!5e0!3m2!1sen!2slk!4v1748005226424!5m2!1sen!2slk" 
    },
    {
        name: "Welimada pub - Welimada",
        address:'No. 70/11, Buddulla Road, Welimada, Sri Lanka.',
        description: "Retail sale of beer & stout.",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12670.902637697166!2d81.056915!3d6.991065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae4f8dc2f8d79f7%3A0x4e47e671a8b5ae42!2sBadulla!5e0!3m2!1sen!2slk!4v1618733123121!5m2!1sen!2slk"
    },
    {
        name: "De Silva Wine Store - Kesbewa.",
        description: "Retail sale of foreign liquor.",
        mapUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5213.381064928429!2d79.94520648607318!3d6.773110302611019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae24f004c8e96b5%3A0xf0af1c5b4096a7f8!2sDe%20Silva%20Wine%20Stores!5e0!3m2!1sen!2slk!4v1748005573038!5m2!1sen!2slk" 
    },
    {
        name: "De Silva Wine Store - Arawwala",
        description: "Retail sale of foreign liquor.",
        mapUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.558676574303!2d79.93438137499558!3d6.823403993174398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2510005c52cf5%3A0x5503ec14463fb73b!2sDe%20Silva%20Wine%20Stores%20-%20Arawwala!5e0!3m2!1sen!2slk!4v1748005650110!5m2!1sen!2slk" 
    }
];

function OurStory() {
    return (
        <div className="min-h-screen px-6 pb-12 text-gray-100 bg-black pt-28">
            <div className="max-w-6xl mx-auto space-y-20">

                {/* Header */}
                <div className="text-center">
                    <h1 className="mb-4 text-5xl font-extrabold text-orange-500">Our Story</h1>
                    <p className="text-lg text-gray-300">Welcome to De Silva Wine Store – Welimada</p>
                </div>

                {/* Owner & History in one row */}
                <section className="flex flex-col gap-10 md:flex-row">

                    {/* About the Owner */}
                    <div className="flex flex-col items-center flex-1 p-8 text-center shadow-xl bg-zinc-900 rounded-2xl md:items-start md:text-left">
                        <div className="flex justify-center w-full mb-6 md:justify-start">
                            <img
                                src="/owner.jpg" // need to replace with the actual  image
                                alt="Owner - Mr. De Silva"
                                className="object-cover border-4 border-orange-400 rounded-full shadow-md w-44 h-44"
                            />
                        </div>
                        <h2 className="mb-4 text-3xl font-semibold text-orange-400">About the Owner</h2>
                        <p className="text-lg leading-relaxed text-gray-300">
                            Founded by Mr. De Silva, a visionary entrepreneur with over 20 years in the beverage industry.
                            He’s known for his deep commitment to quality, community, and outstanding service.
                        </p>
                    </div>


                    {/* Our History */}
                    <div className="flex-1 p-8 shadow-xl bg-zinc-900 rounded-2xl">
                        <h2 className="mb-6 text-3xl font-semibold text-center text-orange-400 md:text-left">Our History</h2>
                        <div className="pl-4 space-y-6 border-l-4 border-orange-500">
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
                    <h2 className="mb-10 text-3xl font-semibold text-center text-orange-400">Our Branches</h2>
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                        {branches.map((branch, index) => (
                            <div key={index} className="p-6 space-y-4 shadow-lg bg-zinc-800 rounded-2xl">
                                <h3 className="text-2xl font-bold text-white">{branch.name}</h3>
                                <p className="text-gray-400 text-md">{branch.description}</p>
                                <div className="w-full overflow-hidden border-2 border-orange-300 aspect-square rounded-xl">
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
