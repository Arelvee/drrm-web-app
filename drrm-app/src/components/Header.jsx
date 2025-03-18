import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import LoginRegisterForm from './LoginForm.jsx';
import { Menu, X } from 'lucide-react';
import UPLogo from '../assets/UP.png';
import UPDrrm from '../assets/updrrm.png';
import UPNAME from '../assets/dname-yw-v2.png';
 
function Header() {
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [redirectPath, setRedirectPath] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser && redirectPath) {
                navigate(redirectPath);
                setRedirectPath(null);
            }
        });
        return () => unsubscribe();
    }, [redirectPath, navigate]);

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        navigate("/");
    };

    const handleProtectedRouteClick = (path, e) => {
        if (!user) {
            e.preventDefault();
            setRedirectPath(path);
            setShowLogin(true);
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 z-50 bg-red-900 backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <img src={UPLogo} alt="UP Logo" className="h-10 w-auto" />
                    <img src={UPDrrm} alt="UP DRRM" className="h-10 w-auto" />
                    <div className="h-10 border-l-2 border-white"></div>
                    <img src={UPNAME} alt="UP Name" className="h-10 w-auto" />
                </div>

                {/* Desktop Navbar */}
                <nav className="hidden lg:flex flex-grow justify-center">
                    <ul className="flex gap-8 text-white font-semibold text-sm">
                        <li>
                            <Link to="/" className="flex items-center gap-2  hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white
                            hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house">
                                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
                                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            </svg> Home
                            </Link>
                        </li>
                        <li>
                            <ScrollLink to="about" smooth={true} duration={500} className="cursor-pointer flex items-center gap-2  hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white
                            hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            About Us
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink to="trainings" smooth={true} duration={500} className="cursor-pointer flex items-center gap-2  hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white
                            hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                                Trainings
                            </ScrollLink>
                        </li>
                        <li>
                            <Link to={user ? "/e-learning" : "#"} onClick={(e) => handleProtectedRouteClick("/e-learning", e)} className="flex items-center gap-2  hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white
                            hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-play">
                            <path d="M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z"/>
                            <path d="M12 17v4"/><path d="M8 21h8"/><rect x="2" y="3" width="20" height="14" rx="2"/>
                            </svg>
                            E-Learning
                            </Link>
                        </li>
                        <li>
                            <Link to={user ? "/shop" : "#"} onClick={(e) => handleProtectedRouteClick("/shop", e)} className="flex items-center gap-2  hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white
                            hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                            Shop
                            </Link>
                        </li>
                        <li>
                            <ScrollLink to="contact" smooth={true} duration={500} className="cursor-pointer flex items-center gap-2  hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white
                            hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-call"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><path d="M14.05 2a9 9 0 0 1 8 7.94"/><path d="M14.05 6A5 5 0 0 1 18 10"/></svg>
                                Contact
                            </ScrollLink>
                        </li>
                    </ul>
                </nav>

                {/* Desktop Login/Logout */}
                <div className="hidden lg:flex">
                    {user ? (
                        <button onClick={handleLogout} className="flex items-center text-white font-semibold text-sm px-4 transition rounded-full">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-base text-white font-bold">
                            {user.email.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="ml-2">Log Out</span>
                    </button>
                    ) : (
                        <button onClick={() => setShowLogin(true)} className="hidden lg:flex bg-yellow-500 items-center border border-transparent hover:bg-transparent hover:border hover:border-white text-white font-semibold text-sm px-4 gap-1 transition rounded-full p-2"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15m3-3h-8m0 0l3-3m-3 3l3 3"></path>
                        </svg>
                            Log In
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </header>

            {/* Mobile Sidebar */}
            {menuOpen && (
                <div className="lg:hidden fixed top-0 left-0 w-64 h-full bg-red-900 text-white p-5 z-50 shadow-lg transition-transform">
                    <button className="absolute top-4 right-4" onClick={() => setMenuOpen(false)}>
                        <X size={24} />
                    </button>
                    <ul className="flex flex-col gap-6 mt-10">
                        <li>
                            <Link to="/" className="flex items-center gap-2 hover:underline" onClick={() => setMenuOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house">
                                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
                                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            </svg>Home
                            </Link>
                        </li>
                        <li>
                            <ScrollLink to="about" smooth={true} duration={500} className="cursor-pointer flex items-center gap-2 hover:underline" onClick={() => setMenuOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>About Us
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink to="trainings" smooth={true} duration={500} className="cursor-pointer flex items-center gap-2 hover:underline" onClick={() => setMenuOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>Trainings
                            </ScrollLink>
                        </li>
                        <li>
                            <Link to={user ? "/e-learning" : "#"} onClick={(e) => handleProtectedRouteClick("/e-learning", e)} className="flex items-center gap-2 hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-play">
                            <path d="M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z"/>
                            <path d="M12 17v4"/><path d="M8 21h8"/><rect x="2" y="3" width="20" height="14" rx="2"/>
                        </svg>E-Learning
                            </Link>
                        </li>
                        <li>
                            <Link to={user ? "/shop" : "#"} onClick={(e) => handleProtectedRouteClick("/shop", e)} className="flex items-center gap-2 hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>Shop
                            </Link>
                        </li>
                        <li>
                            <ScrollLink to="contact" smooth={true} duration={500} className="cursor-pointer flex items-center gap-2 hover:underline" onClick={() => setMenuOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-call"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><path d="M14.05 2a9 9 0 0 1 8 7.94"/><path d="M14.05 6A5 5 0 0 1 18 10"/></svg>Contact
                            </ScrollLink>
                        </li>
                    </ul>
                    <div className="mt-10">
                        {user ? (
                            <button onClick={handleLogout} className="flex items-center text-white font-semibold text-sm px-4 transition rounded-full">
                            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-base text-white font-bold">
                                {user.email.slice(0, 2).toUpperCase()}
                            </div>
                            <span className="ml-2">Log Out</span>
                        </button>
                        ) : (
                            <button onClick={() => { setShowLogin(true); setMenuOpen(false); }} className="flex bg-yellow-500 items-center border border-transparent hover:bg-transparent hover:border hover:border-white text-white font-semibold text-sm px-4 gap-1 transition rounded-full p-2"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15m3-3h-8m0 0l3-3m-3 3l3 3"></path>
                        </svg>
                            Log In
                        </button>
                        )}
                    </div>
                </div>
            )}

            {showLogin && <LoginRegisterForm closeForm={() => setShowLogin(false)} setUser={setUser} />}
        </>
    );
}

export default Header;
