import React, { useEffect } from 'react';
import Header from '../components/Header';
import CareersBG from "../assets/careers-redbg.png";
import InternshipImg from "../assets/careers-internship.jpg";
import JobOpportunitiesImg from "../assets/career-jobopportunities.jpg";
import { Check } from 'lucide-react';

const careerData = [
  {
    type: "Internships",
    image: InternshipImg,
    bgColor: "#06441f",
    accepting: true,
    description: [
      "Information Systems, Information Technology, Computer Science, or any related courses",
      "Sociology, Political Science, or any related courses",
      "Marketing Management, Communication, or any related courses"
    ],
    requirements: [
      "Curriculum Vitae or Resume",
      "Project portfolio, if available"
    ]
  },
  {
    type: "Job Opportunities",
    image: JobOpportunitiesImg,
    bgColor: "#7a0000",
    accepting: false,
    description: [],
    requirements: []
  }
];

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section
        className="w-full min-h-[60vh] bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-16"
        style={{ backgroundImage: `url(${CareersBG})` }}
      >
        <div className="bg-white/20 backdrop-blur-xl p-6 md:p-10 rounded-xl shadow-2xl max-w-4xl mx-auto text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold">Career Openings</h1>
          <p className="mt-4 text-sm md:text-base">
            Join the UP Manila DRRM-H Program as we seek motivated individuals from various fields to support our dynamic, technology-driven disaster preparedness initiatives. This is an exciting opportunity to contribute to national resilience through virtual reality, research, community engagement, and systems development.
          </p>
        </div>
      </section>

      {/* Career Cards Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {careerData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col h-full"
            >
              <div className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-red-900 mb-4 text-center">{item.type}</h2>
                
                <div className="w-full h-48 sm:h-64 md:h-80 mb-6 mx-auto overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.type}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Positions/Courses Section */}
                <div className="mt-4 w-full text-left">
                  <p className="font-bold text-xs text-gray-800 mb-2">
                    {item.type === "Internship"
                      ? "Open for the following positions" 
                      : "Open for the following courses"}
                  </p>
                  <hr className="border-t border-gray-300 mb-4" />
                  <ul className="space-y-3">
                    {item.description.length > 0 ? (
                      item.description.map((desc, idx) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <div className="pt-1">
                            <Check className="text-red-800 w-4 h-4" />
                          </div>
                          <p className="font-medium text-sm text-red-900 leading-snug">
                            {desc}
                          </p>
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-gray-500 italic">
                        {item.type === "Job Opportunities" 
                          ? "No open positions at this time" 
                          : "No specific course requirements at this time"}
                      </li>
                    )}
                  </ul>
                </div>

                {/* Requirements Section */}
                <div className="mt-6 w-full text-left">
                  <p className="font-bold text-xs text-gray-800 mb-2">Requirements</p>
                  <hr className="border-t border-gray-300 mb-4" />
                  <ul className="space-y-3">
                    {item.requirements.length > 0 ? (
                      item.requirements.map((req, idx) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <div className="pt-1">
                            <Check className="text-red-800 w-4 h-4" />
                          </div>
                          <p className="font-medium text-sm text-red-900 leading-snug">
                            {req}
                          </p>
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-gray-500 italic">No specific requirements at this time</li>
                    )}
                  </ul>
                </div>
              </div>

              <div
                className="text-white rounded-b-lg px-4 py-3 mt-auto text-center"
                style={{ backgroundColor: item.bgColor }}
              >
                {item.accepting ? "We are accepting interns!" : "No career openings as of the moment."}
              </div>
            </div>
          ))}
        </div>

        {/* Application Section */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-7xl mx-auto mt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 md:p-10">
            <div className="w-full md:w-1/2">
              <h2 className="text-xl md:text-2xl font-bold text-red-900 text-center md:text-left">
                Think you got what it takes to join our team?
              </h2>
            </div>

            <div className="w-full md:w-1/2">
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-700 mb-4">
                  Send your CV or resume to: upm-drrmh-list@up.edu.ph<br />
                  email subject: [Internship Application] Last Name
                </p>
                <p className="text-sm text-gray-700">
                  For inquiries, message us through our official{' '}
                  <a
                    href="https://www.facebook.com/UPSimulationCenter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Facebook page
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;