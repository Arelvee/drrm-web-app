import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import MCIQR from '../assets/MCIqr.jpg';
import MCIImg from '../assets/MCI-img.png';
import backgroundImage from '../assets/mci-bg.png';
import { ChevronsRight } from "lucide-react";


function Training2(){
    useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
    return(
        <main>
        <section class="mt-20 mb-8 p-4">
            <div class="flex items-start text-black font-semibold">
                <Link
                    to="/"
                    className="flex items-center text-gray-500"
                >
                   Home<ChevronsRight className="text-black mx-2" size={20}/>
                </Link>
                <p className="text-red-900">MCI Training</p>
            </div>
        </section>

        <section id="mci-training" class="relative flex flex-col lg:flex-row min-h-screen justify-center items-start text-blue-900 px-4 mb-8 gap-8">
            <div class="lg:w-3/4 p-3 rounded shadow-md sm:w-full"  style={{ backgroundImage: `url(${backgroundImage})` }}>
                <h2 class="text-[#06441f] text-3xl sm:text-5xl font-extrabold">Mass Casualty Incident and Triage (MCI)</h2>
                <p class="text-black text-sm sm:text-lg text-justify leading-relaxed my-6">
                This training program aims to familiarize participants with the concepts and different triage system algorithms through simulation exercises. The objective is to equip the participants with advanced knowledge, skills, and attitude in applying disaster triage systems correctly to assign victims to appropriate triage categories.
                </p>
            
                <div class="flex flex-col lg:flex-row items-center mt-8 gap-8">
                    <img src={MCIImg} alt="BERTS Image" class=" w-80 rounded"/>
                    <div>
                    <h2 class="text-[#06441f] text-xl sm:text-3xl font-extrabold uppercase mb-4">What is MCI?</h2>
                    <p class="text-black text-sm sm:text-lg text-justify leading-relaxed mb-6">
                    MCI stands for Mass Casualty Incident, which refers to any emergency situation where the number of victims exceeds the available medical resources, requiring an organized and efficient response to prioritize care.
                    </p>
                    <h2 class="text-[#06441f] text-xl sm:text-3xl font-extrabold uppercase mb-4">What we do at MCI training?</h2>
                    <ul class="text-black text-sm sm:text-lg leading-relaxed list-disc list-outside space-y-2 ml-6">
                        <li>Understanding MCI and Triage Concepts</li>
                        <li>Learning Triage Systems and Algorithms</li>
                        <li>Practical Hands-On Training</li>
                        <li>Case-Scenario Simulations</li>
                        <li>Team-Based Exercises</li>
                        <li>Decision-Making and Critical Thinking</li>
                    </ul>
                    </div>
                </div>
                </div>
                <div class="p-6 bg-[#06441f] rounded shadow-md text-center grid  grid-cols-1 gap-2 lg:w-1/3 w-full">
                    <div class="flex flex-col items-center sm:col-span-1">
                        <p class="text-yellow-400 sm:text-xl font-bold">Training Fee:</p>
                        
                        <p className="text-white">PHP 5,500 
                            <span className="mx-2">(Early Registration)</span>
                        </p>
                        <p className="text-white">PHP 6,000
                            <span className="mx-2">(Regular Registration)</span>
                        </p>
                        <p className="text-white">PHP 6,500
                            <span className="mx-2">(Late Registration)</span>
                        </p>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfeSXyPo0XvruCV7-5Ei32lPkmoPSua15XX8VF19lLjAKImlw/viewform" 
                            target="_blank"
                            rel="noopener noreferrer"   
                            class="mt-4 block sm:text-lg bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105 hover:bg-yellow-600">
                            JOIN NOW!
                        </a>
                        <div class="mt-3">
                            <p class="text-white mb-4">Or Scan the QR Code Below:</p>
                            <img src={MCIQR} class="w-20 sm:w-40 mx-auto" alt="QR Code"/>
                        </div>
                    </div>  
            
                    <div class="row-span-2 sm:col-span-1">
                        <p class="text-yellow-400 sm:text-lg font-bold">Training Dates:</p>
                        <ol class="grid grid-cols-2 gap-4 mt-4 text-white text-sm sm:text-lg">
                            <li class="border border-white p-2 rounded-full text-center">June 25-27</li>
                            <li class="border border-white p-2 rounded-full text-center">August 6-8</li>
                            <li class="border border-white p-2 rounded-full text-center">August 26-28</li>
                            <li class="border border-white p-2 rounded-full text-center">September 3-5</li>
                            <li class="border border-white p-2 rounded-full text-center">September 17-19</li>
                            <li class="border border-white p-2 rounded-full text-center">October 1-3</li>
                            <li class="border border-white p-2 rounded-full text-center">October 15-17</li>
                            <li class="border border-white p-2 rounded-full text-center">October 29-31</li>
                            <li class="border border-white p-2 rounded-full text-center">November 12-14</li>
                            <li class="border border-white p-2 rounded-full text-center">November 26-28</li>
                            <li class="border border-white p-2 rounded-full text-center col-span-2 w-full max-w-[435.2px] justify-self-center">December 3-5</li>
                        </ol>
                    </div>
                </div>
                
            </section>
    </main>
    );
};




export default Training2;