import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase"; 
import {Calendar} from "lucide-react";

function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNews = async () => {
      try {
        const docRef = doc(db, "news", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("News not found");
        }

        const newsData = { id: docSnap.id, ...docSnap.data() };
        setNews(newsData);

        const allNewsSnap = await getDocs(collection(db, "news"));
        const allNews = allNewsSnap.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((item) => item.id !== id);
        setRelatedNews(allNews);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const handleCategoryClick = (category) => {
    navigate("/news", { state: { selectedCategory: category } });
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error || !news) return <div className="text-center text-red-500 mt-20">{error || "News not found!"}</div>;

  return (
    <main>
      {/* SAME TEMPLATE FROM EARLIER */}
      <section className="mt-20 mb-8 p-4">
      <nav aria-label="breadcrumb">
          <div className="flex flex-col md:flex-row md:items-center text-gray-500 text-sm md:text-base">
            <div className="flex items-center">
              <Link to="/" className="hover:text-red-900">Home</Link>
              <span className="mx-2 text-black font-bold">&gt;&gt;</span>
              <Link to="/news" className="hover:text-red-900">News</Link>
              <span className="mx-2 text-black font-bold">&gt;&gt;</span>
            </div>
            <p className="text-red-900 font-semibold md:ml-2 mt-2 md:mt-0">{news.title}</p>
          </div>
        </nav>

        <div className="container mx-auto py-4 flex flex-col md:flex-row">
          <div className="md:w-2/3">
            <h1 className=" md:text-4xl font-bold text-gray-900">{news.title}</h1>
            <p className=" flex items-center text-gray-500 text-sm md:text-base mt-2"><Calendar size={20} className="mr-1"/>{news.createdAt?.toDate().toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }) || "N/A"}</p>

            <div className="mt-4">
              <img src={news.image} alt={news.title} className="w-full rounded-lg object-cover shadow-md" />
            </div>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-800 text-justify whitespace-pre-wrap">{news.content}</p>

            {/* Optional fields based on your schema */}
            {news.purpose && (
              <div className="mt-6">
                <h2 className="text-xl font-bold">PURPOSE OF THE COURSE</h2>
                <p>{news.purpose}</p>
              </div>
            )}
          </div>

          {/* Related Sidebar */}
          <div className="md:w-1/3 md:pl-8 mt-8 md:mt-0">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Related News</h2>
            <div className="space-y-4">
              {relatedNews.map((item) => (
                <Link
                  key={item.id}
                  to={`/news/${item.id}`}
                  className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition"
                >
                  <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-bold text-gray-800 mb-2">{item.title}</p>
                    <p className="flex text-xs text-gray-500"><Calendar size={20} className="mr-1"/>{item.createdAt?.toDate().toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }) || "N/A"}</p>
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
