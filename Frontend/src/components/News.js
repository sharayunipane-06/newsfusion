import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NewsContext } from "../NewsContext"; // Import NewsContext
import "./News.css";
import { useAtom } from "jotai";
import { new_url } from "./Header";

const News = () => {
  const { category, setCategory, news, setNews } = useContext(NewsContext); // Use global state
  const [loading, setLoading] = useState(false); // Handle loading state
  const [error, setError] = useState(null);
  const [_, setNews_url] = useAtom(new_url); // Set news_url atom
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const passedCategory = location.state?.category || ""; // Get category from navigation

  // Update category when passedCategory changes
  useEffect(() => {
    if (passedCategory && passedCategory !== category) {
      setCategory(passedCategory); // Update global category
      setNews([]); // Clear old news to force re-fetch
    }
  }, [passedCategory, category, setCategory, setNews]);

  // Fetch news when the category changes
  useEffect(() => {
    if (category) {
      const fetchNews = async () => {
        try {
          setLoading(true);
          setError(null); // Reset error state
          const response = await fetch(
            `http://localhost:5000/fetch_news?category=${category}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch news");
          }

          const data = await response.json();

          // Ensure the response contains an array of news
          if (Array.isArray(data)) {
            setNews(data); // Save news in global state
          } else {
            throw new Error("Invalid data format: response must be an array of news items");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false); // Stop loading indicator
        }
      };

      fetchNews();
    }
  }, [category, setNews]);

  // Handle "Read More" click
  const handleReadMore = (link) => {
    setNews_url(link); // Set the link in the global atom
    navigate("/newsdetail"); // Redirect to the newsdetail page
  };

  return (
    <div className="news-container">
      <h1>{category} News</h1>

      {/* Loading state */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* Error state */}
      {error && <p className="error-message">Error: {error}</p>}

      {/* No news available */}
      {!loading && !error && (!news || news.length === 0) && (
        <p>No news available for this category.</p>
      )}

      {/* News grid */}
      {!loading && !error && news.length > 0 && (
        <div className="news-grid">
          {news.map((item, index) => (
            <div className="news-card" key={index}>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="news-thumbnail"
                />
              )}
              <div className="news-content">
                <h3 className="news-title">{item.title}</h3>
                <p
                  className="news-full-content"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
                <p className="news-published">
                  Published: {item.published_date}
                </p>
                {item.link && (
                  <button
                    onClick={() => handleReadMore(item.link)}
                    className="news-readmore"
                  >
                    Read More
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
