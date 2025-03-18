import React from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import News1 from "../assets/news (1).png";
import News2 from "../assets/news (2).png";
import News3 from "../assets/news (3).png";


const newsItems = [
  {
    id: 1,
    title: "HOPE: Strengthening Hospital Preparedness for Emergencies",
    date: "January 00, 2025",
    image: News1,
    content: "This is the detailed content for HOPE program...",
  },
  {
    id: 2,
    title: "Basic Emergency Response Team Simulation Training (BERTST)",
    date: "January 00, 2025",
    image: News2,
    content: "This training helps emergency teams prepare...",
  },
  {
    id: 3,
    title: "Mass Casualty Incident (MCI) and Triage Training",
    date: "January 00, 2025",
    image: News3,
    content: "Mass casualty response training for healthcare professionals...",
  },
];

function NewsDetail() {
  const { id } = useParams();
  const location = useLocation();
  const news = location.state?.news || newsItems.find((item) => item.id === Number(id));

  if (!news) {
    return <div className="text-center text-red-500">News not found!</div>;
  }

  // Get related news (excluding the current one)
  const relatedNews = newsItems.filter((item) => item.id !== news.id);

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
          <Link to="/news" className="flex items-center">
             News
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
          <p>{news.title}</p>
        </div>
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Main News Content */}
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold text-red-900">{news.title}</h1>
          <p className="text-gray-500 mb-4">{news.date}</p>
          <img src={news.image} alt={news.title} className="w-full rounded-lg" />
          <p className="mt-6 text-lg">{news.content}</p>
        </div>

        {/* Related News Section */}
        <div className="w-full md:w-1/3">
          <h2 className="text-2xl font-semibold text-red-900 mb-4">Related News</h2>
          <div className="space-y-4">
            {relatedNews.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.id}`}
                state={{ news: item }}
                className="block bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="h-16 w-16 rounded-md object-cover" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      </section>
    </main> 
  );
}

export default NewsDetail;