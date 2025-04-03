import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Slide1 from '../assets/slide-image (1).jpg';
import Slide2 from '../assets/slide-image (2).jpg';
import Slide3 from '../assets/slide-image (3).jpg';
import News1 from '../assets/news (1).png';
import News2 from '../assets/news (2).png';
import News3 from '../assets/news (3).png';
import TrainingImage1 from '../assets/training (1).jpg';
import TrainingImage2 from '../assets/training (2).jpg';
import backgroundImage from '../assets/background.png';
import historyImage from '../assets/history.jpg';


const slides = [Slide1, Slide2, Slide3];
const newsItems = [
    {
      id: 1,
          title: "HOPE: Strengthening Hospital Preparedness for Emergencies",
          date: "January 00, 2025",
          image: News1,
          purpose:"The main purpose of the HOPE course is to enhance hospital based preparedness in Asia. In order to accomplish this aim, the HOPE course will bring medical and administrative leaders in hospital based disaster management together to discuss the principles of disaster management and work together to make practical steps toward preparing each participants home institution to respond to disasters and mass casualty incidents.",
          objective:"The objectives of the HOPE course are based on instructional objectives and performance objectives, as outlined below:",
          instructionalObj: "At the end of the course, the participant should be able to:Describe the relationship between hospitals and disasters.Apply a method of judging the effects of different hazards on the functional and operational components of a hospital.Simulate a mass casualty incident addressing the roles and responsibilities of each component of HICS. Discuss the basic requirements in the medical aspects of managing mass casualties. Apply concepts learned in on-site medical care to specific situations. Prepare an outline of a hospital disaster preparedness plan.",
          perfObj: "By the end of the course, depending on the disaster scenario, the participants will be able to: Conduct a vulnerability assessment of the hospital Develop a hospital disaster plan Manage a disaster response",
          category:"Health",
    },
    {
      id: 2,
          title: "Basic Emergency Response Team Simulation Training (BERTST)",
          date: "January 00, 2025",
          image: News2,
          content: "This training helps emergency teams prepare...",
          category: "Training",
    },
    {
      id: 3,
          title: "Mass Casualty Incident (MCI) and Triage Training",
          date: "January 00, 2025",
          image: News3,
          content: "",
          ctitle: "Mass Casualty Incident (MCI) and Triage Training Course",
          target: "This manual on Mass Casualty Incident (MCI) and Triage Training will be used by the  health professionals who may or may not have background on triaging and disaster management, and emergency responders assigned in triaging casualties during  disaster situations for prompt medical  management",
          desc: "Basic concepts and knowledge on triage during mass casualty incidents which will provide the trainees with better understanding on their recommended triaging skills and patient management emphasizing on the application of different triaging algorithms and systems during disaster situations using multidisciplinary approach. ",
          prereq: "Any background on professional medical courses and/or specialized training on first aid and the like ",
          duration: "Three days (8:00 AM to 5:00 PM)",
          genPurpose: "This module was designed to provide trainees with concepts and purpose of triage during mass  casualty incidents, including the utilization of various triage system algorithms available using case scenario based simulation. Ultimately, this is also to prepare the trainees to be a competent triage  officer with advanced knowledge, skills, and attitude in applying disaster triage systems for correct  assignment of victims to appropriate triage categories, regardless of age, gender, socio-economic  status, nationality, cultural affiliation, or religious belief.",
          learnOutcome: "Upon completion of this training course, the trainees should be able to: 1. State the purpose of triage algorithms during mass casualty incidents;  2. Differentiate the different triage algorithms and its respective triage categories;  3. Apply the use of appropriate triage algorithms in assigning victims correctly in triage  categories; and  4. Practice a multidisciplinary approach in the management of patient conditions.",
          cContent: "The course contents of this training module were selected based on the set objectives of the training and the participants prior knowledge on triaging during mass casualty incidents and their varying  competence level. This was also organized in a manner that the participants can determine the  chronological sequence of concepts in triaging, from the history and development of triage, including  its purpose during mass casualty incidents to the integration of different triage algorithms and  systems.",
          dAte: "March 21, 2025",
          category: "Emergency",
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    {/* RECENT UPDATES */}
                    <div className="recent-section flex flex-col justify-between h-full flex-grow">
                        <h2 className="text-3xl font-bold text-center uppercase text-red-900 tracking-wide mb-4">
                            RECENT UPDATES
                        </h2>
                        <div className="relative w-full mx-auto overflow-hidden  flex-grow">
                            <div
                                id="carousel"
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {slides.map((slide, index) => (
                                    <img
                                        key={index}
                                        src={slide}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-[700px] object-cover rounded-lg flex-shrink-0"
                                        style={{ minWidth: "100%" }}
                                    />
                                ))}
                            </div>
                        </div>



                        {/* Dots for manual navigation */}
                        <div id="dots" className="flex justify-center  space-x-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    className={`h-3 w-3 rounded-full ${currentIndex === index ? "bg-red-900" : "bg-gray-300"}`}
                                    onClick={() => goToSlide(index)}
                                ></button>
                            ))}
                        </div>
                    </div>


                    {/* WHAT'S NEW */}
                    <div className="news-section flex flex-col h-full flex-grow">
                        <h2 className="text-3xl font-bold text-center uppercase text-red-900 tracking-wide mb-4">
                            What's New?
                        </h2>
                        <div className="grid grid-rows-3 gap-4 flex-grow">
                            {newsItems.map((news) => (
                                <Link
                                    key={news.id}
                                    to={`/news/${news.id}`}
                                    state={{ news }}
                                    className="flex bg-white rounded-2xl shadow-lg p-4 gap-6 relative"
                                >
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="h-[190px] w-[300px] object-cover rounded-md"
                                    />
                                    <div className="flex flex-col justify-between flex-grow">
                                        <h1 className="text-xl font-semibold leading-relaxed hover:text-red-900">
                                            {news.title}
                                        </h1>
                                        <p className="text-gray-600 text-sm">{news.date}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>


                        {/* Read All News Button - Fully Aligned */}
                        <div className="mt-6 flex justify-center items-center">
                            <Link
                                to="/news"
                                className="bg-red-900 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition duration-300"
                            >
                                Read All News
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* History Section */}
            <section id="about"
             className="relative flex flex-col justify-center items-center text-center min-h-screen bg-cover bg-center p-8 md:p-16"
             style={{ backgroundImage: `url(${historyImage})` }}
                >
                <div className="relative z-10 max-w-4xl bg-white/20 backdrop-blur-xl p-10 md:p-14 rounded-3xl shadow-2xl border border-white/30">
                <h2 className="text-5xl font-extrabold uppercase text-red-900 tracking-widest mb-6 drop-shadow-lg">
                HISTORY
                </h2>
                <p className="text-lg sm:text-xl text-black leading-relaxed text-justify font-light">
                The University of the Philippines Manila Disaster Risk Reduction and Management in Health (UPM DRRM-H) Center was officially launched on 8 June 2022 to conduct state-of-the-art disaster simulation trainings and evidence-based research. Established to provide virtual disaster training programs, the center aims to prevent mistakes in actual catastrophic situations by utilizing advanced simulation technologies. Located on the 2nd floor of Joaquin Gonzales Hall in UPM, it also serves as a hub for research.
                </p>
                <p className="mt-6 text-lg sm:text-xl text-black leading-relaxed text-justify font-light">
                Dr. Carlos Primero Gundran, UPM DRRM-H Center Head, highlighted its significance: "The Philippines is one of the most disaster-prone countries in the world. Through the Center, we seek to conduct training and seminars that will prepare our responders, even ordinary employees, in disaster preparedness through our state-of-the-art facilities. We can finally hold disaster preparedness training virtually, and mistakes could be prevented in actual situations."
                </p>
            </div>
            </section>


            {/* Vision & Mission Section */}
            <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 text-center bg-white py-12 px-6 md:px-16">
            {/* Vision */}
            <div className="bg-gray-100 p-8 md:p-12 rounded-2xl shadow-lg border border-gray-300">
                <h2 className="text-4xl font-extrabold uppercase text-red-900 tracking-wide mb-4">
                VISION
                </h2>
                <p className="text-md sm:text-lg text-gray-800 leading-relaxed text-justify">
                The UP Manila Disaster Risk Reduction and Management in Health Center aims to serve
                as the center of excellence in academia for DRRM-H related issues.
                </p>
            </div>


            {/* Mission */}
            <div className="bg-gray-100 p-8 md:p-12 rounded-2xl shadow-lg border border-gray-300">
                <h2 className="text-4xl font-extrabold uppercase text-red-900 tracking-wide mb-4">
                MISSION
                </h2>
                <p className="text-md sm:text-lg text-gray-800 leading-relaxed text-justify">
                The UP Manila Disaster Risk Reduction and Management in Health Center is composed
                of health sciences experts from the University of the Philippines Manila, collaborating
                to improve DRRM-H in the country by establishing institutional linkages with multiple
                stakeholders, documenting and publishing relevant information on DRRM-H, and creating
                plans, programs, and capacity-building activities to address DRRM-H related issues.
                </p>
            </div>
            </section>              


           
            {/* Trainings Section */}
            <sections id="trainings" className="relative grid grid-cols-1 md:grid-cols-2 gap-8 text-center text-white bg-cover bg-center p-8">
                <div className="col-span-full">
                    <h2 className="text-3xl font-extrabold uppercase text-red-900 tracking-wide mb-4">What We Offer?</h2>
                </div>
               
                <div className="relative z-10 px-6 bg-white rounded-2xl shadow-lg p-8">
                    <img src={TrainingImage1} alt="Broken Image" className="w-full rounded-lg mb-4"/>
                    <p className="text-gray-600 text-lg font-medium ">Training Program</p>
                    <h2 className="text-black  text-lg font-extrabold uppercase mt-2">Basic Emergency Response Team Simulation Training (BERTST)</h2>
                    <Link
                        to="/training1"
                        className="mt-4 block text-lg bg-red-900 text-white font-semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105 hover:bg-red-700"
                    >
                        Read and Join Us!
                    </Link>
                </div>
                <div className="relative z-10 px-6 bg-white rounded-2xl shadow-lg p-8">
                    <img src={TrainingImage2} alt="Broken Image" className="w-full rounded-lg mb-4"/>
                    <p className="text-gray-600 text-lg font-medium ">Training Program</p>
                    <h2 className="text-black text-lg font-extrabold uppercase mt-2">Mass Casualty Incident (MCI) and Triage Training</h2>
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
                        JOENEL TAGALOG <span className="text-yellow-500">★★★★★</span>
                        </h3>
                        <p className="role text-sm opacity-80">Registered Nurse</p>
                        <p className="review-text text-sm mt-4 italic text-justify">
                            "As a Disaster Nursing instructor in the College of Nursing, the MCI and Triage Training was a valuable experience that deepened my understanding of emergency response. The hands-on simulations provided practical skills that I can share with my students. The training made triage systems easy to grasp, enhancing my ability to teach disaster preparedness effectively. I recommend this program to fellow educators and healthcare professionals who want to strengthen their emergency response skills."
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



