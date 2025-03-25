import React from "react";
import { useEffect } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import News1 from "../assets/news (1).png";
import News2 from "../assets/news (2).png";
import News3 from "../assets/news (3).png";


const events = [
  { id: 1, title: "Emergency First Aid", duration: "1 day", date: "APR 10", description: "Learn basic emergency response techniques." },
  { id: 2, title: "Occupational First Aid", duration: "2 days", date: "APR 15", description: "First aid for workplace emergencies." },
  { id: 3, title: "Standard First Aid", duration: "4 days", date: "APR 20", description: "Comprehensive first aid training." },
  { id: 4, title: "Medical Command", duration: "TBA", date: "TBA", description: "Leadership training for medical emergency response." },
];


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
    category: "Health",
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
    category: "Emergency",
  },
];


function NewsDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();


  const news = location.state?.news || newsItems.find((item) => item.id === Number(id));


  if (!news) {
    return <div className="text-center text-red-500">News not found!</div>;
  }


  const relatedNews = newsItems.filter((item) => item.id !== news.id);


  const handleCategoryClick = (category) => {
    navigate("/news", { state: { selectedCategory: category } });
  };


  return (
    <main>
      <section className="mt-20 mb-8 px-6 md:px-16">
        {/* Breadcrumbs */}
        <div className="flex items-center text-black font-semibold py-4 text-sm md:text-base">
          <Link to="/" className="flex items-center hover:text-red-900">Home</Link>
          <span className="mx-2 text-red-900 font-bold">&gt;&gt;</span>


          <Link to="/news" className="flex items-center hover:text-red-900">News</Link>
          <span className="mx-2 text-red-900 font-bold">&gt;&gt;</span>


          <p className="text-red-900">{news.title}</p>
        </div>


        {/* Main Layout */}
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row">
          {/* Left Side - Main News Content */}
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{news.title}</h1>
            <p className="text-gray-500 text-sm md:text-base mt-2">{news.date}</p>


            {/* News Image */}
            <div className="mt-4">
              <img src={news.image} alt={news.title} className="w-full rounded-lg object-cover shadow-md" />
            </div>


            {/* News Content */}
            <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-800 text-justify">{news.content}</p>


            {news.id === 1 && (
                  <p className="mt-10 text-base md:text-lg leading-relaxed text-gray-800 text-justify">
                    <span className="text-xl font-bold">PURPOSE OF THE COURSE</span> <br />
                    {news.purpose} <br /><br />


                    <span className="text-xl font-bold">OBJECTIVE</span> <br />
                    {news.objective} <br /><br />


                    <span className="text-xl font-bold">INSTRUCTIONAL OBJECTIVE</span> <br />
                    {news.instructionalObj} <br /><br />


                    <span className="text-xl font-bold">PERFORMANCE OBJECTIVE</span> <br />
                    {news.perfObj}
                  </p>
  )}




            {news.id === 3 && (
              <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-800 text-justify">
                <span className="text-xl font-bold">COURSE TITLE</span> <br />
                {news.ctitle} <br /><br />
                <span className="text-xl font-bold">TARGET</span> <br />
                {news.target} <br /><br />
                <span className="text-xl font-bold">DESCRIPTION</span> <br />
                {news.desc} <br /><br />
                <span className="text-xl font-bold">PRE REQ</span> <br />
                {news.prereq} <br /><br />
                <span className="text-xl font-bold">DURATION</span> <br />
                {news.duration} <br /><br />
                <span className="text-xl font-bold">GENERAL PURPOSE</span> <br />
                {news.genPurpose} <br /><br />
                <span className="text-xl font-bold">LEARNING OUTCOME</span> <br />
                {news.learnOutcome} <br /><br />
                <span className="text-xl font-bold">cCONTENT</span> <br />
                {news.cContent} <br /><br />
              </p>
            )}
          </div>


          {/* Right Sidebar */}
          <div className="md:w-1/3 md:pl-8 mt-8 md:mt-0">
            <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
             
              {/* Related News */}
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Related News</h2>
              <div className="space-y-4">
                {relatedNews.map((item) => (
                  <Link
                    key={item.id}
                    to={`/news/${item.id}`}
                    state={{ news: item }}
                    className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition"
                  >
                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-800">{item.title}</h3>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                  </Link>
                ))}
              </div>


              {/* Categories Section */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                  {["Health", "Emergency", "Training", "Response"].map((cat) => (
                    <button
                      key={cat}
                      className="w-full px-3 py-1 text-sm border rounded-md bg-white text-black hover:bg-red-900 hover:text-white transition"
                      onClick={() => handleCategoryClick(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>


              {/* Upcoming Events */}
              <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Upcoming Events</h2>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer hover:bg-gray-200 transition"
                      onClick={() => navigate(`/events/${event.id}`, { state: { event } })}
                    >
                      <div className="bg-red-800 text-white p-3 rounded-lg text-center w-16">
                        <p className="text-lg font-bold">{event.date.split(" ")[0]}</p>
                        <p className="text-xl font-extrabold">{event.date.split(" ")[1]}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                        <p className="text-sm text-gray-600">Duration: {event.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


export default NewsDetail;





