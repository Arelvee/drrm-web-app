import React from "react";
import { Link } from 'react-router-dom';
import MCIQR from '../assets/mci-qr.png';
import MCIImg from '../assets/MCI-img.png';
import backgroundImage from '../assets/mci-bg.png';



function Training2(){
    return(
        <main>
        <section class="mt-20">
            <div class="flex items-start text-black font-semibold px-10 py-4">
                <Link
                    to="/"
                    className="flex items-center"
                >
                    Home <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-right mx-2"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
                </Link>
                <p className="text-red-900">MCI Training</p>
            </div>
        </section>

        <section id="mci-training" class="relative flex flex-col lg:flex-row min-h-screen justify-center items-start text-blue-900 text-white px-8 mb-8 lg:px-8 gap-8">
            <div class="lg:w-3/4 p-6 bg-white rounded shadow-md sm:w-full"  style={{ backgroundImage: `url(${backgroundImage})` }}>
                <h1 class="text-blue-900 text-3xl sm:text-5xl font-extrabold">Mass Casualty Incident and Triage (MCI)</h1>
                <p class="text-black text-sm sm:text-lg text-justify leading-relaxed my-6">
                This training program aims to familiarize participants with the concepts and different triage system algorithms through simulation exercises. The objective is to equip the participants with advanced knowledge, skills, and attitude in applying disaster triage systems correctly to assign victims to appropriate triage categories.
                </p>
            
                <div class="flex flex-col lg:flex-row items-center mt-8 gap-8">
                    <img src={MCIImg} alt="BERTS Image" class=" w-80 rounded"/>
                    <div>
                    <h2 class="text-blue-900 text-xl sm:text-3xl font-extrabold uppercase mb-4">What is MCI?</h2>
                    <p class="text-black text-sm sm:text-lg text-justify leading-relaxed mb-6">
                    MCI stands for Mass Casualty Incident, which refers to any emergency situation where the number of victims exceeds the available medical resources, requiring an organized and efficient response to prioritize care.
                    </p>
                    <h2 class="text-blue-900 text-xl sm:text-3xl font-extrabold uppercase mb-4">What we do at MCI training?</h2>
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
                <div class="p-6 bg-blue-900 rounded shadow-md text-center grid  grid-cols-2 lg:grid-cols-1 gap-2 lg:w-1/3 w-full">
                    <div class="flex flex-col items-center sm:col-span-1">
                        <p class="text-yellow-400 sm:text-xl font-bold">Training Fee:</p>
                        <p class="text-white sm:text-3xl mb-2">Php 5,500/Participant</p>
                        <p className="text-white">PHP 5,500 
                            <span className="mx-2">(Early Registration)</span>
                        </p>
                        <p className="text-white">PHP 6,000
                            <span className="mx-2">(On-site Registration)</span>
                        </p>
                        <p className="text-white">PHP 6,500
                            <span className="mx-2">(Late Registration)</span>
                        </p>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdh5Bx157shCh1S566Y5XyXip8OuCTiv2LFR5_yvGw8qaSfoA/viewform" 
                            class="mt-4 block sm:text-lg bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105 hover:bg-yellow-600">
                            JOIN NOW!
                        </a>
                        <div class="mt-6">
                            <p class="text-white mb-4">Or Scan the QR Code Below:</p>
                            <img src={MCIQR} class="w-20 sm:w-40 mx-auto" alt="QR Code"/>
                        </div>
                    </div>  
            
                    <div class="row-span-2 sm:col-span-1">
                        <p class="text-yellow-400 sm:text-lg font-bold">Training Dates:</p>
                        <ol class="grid grid-cols-2 gap-4 mt-4 text-white text-sm sm:text-lg">
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




export default Training2;