import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import './Pastnews.css';
import { new_url } from './Header';

// Persistent atoms for category and date
const categoryAtom = atomWithStorage("selected_category", "Politics");
const dateAtom = atomWithStorage("selected_date", new Date().toISOString().split("T")[0]);


const PastNews = () => {
  const [category, setCategory] = useAtom(categoryAtom); // Persisted category
  const [date, setDate] = useAtom(dateAtom); // Persisted date
  const [newsData, setNewsData] = useState([]); // Store the fetched past news data
  const [_, setNews_url] = useAtom(new_url); // Atom for storing URL globally
  const [error, setError] = useState(''); // Track errors during fetch
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch news on initial load or when category/date changes
    fetchPastNews();
  }, [category, date]);

  const fetchPastNews = async () => {
    setIsLoading(true); // Show loading spinner
    setNewsData([]); // Clear old data to avoid showing outdated content
    try {
      const response = await fetch(`http://127.0.0.1:5000/past_news?category=${category}&date=${date}`);
      const data = await response.json();

      if (response.ok) {
        setNewsData(data);
        setError('');
      } else {
        setError('No past news found for the given date and category.');
        setNewsData([]);
      }
    } catch (err) {
      setError('Error fetching past news.');
      console.error(err);
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  const handleReadMore = (link) => {
    setNews_url(link); // Store the news URL in the global atom
    navigate("/newsdetail"); // Redirect to the NewsDetail page
  };

  return (
    <div className="news-container1">
      <h1>Past News</h1>

      {/* Filters for category and date */}
      <div className="filters1">
        <div className="filter-item1">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Education">Education</option>
          </select>
        </div>

        <div className="filter-item1">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        
      </div>

      {error && <p className="error-message1">{error}</p>}

      {/* Circular Loading Indicator */}
      {isLoading && (
        <div className="loading-container1">
          <div className="loading-spinner1"></div>
        </div>
      )}

      {/* Displaying fetched news */}
      {!isLoading && (
        <div className="news-grid1">
          {newsData.length > 0 ? (
            newsData.map((newsItem, index) => (
              <div className="news-card1" key={index}>
                {newsItem.image && (
                  <img
                    src={newsItem.image}
                    alt={newsItem.title}
                    className="news-thumbnail1"
                  />
                )}
                <div className="news-content1">
                  <h2 className="news-title1">{newsItem.title}</h2>
                  <p className="news-summary1">{newsItem.content}</p>
                  <p className="news-published1">Published on: {newsItem.published_date}</p>
                  <p className="news-category1">Category: {newsItem.category}</p>
                  {newsItem.link && (
                    <button
                      onClick={() => handleReadMore(newsItem.link)}
                      className="news-readmore1"
                    >
                      Read More
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            !error && <p>No past news found for the selected date and category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PastNews;
