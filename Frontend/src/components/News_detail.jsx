import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import "./News_Detail.css";
import { new_url } from "./Header";

const NewsDetail = () => {
  const [apiUrl] = useAtom(new_url); // Atom for news URL, persisted in localStorage
  const [newsData, setNewsData] = useState(null); // News details state
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(true); // Loading state
  const baseApiUrl = "http://127.0.0.1:5000/newsdetail?url=";
  console.log(apiUrl)
  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!apiUrl) {
        setError("No news URL provided.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const fullApiUrl = `${baseApiUrl}${encodeURIComponent(apiUrl)}`;
        const response = await axios.get(fullApiUrl);

        // Check response data structure and assign data accordingly
        const newsDetails = response?.data?.data;
        if (newsDetails) {
          setNewsData(newsDetails);
        } else {
          throw new Error("Invalid response structure.");
        }
      } catch (err) {
        setError("Failed to fetch news details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch news details if the `apiUrl` is available
    if (apiUrl) {
      fetchNewsDetail();
    }
  }, [apiUrl]);

  if (!apiUrl) {
    return <div className="error">Waiting for the news URL...</div>;
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!newsData) {
    return <div className="error">No news data available.</div>;
  }

  return (
    <div className="news-container2">
      <h1 className="news-title2">{newsData.title || "Untitled"}</h1>
      {newsData.sub_title && <h2 className="news-subtitle2">{newsData.sub_title}</h2>}
      {newsData.img && (
        <div className="news-image-container">
          <img src={newsData.img} alt="News" className="news-image2" />
        </div>
      )}
      {newsData.paragraph && (
        <div
          className="news-paragraph2"
          dangerouslySetInnerHTML={{ __html: newsData.paragraph }}
        />
      )}
      <p className="publish-time2">
        Published on: {newsData.publish_time || "Unknown"}
      </p>
    </div>
  );
};

export default NewsDetail;
