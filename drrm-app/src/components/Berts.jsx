import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import BertsQR from '../assets/BERTSqr.jpg';
import BertsImg from '../assets/berts-img.png';
import backgroundImage from '../assets/berts-bg.png';
import { ChevronsRight } from "lucide-react";

function Trainings(){
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return(
        <main>
            <section class="mt-20 mb-8 p-4">
                <div class="flex items-start font-semibold">
                    <Link
                        to="/"
                        className="flex items-center text-gray-500"
                    >
                        Home<ChevronsRight className="text-black mx-2" size={20}/>

                    </Link>
                    <p className="text-red-900">BERTST Training</p>
                </div>
            </section>

            <section id="berts-training" class="relative flex flex-col lg:flex-row min-h-screen justify-center items-start text-red-900 px-4 mb-8 gap-8">
                <div class="lg:w-3/4 p-3 rounded shadow-md sm:w-full"  style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <h2 class="text-[#04204a] font-extrabold">Basic Emergency Response Team Simulation Training (BERTST)</h2>
                    <p class="text-black text-justify leading-relaxed my-6">
                        The University of the Philippines Manila Disaster Risk Reduction and Management for Health Program's Basic Emergency response team simulation training aims to improve the skills on command, communication and collaboration.
                    </p>
                
                    <div class="flex flex-col lg:flex-row items-center mt-8 gap-8">
                        <img src={BertsImg} alt="BERTS Image" class=" w-80 rounded"/>
                        <div>
                            <h2 class="text-[#04204a] text-xl sm:text-3xl font-extrabold uppercase mb-4">What is Bertst?</h2>
                            <p class="text-black text-sm sm:text-lg text-justify leading-relaxed mb-6">
                                The Basic Emergency Response Team Simulation Training (BERTST) is a program by the University of the Philippines Manila Disaster Risk Reduction and Management for Health program. It is designed to enhance participants' skills in command, communication, and collaboration during emergency situations.
                            </p>
                            <h2 class="text-[#04204a] text-xl sm:text-3xl font-extrabold uppercase mb-4">What we do at BERTST training?</h2>
                            <ul class="text-black text-sm sm:text-lg leading-relaxed list-disc list-outside space-y-2 ml-6">
                                <li>Simulation Exercises: Hands-on emergency response drills.
                                </li>
                                <li>Command Training: Developing leadership in crisis situations.</li>
                                <li>Communication Drills: Improving coordination among responders.</li>
                                <li>Collaboration Workshops: Enhancing teamwork in disaster response.</li>
                            </ul>
                        </div>
                    </div>
                    </div>
                    <div class="p-6 bg-[#04204a] rounded shadow-md text-center w-full grid  grid-cols-1 gap-2 lg:w-1/3 sm:w-full">
                        <div className="flex flex-col items-center sm:col-span-1">
                            <p className="text-yellow-400 sm:text-xl font-bold">Training Fee:</p>
                            <p className="text-white sm:text-3xl mb-0">Php 5,500/Participant</p>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdh5Bx157shCh1S566Y5XyXip8OuCTiv2LFR5_yvGw8qaSfoA/viewform" 
                                target="_blank"
                                rel="noopener noreferrer"
                                class="mt-4 block sm:text-lg bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105 hover:bg-yellow-600">
                                JOIN NOW!
                            </a>
                            <div class="mt-3">
                                <p class="text-white mb-4">Or Scan the QR Code Below:</p>
                                <img src={BertsQR} class="w-20 sm:w-40 mx-auto" alt="QR Code"/>
                            </div>
                        </div>  
                
                        <div class="row-span-2 sm:col-span-1">
                            <p class="text-yellow-400 sm:text-lg font-bold">Training Dates:</p>
                            <ol class="grid grid-cols-2 gap-4 mt-4 text-white text-sm sm:text-lg">
                                <li class="border border-white p-2 rounded-full text-center">June 16-19</li>
                                <li class="border border-white p-2 rounded-full text-center">June 30-July 3</li>
                                <li class="border border-white p-2 rounded-full text-center">July 14-17</li>
                                <li class="border border-white p-2 rounded-full text-center">July 18-31</li>
                                <li class="border border-white p-2 rounded-full text-center">August 4-5</li>
                                <li class="border border-white p-2 rounded-full text-center">August 11-14</li>
                                <li class="border border-white p-2 rounded-full text-center">September 8-11</li>
                                <li class="border border-white p-2 rounded-full text-center">September 22-25</li>
                                <li class="border border-white p-2 rounded-full text-center">October 6-9</li>
                                <li class="border border-white p-2 rounded-full text-center">October 20-23</li>
                                <li class="border border-white p-2 rounded-full text-center">November 3-6</li>
                                <li class="border border-white p-2 rounded-full text-center">November 17-20</li>
                            </ol>
                        </div>
                    </div>
            </section>
        </main>
    );
};

export default Trainings;



