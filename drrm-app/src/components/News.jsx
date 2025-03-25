import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import News1 from "../assets/news (1).png";
import News2 from "../assets/news (2).png";
import News3 from "../assets/news (3).png";



// make sure that the information here in my id 1,2,3 will show when i clicked certain news, these are important
const newsData = [
  {
    id: 1,
    title: "HOPE: Strengthening Hospital Preparedness for Emergencies",
    image: News1,
    date: "January 00, 2025",
    purpose:"The main purpose of the HOPE course is to enhance hospital based preparedness in Asia. In order to accomplish this aim, the HOPE course will bring medical and administrative leaders in hospital based disaster management together to discuss the principles of disaster management and work together to make practical steps toward preparing each participants home institution to respond to disasters and mass casualty incidents.",
    objective:"The objectives of the HOPE course are based on instructional objectives and performance objectives, as outlined below:",
    instructionalObj: "At the end of the course, the participant should be able to:Describe the relationship between hospitals and disasters.Apply a method of judging the effects of different hazards on the functional and operational components of a hospital.Simulate a mass casualty incident addressing the roles and responsibilities of each component of HICS. Discuss the basic requirements in the medical aspects of managing mass casualties. Apply concepts learned in on-site medical care to specific situations. Prepare an outline of a hospital disaster preparedness plan.",
    perfObj: "By the end of the course, depending on the disaster scenario, the participants will be able to: Conduct a vulnerability assessment of the hospital Develop a hospital disaster plan Manage a disaster response",
    tags: ["Health", "Emergency"],
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Basic Emergency Response Team Simulation Training (BERTST)",
    image: News2,
    date: "January 00, 2025",
    content: " HELLO ",
    tags: ["Training", "Response"],
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 3,
    title: "Mass Casualty Incident (MCI) and Triage Training",
    image: News3,
    date: "January 00, 2025",
    content: "",
    ctitle: "Mass Casualty Incident (MCI) and Triage Training Course",
    target: "This manual on Mass Casualty Incident (MCI) and Triage Training will be used by the  health professionals who may or may not have background on triaging and disaster management, and emergency responders assigned in triaging casualties during  disaster situations for prompt medical  management",
    desc: "Basic concepts and knowledge on triage during mass casualty incidents which will provide the trainees with better understanding on their recommended triaging skills and patient management emphasizing on the application of different triaging algorithms and systems during disaster situations using multidisciplinary approach. ",
    prereq: "Any background on professional medical courses and/or specialized training on first aid and the like ",
    duration: "Three days (8:00 AM to 5:00 PM)",
    genPurpose: "This module was designed to provide trainees with concepts and purpose of triage during mass  casualty incidents, including the utilization of various triage system algorithms available using case scenario based simulation. Ultimately, this is also to prepare the trainees to be a competent triage  officer with advanced knowledge, skills, and attitude in applying disaster triage systems for correct  assignment of victims to appropriate triage categories, regardless of age, gender, socio-economic  status, nationality, cultural affiliation, or religious belief.",
    learnOutcome: "Upon completion of this training course, the trainees should be able to: 1. State the purpose of triage algorithms during mass casualty incidents;  2. Differentiate the different triage algorithms and its respective triage categories;  3. Apply the use of appropriate triage algorithms in assigning victims correctly in triage  categories; and  4. Practice a multidisciplinary approach in the management of patient conditions.",
    cContent: "The course contents of this training module were selected based on the set objectives of the training and the participants prior knowledge on triaging during mass casualty incidents and their varying  competence level. This was also organized in a manner that the participants can determine the  chronological sequence of concepts in triaging, from the history and development of triage, including  its purpose during mass casualty incidents to the integration of different triage algorithms and  systems.",
    dAte: "March 21, 2025",
    tags: ["Emergency", "Triage"],
    readTime: "6 min read",
    featured: false,
  },
];


function News() {
  const location = useLocation();
  const selectedCategoryFromDetail = location.state?.selectedCategory || ""; // Get category from NewsDetail


  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(selectedCategoryFromDetail); // Set default category if coming from NewsDetail
  const [filter, setFilter] = useState("Today");


  // Filtered news based on search, category, and other filters
  const filteredNews = newsData
    .filter((news) => news.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((news) => !category || news.tags.includes(category));


  return (
    <main className="bg-white text-black">
      <section className="mt-20 mb-8 px-8">
        {/* Breadcrumb */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-start font-semibold">
            <Link to="/" className="flex items-center">
              Home
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevrons-right mx-2"
              >
                <path d="m6 17 5-5-5-5" />
                <path d="m13 17 5-5-5-5" />
              </svg>
            </Link>
            <p className="text-red-900">News</p>
          </div>
        </div>


        <h2 className="text-3xl font-semibold text-red-900 uppercase text-left">News</h2>


        {/* Search & Filter Section */}
        <div className="flex flex-col md:flex-row justify-between mt-4 mb-6 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search news..."
            className="p-2 border rounded-md w-full md:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex space-x-4">
            {/* Category Dropdown */}
            <select
              className="p-2 border rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Health">Health</option>
              <option value="Emergency">Emergency</option>
              <option value="Training">Training</option>
              <option value="Response">Response</option>
            </select>


            {/* Date Filter Dropdown */}
            <select
              className="p-2 border rounded-md"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="Today">Today’s News</option>
              <option value="Week">This Week</option>
              <option value="Month">This Month</option>
            </select>
          </div>
        </div>


        {/* News List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {filteredNews.length > 0 ? (
            filteredNews.map((news) => (
              <Link
                key={news.id}
                to={`/news/${news.id}`}
                state={{ news }}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="h-40 w-full object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold mt-2 text-gray-800 hover:text-red-900">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm">{news.date} • {news.readTime}</p>
                <div className="mt-2">
                  {news.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-200 rounded-full px-2 py-1 mr-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-3">No news found.</p>
          )}
        </div>
      </section>
    </main>
  );
}


export default News;



