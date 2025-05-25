import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-black text-gray-100 px-6 pt-28 pb-16">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold text-orange-500 mb-4">Privacy Policy</h1>
                    <p className="text-lg text-gray-300">Protecting your privacy is our priority</p>
                </div>

                {/* Policy Content */}
                <div className="bg-zinc-900 p-8 rounded-2xl shadow-xl space-y-8">
                    <p className="text-gray-400 text-md"><strong className="text-orange-400">Effective Date:</strong> [Insert Date]</p>

                    <section>
                        <h2 className="text-2xl font-semibold text-orange-400 mb-2">1. Information We Collect</h2>
                        <p className="text-gray-300 mb-2">We may collect the following types of information:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li><strong className="text-white">Personal Information:</strong> Name, email address, phone number, shipping address, etc.</li>
                            <li><strong className="text-white">Non-Personal Information:</strong> IP address, browser type, visited pages, etc.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-orange-400 mb-2">2. How We Use Your Information</h2>
                        <p className="text-gray-300">We use your information to process orders, verify age, improve service, and more.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-orange-400 mb-2">3. Age Verification</h2>
                        <p className="text-gray-300">Our site is for users 18 years and older. We may request age proof before processing orders.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-orange-400 mb-2">4. Sharing Your Information</h2>
                        <p className="text-gray-300">We do not sell your data. We may share it with trusted third-party providers or comply with legal requirements.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-orange-400 mb-2">5. Cookies and Tracking Technologies</h2>
                        <p className="text-gray-300">We use cookies to improve your experience. You can disable them in your browser settings.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-orange-400 mb-2">6. Data Security</h2>
                        <p className="text-gray-300">We use secure methods to protect your personal data.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-orange-400 mb-2">7. Your Rights</h2>
                        <p className="text-gray-300">You may request data access, correction, or deletion. Contact us at [Insert Email].</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-orange-400 mb-2">8. Changes to This Policy</h2>
                        <p className="text-gray-300">We may update this Privacy Policy. Changes will be posted here.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-orange-400 mb-2">9. Contact Us</h2>
                        <p className="text-gray-300 leading-relaxed">
                            De Silva Wine Store<br />
                            [Insert Address]<br />
                            Email: [Insert Email]<br />
                            Phone: [Insert Phone Number]
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
