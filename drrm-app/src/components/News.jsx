import { useState } from "react";
import { Link } from "react-router-dom";
import News1 from "../assets/news (1).png";


const newsData = [
  {
    id: 1,
    title: "HOPE: Strengthening Hospital Preparedness for Emergencies",
    image: News1,
    date: "January 00, 2025",
    content: "Detailed content about the news article goes here."
  },
  {
    id: 2,
    title: "Basic Emergency Response Team Simulation Training (BERTST)",
    image: "News2.png",
    date: "January 00, 2025",
    content: "Detailed content about the news article goes here."
  },
  {
    id: 3,
    title: "Mass Casualty Incident (MCI) and Triage Training",
    image: "News3.png",
    date: "January 00, 2025",
    content: "Detailed content about the news article goes here."
  }
];

function News() {
  const [selectedNews, setSelectedNews] = useState(null);

  return (
    <main>
      <section className="mt-20 mb-8 px-8">
        <div className="flex items-start text-black font-semibold py-4">
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
        <h2 className="text-3xl font-semibold text-center text-red-900 uppercase text-left">
          News
        </h2>
        
        {/* All News Below */}
        <div className="grid grid-cols-3 gap-4">
          {newsData.map((news) => (
            <Link
              key={news.id}
              to={`/news/${news.id}`}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg"
              onClick={() => setSelectedNews(news)}
            >
              <img
                src={news.image}
                alt={news.title}
                className="h-40 w-full object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-2 text-gray-800 hover:text-red-900">
                {news.title}
              </h3>
              <p className="text-gray-600 text-sm">{news.date}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default News;