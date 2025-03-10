import React, { useState, useRef, useEffect } from 'react';
import LectureIcon1 from '../assets/lecture-icon (1).png';
import LectureIcon2 from '../assets/lecture-icon (2).png';
import LectureIcon3 from '../assets/lecture-icon (3).png';
import LectureIcon4 from '../assets/lecture-icon (4).png';
import DemoVideo from '../assets/video/demo.mp4';

function ELearning() {
    const [selectedLecture, setSelectedLecture] = useState(null);
    const [progress, setProgress] = useState(0);
    const [quizUnlocked, setQuizUnlocked] = useState(false);
    const videoRef = useRef(null);

    const lectures = [
        { id: 1, title: "Lecture #1: Introduction to DRRM for Health", video: DemoVideo, icon: LectureIcon1, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit..." },
        { id: 2, title: "Lecture #2: Hazards and Disaster Risk Assessment", video: DemoVideo, icon: LectureIcon2, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit..." },
        { id: 3, title: "Lecture #3: First Aid and Basic Life Support", video: DemoVideo, icon: LectureIcon3, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit..." },
        { id: 4, title: "Lecture #4: Preparedness for Emergencies", video: DemoVideo, icon: LectureIcon4, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel saepe nemo necessitatibus omnis, facere quo dolores perspiciatis a labore officia explicabo dolorum delectus eos quod quidem debitis voluptatum! Illo omnis necessitatibus magnam rerum nemo natus nesciunt nulla nostrum accusamus, mollitia officia beatae quia vel. Voluptatibus, fugiat odit alias amet eveniet exercitationem ipsa molestiae iure laudantium facilis repudiandae asperiores at totam suscipit magnam quis, non expedita sint voluptas vero molestias quia ipsum. Sapiente totam eligendi incidunt a labore debitis dicta itaque omnis adipisci, ex magnam, voluptates, dolorem quaerat necessitatibus porro cum inventore! Illum at est ratione mollitia minima non cupiditate repellendus debitis alias. Architecto maiores rem perferendis praesentium nam ipsum illo ullam accusamus impedit veritatis et vitae nihil obcaecati veniam, porro deleniti illum a dignissimos ex molestiae quisquam! Tenetur amet incidunt porro ipsam ad nostrum repellat placeat ex velit temporibus, quidem, illum vitae praesentium quasi odit quae alias accusantium tempore!" },
    ];

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(percentage);

            // Unlock quiz when video is fully watched
            if (percentage >= 100) {
                setQuizUnlocked(true);
            }
        }
    };

    return (
        <main className="bg-gray-200 mt-18 pb-8">
            <section className="relative flex flex-col items-center justify-center w-full text-red-900 px-6 lg:px-8 gap-4 pt-8">
                <div className="p-4 bg-white rounded-lg shadow-md w-full">
                    <div className="text-center mb-4 lg:mb-6">
                        <h1 className="text-red-900 text-xl lg:text-2xl mb-2">E-Learning</h1>
                        <p className="text-red-900 text-4xl lg:text-5xl font-bold">Lectures</p>
                    </div>
                    {!selectedLecture ? (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center p-4 lg:p-6">
                            {lectures.map((lecture) => (
                                <button
                                    key={lecture.id}
                                    onClick={() => {
                                        setSelectedLecture(lecture);
                                        setProgress(0); 
                                        setQuizUnlocked(false);
                                    }}
                                    className="lecture-link flex flex-col justify-center items-center z-10 bg-red-900 rounded-lg shadow-lg p-4 lg:p-5 gap-3 transform transition-transform hover:-translate-y-2 hover:shadow-[0_0_15px_3px_rgba(255,0,0,0.5)]"
                                >
                                    <img src={lecture.icon} alt="Lecture Icon" className="w-24 lg:w-32 h-auto rounded-lg" />
                                    <p className="text-white text-md lg:text-lg font-semibold">{lecture.title}</p>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full mt-2 lg:mt-4 relative">
                            <div className="flex items-center justify-between w-full relative mb-4">
                                <p className="text-black text-xl lg:text-2xl font-medium">
                                    {selectedLecture.title} 
                                </p>
                                <button 
                                    onClick={() => setSelectedLecture(null)}
                                    className="text-gray-800 text-4xl lg:text-5xl font-bold p-2 focus:outline-none"
                                >
                                    &times;
                                </button>
                            </div>

                            <div className="flex flex-col lg:flex-row lg:items-start  px-2">
                                {/* Video & Progress Bar */}
                                <div className="lg:w-1/2 flex flex-col items-center">
                                    <video 
                                        ref={videoRef}
                                        className="w-full max-w-3xl h-64 lg:h-[350px] rounded-md" 
                                        controls
                                        onTimeUpdate={handleTimeUpdate}
                                    >
                                        <source src={selectedLecture.video} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>

                                    {/* Animated Progress Bar */}
                                    <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden mt-2 relative">
                                        <div 
                                            className="bg-red-600 h-full transition-all duration-500 ease-in-out" 
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                                {/* Description Panel with Fixed Quiz Button */}
                                <div className="lg:w-1/2 mt-4 lg:mt-0 lg:pl-6 h-[350px] rounded-lg p-2 bg-white  flex flex-col justify-between">
                                    <div className="overflow-y-auto flex-grow p-2 custom-scrollbar">
                                        <h4 className="text-black font-semibold mb-2">Description</h4>
                                        <p className="text-black leading-relaxed text-justify">{selectedLecture.description}</p>
                                    </div>

                                    {/* Take Quiz Button - Stays Fixed Below */}
                                    <div className="p-2">
                                        <button 
                                            className={`w-full px-6 py-2 font-bold text-lg rounded-lg transition duration-300 ${
                                                quizUnlocked ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                            }`}
                                            disabled={!quizUnlocked}
                                            onClick={() => alert('Redirecting to Quiz!')}
                                        >
                                            Take Quiz
                                        </button>
                                    </div>
                                </div>


                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

export default ELearning;
