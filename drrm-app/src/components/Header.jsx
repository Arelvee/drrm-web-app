import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import LoginRegisterForm from './LoginForm.jsx';
import { Menu, X } from 'lucide-react';
import UPLogo from '../assets/UP.png';
import UPDrrm from '../assets/updrrm.png';
import UPNAME from '../assets/dname-yw-v2.png';
import { House, Users, Info, MonitorPlay, ShoppingCart, PhoneCall, LogIn, Briefcase } from 'lucide-react';

function Header() {
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [redirectPath, setRedirectPath] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const userRef = doc(db, "users", currentUser.uid);
                const userSnap = await getDoc(userRef);
                setIsAdmin(userSnap.exists() && userSnap.data().role === "admin");
            } else {
                setIsAdmin(false);
            }

            if (currentUser && redirectPath) {
                navigate(redirectPath);
                setRedirectPath(null);
            }
        });
        return () => unsubscribe();
    }, [redirectPath, navigate]);

    const handleLogout = async () => {
        await signOut(auth);
        showPopup("Log Out Successfully!");
        setUser(null);
        setIsAdmin(false);
        navigate("/");
    };

    const handleProtectedRouteClick = (path, e) => {
        if (!user) {
            e.preventDefault();
            setRedirectPath(path);
            setShowLogin(true);
        }
    };

    const showPopup = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 5000);
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
                            <Link to="/" className="flex items-center gap-2 hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white">
                                <House size={25}/> Home
                            </Link>
                        </li>
                        <li>
                            <HashLink smooth to="/#about" className="cursor-pointer flex items-center gap-2 hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white">
                                <Users size={25}/> About Us
                            </HashLink>
                        </li>
                        <li>
                            <HashLink smooth to="/#trainings" className="cursor-pointer flex items-center gap-2 hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white">
                                <Info size={25}/> Trainings
                            </HashLink>
                        </li>
                        <li>
                            <Link to={user ? "/e-learning" : "#"} onClick={(e) => handleProtectedRouteClick("/e-learning", e)} className="flex items-center gap-2 hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white">
                                <MonitorPlay size={25}/> E-Learning
                            </Link>
                        </li>
                        <li>
                            <Link to="/shop" className="flex items-center gap-2 hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white">
                                <ShoppingCart size={25}/> Shop
                            </Link>
                        </li>
                        <li>
                            <HashLink smooth to="/#contact" className="cursor-pointer flex items-center gap-2 hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white">
                                <PhoneCall size={25}/> Contact
                            </HashLink>
                        </li>
                        <li>
                            <Link to="/careers" className="flex items-center gap-2 hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white">
                                <Briefcase size={25}/> Careers
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Desktop Login/Logout/Admin */}
                <div className="hidden lg:flex items-center gap-4">
                    {user && isAdmin && (
                        <Link to="/admin/manual-post" className="text-white font-semibold text-sm px-4 py-2 rounded hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8">
                            Admin Panel
                        </Link>
                    )}
                    {user ? (
                        <button onClick={handleLogout} className="flex items-center text-white font-semibold text-sm px-4 transition rounded-full">
                            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-base text-white font-bold">
                                {user.email.slice(0, 2).toUpperCase()}
                            </div>
                            <span className="ml-2 hover:underline hover:decoration-yellow-500 hover:decoration-4 hover:underline-offset-8 hover:text-white">Log Out</span>
                        </button>
                    ) : (
                        <button onClick={() => setShowLogin(true)} className="hidden lg:flex bg-yellow-500 items-center border border-transparent hover:bg-transparent hover:border hover:border-white text-white font-semibold text-sm px-4 gap-1 transition rounded-full p-2">
                            Log In <LogIn size={25}/>
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
                <div className="lg:hidden fixed top-15 right-0 w-64 h-full bg-red-900 text-white p-5 z-50 shadow-lg transition-transform">
                    <ul className="flex flex-col gap-6 mt-10">
                        <li>
                            <HashLink to="/#home" className="flex items-center gap-2 hover:underline" onClick={() => setMenuOpen(false)}><House size={25}/>Home</HashLink>
                        </li>
                        <li>
                            <HashLink smooth to="/#about" className="cursor-pointer flex items-center gap-2 hover:underline" onClick={() => setMenuOpen(false)}><Users size={25}/> About Us</HashLink>
                        </li>
                        <li>
                            <HashLink smooth to="/#trainings" className="cursor-pointer flex items-center gap-2 hover:underline" onClick={() => setMenuOpen(false)}><Info size={25}/> Trainings</HashLink>
                        </li>
                        <li>
                            <Link to={user ? "/e-learning" : "#"} onClick={(e) => handleProtectedRouteClick("/e-learning", e)} className="flex items-center gap-2 hover:underline"><MonitorPlay size={25}/> E-Learning</Link>
                        </li>
                        <li>
                            <Link to="/shop" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:underline"><ShoppingCart size={25}/> Shop</Link>
                        </li>
                        <li>
                            <HashLink smooth to="/#contact" className="cursor-pointer flex items-center gap-2 hover:underline" onClick={() => setMenuOpen(false)}><PhoneCall size={25}/> Contact</HashLink>
                        </li>
                        {user && isAdmin && (
                            <li>
                                <Link to="/admin/manual-post" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:underline">
                                    🛠 Admin Panel
                                </Link>
                            </li>
                        )}
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
                            <button onClick={() => { setShowLogin(true); setMenuOpen(false); }} className="flex bg-yellow-500 items-center border border-transparent hover:bg-transparent hover:border hover:border-white text-white font-semibold text-sm px-4 gap-1 transition rounded-full p-2">
                                <LogIn size={25}/> Log In
                            </button>
                        )}
                    </div>
                </div>
            )}

            {showLogin && <LoginRegisterForm closeForm={() => setShowLogin(false)} setUser={setUser} />}
            {message && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <div className="bg-black/60 text-white text-2xl font-bold px-6 py-4 rounded-lg shadow-lg">
                        {message}
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
