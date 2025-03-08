import React from "react";
import { useNavigate } from "react-router-dom";

const ShopByBrand = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-black text-white px-4 py-6">

        <section className="flex flex-col md:flex-row items-center justify-center    bg-black">
            <div className="w-full  pr-6 mr-6 md:w-1/2 md:pl-12 mt-6 md:mt-0 text-center ">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">SHOP BY BRAND</h2>
            </div>
        </section>
           
            
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-4">
                <button onClick={() => navigate("/rockland")}>
                   <div className="flex justify-center">
                         <img
                         src="/Rockland-Logo.png"
                         alt="Rockland-Logo"
                         className="w-50 max-w-2xl h-50 object-cover"
                         />
                    </div>
                </button>

                <button onClick={() => navigate("/idl")}>
                   <div className="flex justify-center">
                         <img
                         src="/idl-logo.png"
                         alt="idl-logo"
                         className="w-55 max-w-2xl h-50 object-cover"
                         />
                    </div>
                </button>

                <button onClick={() => navigate("/dcsl")}>
                   <div className="flex justify-center">
                         <img
                         src="/DCSL_Logo.png"
                         alt="DCSL_Logo"
                         className="w-60 max-w-2xl h-50 object-cover"
                         />
                    </div>
                </button>

                <button onClick={() => navigate("/mendis")}>
                   <div className="flex justify-center">
                         <img
                         src="/mendis_logo.png"
                         alt="mendis"
                         className="w-45 max-w-2xl h-20 object-cover"
                         />
                    </div>
                </button>

                <button onClick={() => navigate("/lion")}>
                   <div className="flex justify-center">
                         <img
                         src="/lion-logo.png"
                         alt="lion"
                         className="w-50 max-w-2xl h-20 object-cover"
                         />
                    </div>
                </button>

                <button onClick={() => navigate("/heineken")}>
                   <div className="flex justify-center">
                         <img
                         src="/heineken-logo.png"
                         alt="heineken-logo"
                         className="w-40 max-w-2xl h-30 object-cover"
                         />
                    </div>
                </button>
            </div>
         </div>
    );
};

export default ShopByBrand ;
