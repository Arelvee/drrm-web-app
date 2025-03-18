import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Slide1 from '../assets/slide-image (1).jpg';
import Slide2 from '../assets/slide-image (2).jpg';
import Slide3 from '../assets/slide-image (3).jpg';
import Slide4 from '../assets/slide-image (4).jpg';
import News1 from '../assets/news (1).png';
import News2 from '../assets/news (2).png';
import News3 from '../assets/news (3).png';
import News4 from '../assets/news (4).png';
import TrainingImage1 from '../assets/training (1).jpg';
import TrainingImage2 from '../assets/training (2).jpg';
import backgroundImage from '../assets/background.png';
import historyImage from '../assets/history.jpg';

const slides = [Slide1, Slide2, Slide3, Slide4];
const newsItems = [
    {
      id: 1,
      title: "HOPE: Strengthening Hospital Preparedness for Emergencies",
      date: "January 00, 2025",
      image: News1,
      content: "This is the detailed content for HOPE program...",
    },
    {
      id: 2,
      title: "Basic Emergency Response Team Simulation Training (BERTST)",
      date: "January 00, 2025",
      image: News2,
      content: "This training helps emergency teams prepare...",
    },
    {
      id: 3,
      title: "Mass Casualty Incident (MCI) and Triage Training",
      date: "January 00, 2025",
      image: News3,
      content: "Mass casualty response training for healthcare professionals...",
    },
  ];

function Body(){
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Auto-slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Function to switch slides when clicking dots
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };
    return(
        <>
        <main className="bg-gray-150 mt-18">
            <section className="relative min-h-screen flex flex-col justify-center items-center text-center text-white bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="absolute inset-0 !bg-black/50"></div>
                <div className="relative z-10 px-0 md:px-6 text-center">
                    <p className="mb-4 text-sm md:text-3xl tracking-wide text-white">Welcome to</p>
                    <h1 className="text-xl font-extrabold uppercase md:text-5xl text-white">
                        Disaster Risk Reduction and Management <br /> in Health Program
                    </h1>
                    <p className="mt-4 mx-5 text-sm md:text-xl md:mx-20 text-white">
                        The UPM DRRM-H Program aims to provide virtual disaster training programs to prevent mistakes in actual 
                        catastrophic situations using state-of-the-art disaster simulation training technologies.
                    </p>
                    <p className="mb-4 md:mt-10 text-sm md:text-xl tracking-wide text-white">
                        TRAININGS | RESEARCH | CONSULTANCY
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="recent-section">
                        <h2 className="text-3xl font-semibold text-center text-red-900 uppercase">RECENT UPDATES</h2>
                        <div className="relative w-full max-w-[600px] mx-auto overflow-hidden mt-6">
                            <div
                                id="carousel"
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {slides.map((slide, index) => (
                                <img key={index} src={slide} alt={`Slide ${index + 1}`} className="w-full object-cover rounded-lg flex-shrink-0" style={{ minWidth: "100%" }} />
                                ))}
                            </div>
                        </div>


                        {/* Dots for manual navigation */}
                        <div id="dots" className="flex justify-center mt-4 space-x-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    className={`h-3 w-3 rounded-full ${currentIndex === index ? "bg-red-900" : "bg-gray-300"}`}
                                    onClick={() => goToSlide(index)}
                                ></button>
                            ))}
                        </div>
                    </div>
                    <div className="news-section">
                        <h2 className="text-3xl font-semibold text-center text-red-900 mb-4 uppercase">
                            What's News?
                        </h2>
                        <div className="grid grid-cols-1 gap-2 mb-4">
                            {newsItems.map((news) => (
                            <Link
                                key={news.id}
                                to={`/news/${news.id}`}
                                state={{ news }}
                                className="block sm:flex bg-white rounded-2xl shadow-lg p-4 gap-6 relative"
                            >
                                <img
                                src={news.image}
                                alt={news.title}
                                className="h-40 w-full object-cover rounded-md"
                                />
                                <div className="block sm:flex sm:flex-col justify-between">
                                <h1 className="text-xl my-2 sm:my-0 sm:text-xl font-semibold leading-relaxed hover:text-red-900">
                                    {news.title}
                                </h1>
                                <p className="flex gap-2 mt-2 text-gray-600 sm:absolute sm:bottom-6 sm:right-8">
                                    {news.date}
                                </p>
                                </div>
                            </Link>
                            ))}
                        </div>
                        <div className="text-center mt-6">
                            <Link to="/news" className="bg-red-900 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-700">
                                Read All News
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="about" className="relative flex flex-col justify-center p-4 text-center text-white min-h-screen bg-cover bg-center md:items-start md:p-10 lg:pl-40" 
            style={{ backgroundImage: `url(${historyImage})` }}>
                <div className="relative z-10 px-6 max-w-3xl bg-white/20 rounded-2xl backdrop-blur-lg shadow-lg p-10 border border-white/30">
                    <h2 className="text-3xl font-extrabold uppercase text-red-900">HISTORY</h2>
                    <p className="mt-4 text-sm text-justify text-black font-medium leading-relaxed sm:text-lg">
                        The University of the Philippines Manila Disaster Risk Reduction and Management in Health (UPM DRRM-H) Center was officially launched on 8 June 2022 to conduct state-of-the-art disaster simulation trainings and evidence-based research. Established to provide virtual disaster training programs, the center aims to prevent mistakes in actual catastrophic situations by utilizing advanced simulation technologies. Located on the 2nd floor of Joaquin Gonzales Hall in UPM, it also serves as a hub for research. 
                    </p>
                    <p className="mt-4 text-sm text-justify text-black font-medium leading-relaxed sm:text-lg">
                        Dr. Carlos Primero Gundran, UPM DRRM-H Center Head, highlighted its significance: "The Philippines is one of the most disaster-prone countries in the world. Through the Center, we seek to conduct training and seminars that will prepare our responders, even ordinary employees, in disaster preparedness through our state-of-the-art facilities. We can finally hold disaster preparedness training virtually, and mistakes could be prevented in actual situations.
                    </p>
                </div>

            </section>
            <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 text-center text-white bg-cover bg-center p-10">
                <div className="relative z-10 px-0 md:px-8">
                    <h1 className="text-3xl text-red-900 font-extrabold uppercase">Vision</h1>
                    <p className="mt-4 text-sm text-justify leading-relaxed sm:text-lg text-black">
                    The UP Manila Disaster Risk Reduction and Management in Health Center aims to serve as the center of excellence in academia for DRRM-H related issues.
                    </p>
                </div>
                <div className="relative z-10 px-0 md:px-8">
                    <h1 className="text-3xl text-red-900 font-extrabold uppercase">Mission</h1>
                    <p className="mt-4 text-sm text-justify  leading-relaxed sm:text-lg text-black">
                        The UP Manila Disaster Risk Reduction and Management in Health Center is composed of health sciences experts from the University of the Philippines Manila, collaborating to improve DRRM-H in the country by establishing institutional linkages with multiple stakeholders, documenting and publishing relevant information on DRRM-H, and creating plans, programs, and capacity-building activities to address DRRM-H related issues.
                    </p>
                </div>
            </section>
            
            {/* Trainings Section */}
            <sections id="trainings" className="relative grid grid-cols-1 md:grid-cols-2 gap-8 text-center text-white bg-cover bg-center p-8">
                <div className="col-span-full">
                    <h1 className="text-3xl text-red-900 uppercase">What We Offer?</h1>
                </div>
                
                <div className="relative z-10 px-6 bg-white rounded-2xl shadow-lg p-8">
                    <img src={TrainingImage1} alt="Broken Image" className="w-full rounded-lg mb-4"/>
                    <p className="text-black text-lg font-medium">Training Program</p>
                    <h2 className="text-black  text-lg md:text-3xl font-extrabold uppercase mt-2">Basic Emergency Response Team Simulation Training (BERTST)</h2>
                    <Link 
                        to="/training1" 
                        className="mt-4 block text-lg bg-red-900 text-white font-semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105 hover:bg-red-700"
                    >
                        Read and Join Us!
                    </Link>
                </div>
                <div className="relative z-10 px-6 bg-white rounded-2xl shadow-lg p-8">
                    <img src={TrainingImage2} alt="Broken Image" className="w-full rounded-lg mb-4"/>
                    <p className="text-black text-lg font-medium">Training Program</p>
                    <h2 className="text-black text-lg md:text-3xl font-extrabold uppercase mt-2">Mass Casualty Incident (MCI) and Triage Training</h2>
                    <Link 
                        to="/training2" 
                        className="mt-4 block text-lg bg-blue-900 text-white font-semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105 hover:bg-blue-700"
                    >
                        Read and Join Us!
                    </Link>
                </div>
            </sections>

            {/* Contact And Review Section */}
            <section
                id="contact"
                className="bg-cover bg-center py-20 px-6 text-white"
                style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                <div className="container mx-auto relative flex flex-col md:flex-row max-w-5xl lg:max-w-6xl px-6 md:px-10 py-12 bg-black/50 backdrop-blur-lg rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.5)] items-start gap-8">
                    
                    {/* Review Section */}
                    <div className="review-section flex-1 z-10 w-full">
                    <h2 className="text-xl md:text-3xl uppercase mb-6 font-semibold border-b-2 border-white inline-block">
                        REVIEW
                    </h2>

                    {/* Review Box 1 */}
                    <div className="review-box bg-white/20 p-6 rounded-lg relative mb-6 shadow-lg backdrop-blur-lg ">
                        <p className="quote text-7xl absolute -top-4 left-4 text-white opacity-30 font-serif">“</p>
                        <div className="review-content relative z-10">
                        <h3 className="text-lg md:text-xl font-bold">
                            Yael Amari <span className="text-yellow-500">★★★★★</span>
                        </h3>
                        <p className="role text-sm opacity-80">Founder & CEO</p>
                        <p className="review-text text-sm mt-4 italic">
                            "A very good website for developing small companies..."
                        </p>
                        </div>
                    </div>

                    {/* Review Box 2 */}
                    <div className="review-box bg-white/20 p-6 rounded-lg relative mb-6 shadow-lg backdrop-blur-lg">
                        <p className="quote text-7xl absolute -top-4 left-4 text-white opacity-30 font-serif">“</p>
                        <div className="review-content relative z-10">
                        <h3 className="text-lg md:text-xl font-bold">
                            Chidi Eze <span className="text-yellow-500">★★★★★</span>
                        </h3>
                        <p className="role text-sm opacity-80">Founder & CEO</p>
                        <p className="review-text text-sm mt-4 italic">
                            "The explanation is very clear and very helpful..."
                        </p>
                        </div>
                    </div>
                    </div>

                    {/* Contact Section */}
                    <div className="contact-section flex-1 z-10 w-full">
                    <h2 className="text-xl md:text-3xl uppercase mb-6 font-semibold border-b-2 border-white inline-block">
                        CONTACT US
                    </h2>
                    <form className="flex flex-col w-full">
                        <input
                        type="text"
                        placeholder="NAME"
                        required
                        className="w-full bg-transparent border border-white text-white p-3 mb-4 rounded-md focus:ring-2 focus:ring-yellow-500"
                        />
                        <input
                        type="email"
                        placeholder="EMAIL"
                        required
                        className="w-full bg-transparent border border-white text-white p-3 mb-4 rounded-md focus:ring-2 focus:ring-yellow-500"
                        />
                        <input
                        type="text"
                        placeholder="COMPANY"
                        required
                        className="w-full bg-transparent border border-white text-white p-3 mb-4 rounded-md focus:ring-2 focus:ring-yellow-500"
                        />
                        <textarea
                        placeholder="MESSAGE"
                        required
                        className="w-full bg-transparent border border-white text-white p-3 mb-4 rounded-md focus:ring-2 focus:ring-yellow-500"
                        ></textarea>
                        <button
                        type="submit"
                        className="w-full bg-white text-black py-3 px-6 font-bold rounded-md hover:bg-yellow-500 transition"
                        >
                        SUBMIT
                        </button>
                    </form>
                    </div>
                </div>
                </section>

    </main>
    </>
    );
    
}

export default Body;