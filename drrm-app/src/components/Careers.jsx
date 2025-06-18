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

      <section
        className="w-full h-[60vh] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${CareersBG})` }}
      >
        <div className="bg-white/20 backdrop-blur-xl p-6 md:p-10 rounded-xl shadow-2xl max-w-4xl mx-4 text-center text-white">
          <h1 className="font-bold">Career Openings</h1>
          <p className="mt-2">
            Join the UP Manila DRRM-H Program as we seek motivated individuals from various fields to support our dynamic, technology-driven disaster preparedness initiatives. This is an exciting opportunity to contribute to national resilience through virtual reality, research, community engagement, and systems development.
          </p>
        </div>
      </section>

      <section className="p-8 bg-gray-100">
        <div className="w-full max-w-8xl mx-auto flex flex-col md:flex-row gap-6 justify-center items-start">
          {careerData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-xl p-8 m-4 text-center w-full max-w-3xl flex-1 h-full"
            >
              <h2 className="text-2xl font-bold text-red-900 mb-4">{item.type}</h2>
              <div className="w-[700px] h-[300px] mb-10 mx-auto overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.type}
                  className="w-full h-full object-cover"
                />
              </div>

              {item.description.length > 0 && (
                <>
                  <div className="mt-6 w-full text-left">
                    <p className="font-bold text-xs text-gray-800 mb-2">Open for the following courses</p>
                    <hr className="border-t border-gray-300 mb-4" />
                    <ul className="space-y-3">
                      {item.description.map((desc, idx) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <div className="pt-1">
                            <Check className="text-red-800 w-4 h-4" />
                          </div>
                          <p className="font-medium text-sm text-red-900 leading-snug">
                            {desc}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 w-full text-left">
                    <p className="font-bold text-xs text-gray-800 mb-2">Requirements</p>
                    <hr className="border-t border-gray-300 mb-4" />
                    <ul className="space-y-3">
                      {item.requirements.map((req, idx) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <div className="pt-1">
                            <Check className="text-red-800 w-4 h-4" />
                          </div>
                          <p className="font-medium text-sm text-red-900 leading-snug">
                            {req}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              <div
                className="text-white rounded-lg mt-9 px-4 py-2 inline-block w-full"
                style={{ backgroundColor: item.bgColor }}
              >
                {item.accepting ? "We are accepting interns!" : "No career openings as of the moment."}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 m-4 w-full max-w-7xl mx-auto mt-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 py-10">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold text-red-900 mb-4 text-center px-4">
                Think you got what it takes to join our team?
              </h2>
            </div>

            <div className="w-full md:w-1/2 px-4">
              <p className="text-xs text-gray-700 mb-6 text-center">
                Send your CV or resume to: upm-drrmh-list@up.edu.ph<br />
                email subject: [Internship Application] Last Name
              </p>
              <p className="text-xs text-gray-700 text-center">
                For inquiries, message us through our official{' '}
                <a
                  href="https://www.facebook.com/UPSimulationCenter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Facebook page
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;
