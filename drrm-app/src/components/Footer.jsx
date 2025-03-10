import React, { useEffect, useState } from 'react';
import UPLogo from '../assets/UP.png';
import UPDrrm from '../assets/updrrm.png';
import UPNAME from '../assets/dname-yw-v2.png';

function Footer() {
    const [visitCount, setVisitCount] = useState(0);

    // Track total visits using localStorage
    useEffect(() => {
        const count = localStorage.getItem('visitCount');
        const newCount = count ? parseInt(count) + 1 : 1;
        localStorage.setItem('visitCount', newCount);
        setVisitCount(newCount);
    }, []);

    return (
        <footer className="bg-red-900 text-white">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    
                    {/* Contact Section */}
                    <div className="space-y-6 text-white mx-auto">
                        <div className="flex items-center justify-center gap-2">
                            <img src={UPLogo} alt="UP Logo" className="h-8 lg:h-14 w-auto" />
                            <img src={UPDrrm} alt="UPDRRM Logo" className="h-8 lg:h-14 w-auto" />
                            <div className="border-l-2 border-white h-10 lg:h-14"></div>
                            <img src={UPNAME} alt="DNAME Logo" className="h-10 lg:h-14 w-auto" />
                        </div>

                        <div className="space-y-3">
                            <p className="flex items-center text-sm">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                670 Padre Faura St, Ermita, Manila, 1000 Metro Manila
                            </p>
                            <p className="flex items-center text-sm">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                123-6921-08
                            </p>
                            <p className="flex items-center text-sm">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                                upm-drrmh-list@up.edu.ph
                            </p>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="space-y-4 text-center md:text-left">
                        <h1 className="text-2xl font-bold text-white">Be Updated!</h1>
                        <p className="text-gray-300">Stay in the loop and sign up for the UP DRRM-H Program newsletter:</p>
                        <div className="flex items-center bg-white border rounded-xl shadow-md overflow-hidden">
                            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none" />
                            <button className="bg-red-900 text-white p-3 justify-center items-center rounded-full w-10 h-10 hover:bg-red-800 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-2" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        <a href="https://flowbite.com/" className="hover:underline">© UP MANILA DRRM-H PROGRAM</a>. All Rights Reserved 2025.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-6">
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            Terms & Conditions
                        </a>
                        <span className="text-sm text-gray-500">|</span>
                        <span className="text-sm text-gray-500">
                            Total Visits: <strong>{visitCount}</strong>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
