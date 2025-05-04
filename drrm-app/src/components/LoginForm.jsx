import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { auth, db } from "../firebase/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const LoginRegisterForm = ({ closeForm, setUser, alertMessage }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(alertMessage || "");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (alertMessage) {
            setError(alertMessage);
        }
    }, [alertMessage]);

    const handleAuth = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!isLogin && password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            if (isLogin) {
                // 🔹 Login user
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // 🔹 Fetch role from Firestore
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    
                    // 🔹 Redirect based on role
                    if (userData.role === "admin") {
                        navigate("/admin/manual-post");
                    } else {
                        setUser(user);
                        closeForm();
                    }
                } else {
                    setError("User data not found.");
                }

            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const newUser = userCredential.user;

                const userRef = doc(db, "users", newUser.uid);
                await setDoc(userRef, {
                    email: newUser.email,
                    role: "customer",
                    cart: [],
                    orders: []
                });

                setUser(newUser);
                closeForm();
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError("Please enter your email to reset your password.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent. Check your inbox.");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="backdrop-blur-lg bg-white/20 p-8 rounded-lg w-80 shadow-xl border border-white/30 relative">
                <button className="absolute top-4 right-4 text-white text-xl" onClick={closeForm}>✕</button>
                
                <h2 className="text-2xl font-semibold mb-4 text-white text-center">
                    {isLogin ? 'Login' : 'Register'}
                </h2>
                
                {error ? (<p className=" text-red-500 text-center">{error}</p>):(<p className="text-green-500 text-center">{message}</p>) }
                

                <form onSubmit={handleAuth}>
                    <div className="mb-4">
                        <label className="block text-white">Email</label>
                        <div className="flex gap-2 items-center p-2 border border-white/50 rounded-md bg-transparent text-white">
                            <User size={25}/>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full focus:outline-none" 
                                placeholder="Enter email" 
                                required 
                            />
                        </div>
                        
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-white">Password</label>
                        <div className="flex gap-2 items-center p-2 border border-white/50 rounded-md bg-transparent text-white">
                            <Lock size={25}/>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full  focus:outline-none" 
                                placeholder="Enter password" 
                                required 
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)} 
                                className=" flex items-center justify-center text-white"
                            >
                                {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
                            </button>
                        </div>
                        
                        {isLogin && (
                            <div className="mt-2 text-end">
                                <button onClick={handleForgotPassword} className="text-yellow-300 hover:text-yellow-400">
                                    Forgot Password?
                                </button>
                            </div>
                        )}
                    </div>

                    {!isLogin && (
                        <div className="mb-4 relative">
                            <label className="block text-white">Confirm Password</label>
                            <div className="flex gap-2 items-center p-2 border border-white/50 rounded-md bg-transparent text-white">
                                <input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full  focus:outline-none" 
                                    placeholder="Confirm password" 
                                    required 
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                                    className="flex items-center justify-center text-white"
                                >
                                    {showConfirmPassword ? <EyeOff size={25} /> : <Eye size={25} />}
                                </button>

                            </div>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button 
                        onClick={() => setIsLogin(!isLogin)} 
                        className="text-blue-300 hover:text-blue-400"
                    >
                        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginRegisterForm;
