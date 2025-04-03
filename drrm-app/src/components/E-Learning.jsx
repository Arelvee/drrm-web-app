import React, { useState } from "react";
import LectureIcon1 from "../assets/lecture-icon (1).png";
import LectureIcon2 from "../assets/lecture-icon (2).png";
import LectureIcon3 from "../assets/lecture-icon (3).png";
import LectureIcon4 from "../assets/lecture-icon (4).png";

function ELearning() {
    const [completedLectures, setCompletedLectures] = useState([]);
    const [selectedLecture, setSelectedLecture] = useState(null);
    const [watching, setWatching] = useState(false);
    const [quizUnlocked, setQuizUnlocked] = useState({});

    const youtubeVideo = "https://www.youtube.com/embed/ijFKVcLt6uI";
    const quizLink = "https://forms.gle/9rF68RJwdH6pqNkBA";

    const modules = [
        {
            id: 1,
            title: "MODULE 1: Basic Emergency Response Training (BERST)",
            lectures: [
                { id: 1, title: "Introduction to BERST", video: youtubeVideo, icon: LectureIcon1, description: "Introduction to BERST." },
                { id: 2, title: "Hazards and Risk Assessment", video: youtubeVideo, icon: LectureIcon2, description: "Understanding hazards and risks." },
                { id: 3, title: "First Aid & Life Support", video: youtubeVideo, icon: LectureIcon3, description: "Learning first aid basics." },
                { id: 4, title: "Emergency Preparedness", video: youtubeVideo, icon: LectureIcon4, description: "Being prepared for emergencies." },
            ],
        },
        {
            id: 2,
            title: "MODULE 2: Mass Casualty Incident (MCI) and Triage Training",
            lectures: [
                { id: 5, title: "Introduction to MCI", video: youtubeVideo, icon: LectureIcon1, description: "Intro to MCI." },
                { id: 6, title: "Hazards and Risk Assessment", video: youtubeVideo, icon: LectureIcon2, description: "Understanding risks." },
                { id: 7, title: "First Aid & Life Support", video: youtubeVideo, icon: LectureIcon3, description: "First Aid basics." },
                { id: 8, title: "Emergency Preparedness", video: youtubeVideo, icon: LectureIcon4, description: "Emergency Preparedness." },
            ],
        },
    ];
    const handleLectureClick = (lecture, module) => {
        const isUnlocked = lecture.id === module.lectures[0].id || completedLectures.includes(lecture.id - 1);
        if (isUnlocked) {
            setSelectedLecture(lecture);
            setWatching(true);
        } else {
            alert("You must complete the previous lecture first.");
        }
    };
    

    const completeLecture = () => {
        if (selectedLecture && !completedLectures.includes(selectedLecture.id)) {
            setCompletedLectures([...completedLectures, selectedLecture.id]);
            setQuizUnlocked((prev) => ({ ...prev, [selectedLecture.id]: true }));
        }
    };

    return (
        <main className="bg-gray-200 mt-18 pb-8">
            <section className="relative flex flex-col items-center w-full text-red-900 px-6 lg:px-8 gap-4 pt-8">
                <div className="p-10 bg-white rounded-lg shadow-md w-full">
                    <div className="text-center mb-6">
                        <h1 className="text-red-900 text-xl lg:text-2xl mb-2">E-Learning</h1>
                        <p className="text-red-900 text-4xl lg:text-5xl font-bold">Modules</p>
                    </div>

                    {!selectedLecture ? (
                        modules.map((module) => (
                            <div key={module.id} className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">{module.title}</h2>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center w-full">
                                    {module.lectures.map((lecture) => {
                                        const isUnlocked = lecture.id === module.lectures[0].id ||completedLectures.includes(lecture.id - 1);
                                        return (
                                            <button
    key={lecture.id}
    onClick={() => handleLectureClick(lecture, module)}
    className={`${
        isUnlocked ? "bg-red-900" : "bg-gray-400 cursor-not-allowed"
    } text-white font-semibold rounded-lg shadow-lg p-4 lg:p-5 transform transition-transform hover:-translate-y-2 flex flex-col items-center justify-center`}
    disabled={!isUnlocked}
>
    <div className="flex items-center justify-center w-full">
        <img src={lecture.icon} alt="Lecture Icon" className="w-24 lg:w-32 h-auto" />
    </div>
    <p className="text-md lg:text-lg mt-2">{lecture.title}</p>
</button>

);
                                    })}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col lg:flex-row lg:items-start px-2">
                            <div className="lg:w-1/2 flex flex-col items-center">
                                <iframe
                                    className="w-full max-w-3xl h-64 lg:h-[350px] rounded-md"
                                    src={selectedLecture.video}
                                    title={selectedLecture.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    onLoad={() => setTimeout(completeLecture, 5000)}
                                ></iframe>
                            </div>
                            <div className="lg:w-1/2 mt-4 lg:mt-0 lg:pl-6 h-[350px] rounded-lg p-2 bg-white flex flex-col justify-between">
                                <div className="overflow-y-auto flex-grow p-2">
                                    <h4 className="text-black font-semibold mb-2">Description</h4>
                                    <p className="text-black leading-relaxed text-justify">{selectedLecture.description}</p>
                                </div>
                                <div className="p-2">
                                    <a
                                        href={quizUnlocked[selectedLecture.id] ? quizLink : "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full px-6 py-2 font-bold text-lg rounded-lg transition duration-300 text-center block ${
                                            quizUnlocked[selectedLecture.id] ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                        }`}
                                    >
                                        Take Quiz
                                    </a>
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