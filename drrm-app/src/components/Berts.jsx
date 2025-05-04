import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import BertsQR from '../assets/berts-qr.png';
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
                    <h2 class="text-red-900 font-extrabold">Basic Emergency Response Team Simulation Training (BERTST)</h2>
                    <p class="text-black text-justify leading-relaxed my-6">
                        The University of the Philippines Manila Disaster Risk Reduction and Management for Health Program's Basic Emergency response team simulation training aims to improve the skilss on command, communication and collaboration.
                    </p>
                
                    <div class="flex flex-col lg:flex-row items-center mt-8 gap-8">
                        <img src={BertsImg} alt="BERTS Image" class=" w-80 rounded"/>
                        <div>
                            <h2 class="text-red-900 text-xl sm:text-3xl font-extrabold uppercase mb-4">What is Bertst?</h2>
                            <p class="text-black text-sm sm:text-lg text-justify leading-relaxed mb-6">
                                The Basic Emergency Response Team Simulation Training (BERTST) is a program by the University of the Philippines Manila Disaster Risk Reduction and Management for Health program. It is designed to enhance participants' skills in command, communication, and collaboration during emergency situations.
                            </p>
                            <h2 class="text-red-900 text-xl sm:text-3xl font-extrabold uppercase mb-4">What we do at BERTST training?</h2>
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
                    <div class="p-6 bg-red-900 rounded shadow-md text-center w-full grid  grid-cols-1 gap-2 lg:w-1/3 sm:w-full">
                        <div className="flex flex-col items-center sm:col-span-1">
                            <p className="text-yellow-400 sm:text-xl font-bold">Training Fee:</p>
                            <p className="text-white sm:text-3xl mb-4">Php 5,500/Participant</p>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdh5Bx157shCh1S566Y5XyXip8OuCTiv2LFR5_yvGw8qaSfoA/viewform" 
                                class="mt-4 block sm:text-lg bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105 hover:bg-yellow-600">
                                JOIN NOW!
                            </a>
                            <div class="mt-6">
                                <p class="text-white mb-4">Or Scan the QR Code Below:</p>
                                <img src={BertsQR} class="w-20 sm:w-40 mx-auto" alt="QR Code"/>
                            </div>
                        </div>  
                
                        <div class="row-span-2 sm:col-span-1">
                            <p class="text-yellow-400 sm:text-lg font-bold">Training Dates:</p>
                            <ol class="grid grid-cols-2 gap-4 mt-4 text-white text-sm sm:text-lg">
                                <li class="border border-white p-2 rounded-full text-center">January 13-14</li>
                                <li class="border border-white p-2 rounded-full text-center">February 3-4</li>
                                <li class="border border-white p-2 rounded-full text-center">February 17-18</li>
                                <li class="border border-white p-2 rounded-full text-center">March 3-4</li>
                                <li class="border border-white p-2 rounded-full text-center">March 17-18</li>
                                <li class="border border-white p-2 rounded-full text-center">April 21-22</li>
                                <li class="border border-white p-2 rounded-full text-center">May 5-6</li>
                                <li class="border border-white p-2 rounded-full text-center">May 19-20</li>
                                <li class="border border-white p-2 rounded-full text-center">June 2-3</li>
                                <li class="border border-white p-2 rounded-full text-center">June 23-24</li>
                            </ol>
                        </div>
                    </div>
            </section>
        </main>
    );
};

export default Trainings;



