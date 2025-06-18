import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Calendar } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; 
import Slide1 from '../assets/slide-image (1).jpg';
import Slide2 from '../assets/slide-image (2).jpg';
import Slide3 from '../assets/slide-image (3).jpg';
import News1 from '../assets/news (1).png';
import News2 from '../assets/news (2).png';
import News3 from '../assets/news (3).png';
import Vision from '../assets/Vision.png';
import Target from '../assets/Target.png';
import Values from '../assets/Values.png';
import BERSTImage from '../assets/BERSTImage.jpg';
import SFATBLSImage from '../assets/SFATBLSImage.png';
import MCIImage from '../assets/mci.jpg';
import backgroundImage from '../assets/background.png';
import historyImage from '../assets/history.jpg';


const slides = [Slide1, Slide2, Slide3];
// const newsItems = [
//     {
//       id: 1,
//           title: "HOPE: Strengthening Hospital Preparedness for Emergencies",
//           date: "January 00, 2025",
//           image: News1,
//           purpose:"The main purpose of the HOPE course is to enhance hospital based preparedness in Asia. In order to accomplish this aim, the HOPE course will bring medical and administrative leaders in hospital based disaster management together to discuss the principles of disaster management and work together to make practical steps toward preparing each participants home institution to respond to disasters and mass casualty incidents.",
//           objective:"The objectives of the HOPE course are based on instructional objectives and performance objectives, as outlined below:",
//           instructionalObj: "At the end of the course, the participant should be able to:Describe the relationship between hospitals and disasters.Apply a method of judging the effects of different hazards on the functional and operational components of a hospital.Simulate a mass casualty incident addressing the roles and responsibilities of each component of HICS. Discuss the basic requirements in the medical aspects of managing mass casualties. Apply concepts learned in on-site medical care to specific situations. Prepare an outline of a hospital disaster preparedness plan.",
//           perfObj: "By the end of the course, depending on the disaster scenario, the participants will be able to: Conduct a vulnerability assessment of the hospital Develop a hospital disaster plan Manage a disaster response",
//           category:"Health",
//     },
//     {
//       id: 2,
//           title: "Basic Emergency Response Team Simulation Training (BERTST)",
//           date: "January 00, 2025",
//           image: News2,
//           content: "This training helps emergency teams prepare...",
//           category: "Training",
//     },
//     {
//       id: 3,
//           title: "Mass Casualty Incident (MCI) and Triage Training",
//           date: "January 00, 2025",
//           image: News3,
//           content: "",
//           ctitle: "Mass Casualty Incident (MCI) and Triage Training Course",
//           target: "This manual on Mass Casualty Incident (MCI) and Triage Training will be used by the  health professionals who may or may not have background on triaging and disaster management, and emergency responders assigned in triaging casualties during  disaster situations for prompt medical  management",
//           desc: "Basic concepts and knowledge on triage during mass casualty incidents which will provide the trainees with better understanding on their recommended triaging skills and patient management emphasizing on the application of different triaging algorithms and systems during disaster situations using multidisciplinary approach. ",
//           prereq: "Any background on professional medical courses and/or specialized training on first aid and the like ",
//           duration: "Three days (8:00 AM to 5:00 PM)",
//           genPurpose: "This module was designed to provide trainees with concepts and purpose of triage during mass  casualty incidents, including the utilization of various triage system algorithms available using case scenario based simulation. Ultimately, this is also to prepare the trainees to be a competent triage  officer with advanced knowledge, skills, and attitude in applying disaster triage systems for correct  assignment of victims to appropriate triage categories, regardless of age, gender, socio-economic  status, nationality, cultural affiliation, or religious belief.",
//           learnOutcome: "Upon completion of this training course, the trainees should be able to: 1. State the purpose of triage algorithms during mass casualty incidents;  2. Differentiate the different triage algorithms and its respective triage categories;  3. Apply the use of appropriate triage algorithms in assigning victims correctly in triage  categories; and  4. Practice a multidisciplinary approach in the management of patient conditions.",
//           cContent: "The course contents of this training module were selected based on the set objectives of the training and the participants prior knowledge on triaging during mass casualty incidents and their varying  competence level. This was also organized in a manner that the participants can determine the  chronological sequence of concepts in triaging, from the history and development of triage, including  its purpose during mass casualty incidents to the integration of different triage algorithms and  systems.",
//           dAte: "March 21, 2025",
//           category: "Emergency",
//     },
//   ];

function Body(){
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeSection, setActiveSection] = useState(() => {
        const isMobile = window.innerWidth < 1024;
        return isMobile ? null : 'ALL'; // Show all on desktop by default
      });
      const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
      const [newsData, setNewsData] = useState([]);
      const [reviews, setReviews] = useState([]);

      

      useEffect(() => {
  window.scrollTo(0, 0);

  const fetchNews = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "news"));
      const fetchedNews = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewsData(fetchedNews);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const snapshot = await getDocs(collection(db, "reviews"));
      const fetchedReviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(fetchedReviews.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  fetchNews();
  fetchReviews(); // ⬅️ Call it here

  const handleResize = () => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);
    setActiveSection(mobile ? null : 'ALL');
  };

  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

      

      const toggleSection = (key) => {
        if (!isMobile) return;
        setActiveSection((prev) => (prev === key ? null : key));
      };
      
   
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };
    return(
        <>
        <main id="home" className="bg-gray-150 mt-18">
            <section className="relative min-h-1/2 md:min-h-screen flex flex-col justify-center items-center text-center text-white bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="absolute inset-0 !bg-black/50"></div>
                <div className="relative z-10 px-4 md:px-25 text-center space-y-4  py-8 md:py-16">
                    <p>Welcome to</p>
                    <h1 className="font-extrabold uppercase">
                        Disaster Risk Reduction and Management <br /> in Health Program
                    </h1>
                    <p className="hidden sm:block">
                        The UPM DRRM-H Program aims to provide virtual disaster training programs to prevent mistakes in actual
                        catastrophic situations using state-of-the-art disaster simulation training technologies.
                    </p>
                    <p>
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
                        <div id="dots" className="flex justify-center  space-x-2 mt-6">
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
                    <h2 className="font-bold text-center uppercase text-red-900 tracking-wide mb-4">
                        What's New?
                    </h2>

                    <div className="grid grid-rows-3 gap-4 flex-grow">
                        {newsData
                        .sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate()) // Ensure newest first
                        .slice(0, 3) // Limit to 3 items
                        .map((news) => (
                            <Link
                            key={news.id}
                            to={`/news/${news.id}`}
                            state={{ news }}
                            className="block lg:flex bg-white rounded-2xl shadow-lg p-4 gap-6 relative"
                            >
                            <img
                                src={news.image}
                                alt={news.title}
                                className="h-[190px] w-[300px] object-cover rounded-md"
                            />
                            <div className="flex flex-col justify-between flex-grow">
                                <p className="font-semibold leading-relaxed hover:text-red-900">
                                {news.title}
                                </p>
                                <p className="text-gray-600 text-sm">
                                {news.createdAt?.toDate().toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                }) || "N/A"}
                                </p>
                            </div>
                            </Link>
                        ))}
                    </div>

                    {/* Read All News Button - Fully Aligned */}
                        <div className="mt-6 flex justify-center items-center">
                        <Link
                            to="/news"
                            className="bg-red-900 text-white py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition duration-300 w-[640px] text-center"
                        >
                            Read All News
                        </Link>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* History Section */}
            <section id="about"
             className="relative scroll-mt-16 flex flex-col justify-center items-center text-center min-h-screen bg-cover bg-center py-8 px-6 md:px-16"
             style={{ backgroundImage: `url(${historyImage})` }}
                >
                <div className="relative z-10 max-w-4xl bg-white/20 backdrop-blur-xl  p-6 md:p-10 rounded-xl shadow-2xl">
                    <h2 className="text-5xl font-extrabold uppercase text-red-900 tracking-widest mb-6 drop-shadow-lg">
                    HISTORY
                    </h2>
                    <p className="text-lg sm:text-xl text-black text-justify font-light">
                    The University of the Philippines Manila Disaster Risk Reduction and Management in Health (UPM DRRM-H) Center was officially launched on 8 June 2022 to conduct state-of-the-art disaster simulation trainings and evidence-based research. Established to provide virtual disaster training programs, the center aims to prevent mistakes in actual catastrophic situations by utilizing advanced simulation technologies. Located on the 2nd floor of Joaquin Gonzales Hall in UPM, it also serves as a hub for research.
                    </p>
                    <p className="mt-6 text-lg sm:text-xl text-black leading-relaxed text-justify font-light">
                    Dr. Carlos Primero Gundran, UPM DRRM-H Center Head, highlighted its significance: "The Philippines is one of the most disaster-prone countries in the world. Through the Center, we seek to conduct training and seminars that will prepare our responders, even ordinary employees, in disaster preparedness through our state-of-the-art facilities. We can finally hold disaster preparedness training virtually, and mistakes could be prevented in actual situations."
                    </p>
                </div>
            </section>

            {/* Vision & Mission Section */}
            <section className="relative grid gap-8 text-center  items-center justify-center bg-gray-50 py-8 px-4 md:px-16">
                {/* Vision */}
                <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg max-w-4xl">
                    <div className="flex items-center gap-5 justify-center  border-b pb-4 mb-4 border-zinc-300">
                        <img src={Vision} alt="Vision" className="h-10 lg:h-15 w-auto" />
                        <h2 className="text-4xl font-extrabold uppercase text-red-900 tracking-wide">
                            VISION
                        </h2>
                    </div>
                    
                    <p className="text-md sm:text-lg text-gray-800 leading-relaxed text-justify">
                    The academe's center for world class capacity building, research and public services in DRRM-H related issues in the Philippines by 2030.
                    </p>
                </div>

                {/* Mission */}
                <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg max-w-4xl">
                    <div className="flex items-center gap-5 justify-center  border-b pb-4 mb-4 border-zinc-300">
                        <img src={Target} alt="Target" className="h-15 lg:h-20 w-auto" />
                        <h2 className="text-4xl font-extrabold uppercase text-red-900 tracking-wide">
                            MISSION
                        </h2>
                    </div>
                    <p className="sm:text-sm text-gray-800 leading-relaxed text-justify py-2">
                        <strong className="text-2xl mr-1">UP</strong>lift the value and status level of the organization as the lead resource in disaster risk reduction and management in health. 
                    </p>
                    <p className="text-md sm:text-lg text-gray-800 leading-relaxed text-justify py-2">
                        <strong className="text-2xl mr-1">D</strong>evelop individual’s competence in disaster risk reduction and management in health to minimize disaster related injuries, disabilities, diseases, and deaths through capacity building programs, research, and public service. 
                    </p>
                    <p className="text-md sm:text-lg text-gray-800 leading-relaxed text-justify py-2">
                        <strong className="text-2xl mr-1">R</strong>evitalize institutional linkages with multiple stakeholders enabling enhanced collaborationg among healthcare providers, community leaders, private institutions, and the academe.
                    </p>
                    <p className="text-md sm:text-lg text-gray-800 leading-relaxed text-justify py-2">
                        <strong className="text-2xl mr-1">R</strong>einforce research agendas to gather evidence based data. create policies, programs, and publications to contribute knowledge and build capacity towards health resilient communities during disaster.
                    </p>
                    <p className="text-md sm:text-lg text-gray-800 leading-relaxed text-justify py-2">
                        <strong className="text-2xl mr-1">M</strong>otivate internal stakeholders towards professional and personal upliftment while managing scarce resources to achieve  sustainability.
                    </p>
                    <p className="text-md sm:text-lg text-gray-800 leading-relaxed text-justify py-2">
                        <strong className="text-2xl mr-1">H</strong>airness technological advancement to create world-class processes and    systems that would promote innovative programs and technical know news promoting quality of life and sustainability of the communities we serve.
                    </p>
                </div>
                
                {/* Core Values */}
                <div className="bg-white rounded-2xl shadow-lg px-6 py-8 md:px-10 md:py-10 max-w-4xl">
                    <div className="grid grid-cols-2 items-center">
                        {/* Left Section */}
                        <div className="flex flex-col items-center justify-center gap-4 border-r border-gray-300 px-10">
                            <img src={Values} alt="Values Icon" className="h-20 w-auto" />
                            <h2 className="text-xl md:text-2xl font-extrabold uppercase text-red-900 text-center">
                                Core Values
                            </h2>
                        </div>
                        {/* Right Section */}
                        <div className="mx-auto pl-4 sm:pl-0 text-justify ">
                            <p><strong className="text-2xl mr-1">H</strong>onor</p>
                            <p><strong className="text-2xl mr-1">E</strong>xcellence</p>
                            <p><strong className="text-2xl mr-1">A</strong>ccountability</p>
                            <p><strong className="text-2xl mr-1">L</strong>eadership</p>
                            <p><strong className="text-2xl mr-1">T</strong>ransformation</p>
                            <p><strong className="text-2xl mr-1">H</strong>armony</p>
                        </div>
                    </div>
                </div>
            </section>       

            {/*DRRM-H BRIDGE-2030 */}
            {/* <section className="grid gap-4 text-white text-center bg-gray-50 py-8 px-4 md:px-16">
                <p className="font-extrabold uppercase tracking-wide drop-shadow-lg p-2 bg-fuchsia-950 ">
                    DRRM-H BRIDGE 2030
                </p>
                <div className="gap-2 grid text-white lg:flex">
                    <p
                        className="text-2xl rounded-md bg-black p-4 cursor-pointer"
                        onClick={() => toggleSection('B')}
                    >
                        <span className="text-3xl font-bold mr-1">B</span>ASIC MANDATE OF EDUCATION, RESEARCH AND PUBLIC SERVICES
                    </p>
                    {(activeSection === 'B' || activeSection === 'ALL') && (
                        <div className="grid-cols-1 grid lg:grid-cols-8 gap-2">
                            <div className="bg-black/30 text-black p-2 rounded flex items-center justify-center text-center">100% PASSING ON TRAINING PROGRAMS</div>
                            <div className="bg-black/30 text-black p-2 rounded flex items-center justify-center text-center">Launch Basic and Advance MCI</div>
                            <div className="bg-black/30 text-black p-2 rounded flex items-center justify-center text-center">12 Trainings for both MCI and BERTs</div>
                            <div className="bg-black/30 text-black p-2 rounded flex items-center justify-center text-center">Promote results in at least 3 exhibits</div>
                            <div className="bg-black/30 text-black p-2 rounded flex items-center justify-center text-center">3 Research proposal/year</div>
                            <div className="bg-black/30 text-black p-2 rounded flex items-center justify-center text-center">At least 2 ongoing research projects/year</div>
                            <div className="bg-black/30 text-black p-2 rounded flex items-center justify-center text-center">Disseminate at least 1 research result annually</div>
                            <div className="bg-black/30 text-black p-2 rounded flex items-center justify-center text-center">Promote DRRCCA research agenda in at least 1 webinar</div>
                        </div>
                    )}
                </div>

                <div className="gap-2 grid text-white lg:flex ">
                    <p className="text-2xl rounded-md font-bold bg-fuchsia-950 p-4 cursor-pointer items-center justify-center text-center" onClick={() => toggleSection('R')}
                    ><span className="text-3xl">R</span>ESOURCES HUMAN INCLUDING INFRATRUCTURE AND EQUIPMENT</p>
                    {(activeSection === 'R' || activeSection === 'ALL') && (
                        <div className="grid-cols-1 grid lg:grid-cols-6 gap-2">
                            <div className="bg-fuchsia-950/30 text-black p-2 rounded flex items-center justify-center text-center">20 Fulltime FACULTY 100% MASTER's/PHDS</div>
                            <div className="bg-fuchsia-950/30 text-black p-2 rounded flex items-center justify-center text-center">100% ACCESS TO HEALTH SERVICES</div>
                            <div className="bg-fuchsia-950/30 text-black p-2 rounded flex items-center justify-center text-center">VS FEEDBACK FROM FACULTY AND STAFF</div>
                            <div className="bg-fuchsia-950/30 text-black p-2 rounded flex items-center justify-center text-center">ANNUAL PERFOMANCE FEEDBACK</div>
                            <div className="bg-fuchsia-950/30 text-black p-2 rounded flex items-center justify-center text-center lg:col-span-2">100% procurement and management suplplies and equipment</div>
                            <div className="bg-fuchsia-950/30 text-black p-2 rounded flex items-center justify-center text-center lg:col-span-3">Provide each staff with at least 1 local DRMMH related training every year</div>
                            <div className="bg-fuchsia-950/30 text-black p-2 rounded lg:col-span-3">Provide each staff with at least 1 international DRMMH related training every three years</div>
                        </div>
                    )}
                </div>
                <div className="gap-2 grid text-white lg:flex">
                    <p className="text-2xl rounded-md font-bold bg-pink-800 p-4 cursor-pointer items-center justify-center text-center " onClick={() => toggleSection('I')}
                    ><strong className="text-3xl">I</strong>NSTITUTIONAL QUALITY MANAGEMENT</p>
                    {(activeSection === 'I' || activeSection === 'ALL') && (
                        <div className="grid-cols-1 grid lg:grid-cols-8 gap-2">
                            <div className="bg-pink-800/30 text-black p-2 rounded flex items-center justify-center text-center">
                            Institutionalize UP MDRRM-H Center under CPH</div>
                            <div className="bg-pink-800/30 text-black p-2 rounded flex items-center justify-center text-center">Review and Revise training programs</div>
                            <div className="bg-pink-800/30 text-black p-2 rounded flex items-center justify-center text-center">100% Satisfactory rating for every training</div>
                            <div className="bg-pink-800/30 text-black p-2 rounded flex items-center justify-center text-center ">Propose at least 1 health policy</div>
                            <div className="bg-pink-800/30 text-black p-2 rounded flex items-center justify-center text-center ">Adapt, upgrade and implement DRRMH related innovations</div>
                            <div className="bg-pink-800/30 text-black p-2 rounded flex items-center justify-center text-center ">2 News trainings in 5 years for Community base health workers</div>
                            <div className="bg-pink-800/30 text-black p-2 rounded flex items-center justify-center text-center ">100% conduct Faculty evaluation after every training</div>
                            <div className="bg-pink-800/30 text-black p-2 rounded flex items-center justify-center text-center ">60 graduates per year</div>
                        </div>
                    )}
                </div>
                <div className="gap-2 grid text-white lg:flex ">
                    <p
                        className="text-2xl rounded-md font-bold bg-blue-950 p-4 cursor-pointer w-full lg:w-2/6"
                        onClick={() => toggleSection('D')}

                    >
                        <strong className="text-3xl">D</strong>IVERSITY AND CO-CREATION OF ENABLING ENVIRONMENT
                    </p>
                    {(activeSection === 'D' || activeSection === 'ALL') && (
                        <div className="grid grid-cols-1 gap-2 w-full lg:w-4/6">
                            <div className="bg-blue-200 text-black p-3 rounded shadow flex items-center justify-center text-center ">
                                100% access to personnel support mechanisms as prescribed by the department and as needed
                            </div>
                        </div>
                    )}
                </div>
                <div className="gap-2 grid text-white lg:flex">
                    <p className="text-2xl rounded-md font-bold bg-green-800 p-4 cursor-pointer w-full lg:w-1/6"
                        onClick={() => toggleSection('G')}><strong className="text-3xl">G</strong>OVERNANCE AND LEADERSHIP</p>
                    {(activeSection === 'G' || activeSection === 'ALL') && (
                        <div className="grid-cols-1 grid lg:grid-cols-3 gap-2">
                            <div className="bg-green-800/30 text-black p-3 rounded shadow flex items-center justify-center text-center">
                                Faculty peer evaluation is administered regulary at the end of each term
                            </div>
                            <div className="bg-green-800/30 text-black p-3 rounded shadow flex items-center justify-center text-center">
                                Update the department faculty and staff of the financial status of the department regulary
                            </div>
                            <div className="bg-green-800/30 text-black p-3 rounded shadow flex items-center justify-center text-center">
                                Revenues of &lt; 7.5M <br /> Expense = Budget 5.5M
                            </div>
                        </div>
                    )}
                </div>
                <div className="gap-2 grid text-white lg:flex">
                    <p className="text-2xl rounded-md font-bold bg-zinc-600 p-4 cursor-pointer w-full lg:w-1/6"
                        onClick={() => toggleSection('E')}><strong className="text-3xl">E</strong>NGAGEMENT AND COLLABORATION WITH STUDENTS, ALUMNI AND PARTNERS
                    </p>
                    {(activeSection === 'E' || activeSection === 'ALL') && (
                        <div className="grid-cols-1 grid lg:grid-cols-5 gap-2">
                            <div className="bg-zinc-600/30 text-black p-3 rounded shadow flex items-center justify-center text-center">
                                Trainees and alumni information data base and monitoring sheet
                            </div>
                            <div className="bg-zinc-600/30 text-black p-3 rounded shadow flex items-center justify-center text-center">
                                Completed or existing MOA, MOU with at least 5 targeted institutions/partners
                            </div>
                            <div className="bg-zinc-600/30 text-black p-3 rounded shadow flex items-center justify-center text-center">
                                Conduct 1 training workshop or benchmarking                            
                            </div>
                            <div className="bg-zinc-600/30 text-black p-3 rounded shadow flex items-center justify-center text-center">
                                At least public service or community engagement annually                            
                            </div>
                            <div className="bg-zinc-600/30 text-black p-3 rounded shadow flex items-center justify-center text-center">
                                Participate as attendee or as organizer in at least 6 meetings with stakeholders                            
                            </div>
                        </div>
                    )}
                </div>
            </section> */}
           


            {/* Trainings Section */}
            <sections
            id="trainings"
            className="relative scroll-mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-gray-50 text-white bg-cover bg-center py-8 px-4 md:px-16"
            >
                <div className="col-span-full">
                    <h1 className="font-extrabold uppercase text-red-900 tracking-wide">What We Offer?</h1>
                </div>

                <div className="relative z-10 p-4 bg-white rounded-2xl shadow-lg flex flex-col max-w-xl w-full mx-auto text-center">
                    <img src={BERSTImage} alt="Broken Image" className="w-full rounded-lg mb-4" />
                    <p className="text-black font-extrabold uppercase mb-0">
                        Basic Emergency Response Team Simulation Training (BERTST)
                    </p>
                    <p className="text-gray-600 text-lg font-medium mb-2.5">Training Program</p>
                    <Link
                        to="/training1"
                        className="mt-0 bg-[#04204a] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#02162f]"
                    >
                        Read and Join Us!
                    </Link>
                </div>

                <div className="relative z-10 p-4 bg-white rounded-2xl shadow-lg flex flex-col max-w-xl w-full mx-auto text-center">
                    <img src={MCIImage} alt="Broken Image" className="w-full rounded-lg mb-4" />
                    <p className="text-black font-extrabold uppercase mb-0">
                        Mass Casualty Incident (MCI) and Triage Training
                    </p>
                    <p className="text-gray-600 text-lg font-medium mb-2.5">Training Program</p>
                    <Link
                        to="/training2"
                        className="mt-0 bg-[#06441f] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#042e16]"
                    >
                        Read and Join Us!
                    </Link>
                </div>

                <div className="relative z-10 p-4 bg-white rounded-2xl shadow-lg flex flex-col max-w-xl w-full mx-auto text-center">
                    <img src={SFATBLSImage} alt="Broken Image" className="w-full rounded-lg mb-4" />
                    <p className="text-black font-extrabold uppercase mb-0">
                        Standard First Aid and Basic Life Support (SFATBLS)
                    </p>
                    <p className="text-gray-600 text-lg font-medium mb-2.5">Training Program</p>
                    <Link
                        to="/training3"
                        className="mt-0 bg-[#7a0000] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#3b0000]"
                    >
                        Read and Join Us!
                    </Link>
                </div>

            </sections>

          {/* Contact And Review Section */}
<section
  id="contact"
  className="scroll-mt-16 bg-cover bg-center py-20 px-4 text-white"
  style={{ backgroundImage: `url(${backgroundImage})` }}
>
  <div className="container mx-auto relative flex flex-col md:flex-row max-w-5xl lg:max-w-6xl px-6 md:px-10 py-12 bg-black/50 backdrop-blur-lg rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.5)] items-start gap-8">

    {/* Review Section */}
    <div className="review-section flex-1 z-10 w-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-xl md:text-3xl uppercase font-semibold inline border-b-2 border-white">
          REVIEW
        </h2>
      </div>

      {/* Scrollable review content only */}
      <div className="overflow-y-auto max-h-[500px] pr-2">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="review-box bg-white/20 p-4 sm:p-6 rounded-lg relative mb-6 shadow-lg backdrop-blur-lg w-[500px] max-w-full break-words"
            >
              <div className="review-content relative z-10">
                <h3 className="text-lg md:text-xl font-bold">
                  {review.name}{" "}
                  <span className="text-yellow-500">
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </span>
                </h3>
                <p className="role text-sm opacity-80">{review.profession}</p>
                <p className="review-text text-sm mt-4 italic break-words leading-relaxed text-left whitespace-pre-line">
                  {review.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white italic">No reviews yet.</p>
        )}
      </div>
    </div>

    {/* Contact Section */}
    <div className="contact-section flex-1 z-10 w-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-xl md:text-3xl uppercase font-semibold inline border-b-2 border-white">
          CONTACT US
        </h2>
      </div>

      {/* Scrollable form container */}
      <div className="overflow-y-auto max-h-[500px] pr-2">
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

  </div> 
</section> 


  </main>
        </>
      );
    }

export default Body;


