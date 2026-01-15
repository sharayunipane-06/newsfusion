import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { NewsContext } from "../NewsContext";
import "./Home.css";

const Home = () => {
  const { setCategory } = useContext(NewsContext);
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(false);  // Define setLoading
  const fetchHeadlines = async () => {
    try {
      const response = await fetch("http://localhost:5000/fetch_headlines"); // Adjust backend URL if needed
      const data = await response.json();
      setHeadlines(data.headlines.slice(0, 10)); // Display only the top 10 headlines
    } catch (error) {
      console.error("Error fetching headlines:", error);
    } finally {
      setLoading(false); // Set loading to false when the data is fetched
    }
  };

  useEffect(() => {
    fetchHeadlines();
  }, []);

  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <div className="home-container">
      {/* Marquee for Headlines */}
      <div className="headline-marquee">
      <marquee className="marquee">
        <span className="breaking-news">Breaking News: </span>
        {headlines.map((headline, index) => (
          <span key={index} className="headline">
            {headline.title}
          </span>
        ))}
      </marquee>
    </div>


      {/* Categories Section */}
      <div className="categories">
        {/* Politics Section */}
        <div className="category">
          <h3>Politics</h3>
          <Link
            to="/news"
            state={{ category: "Politics" }}
            onClick={() => handleCategoryClick("Politics")}
          >
            <img
              src={require("./politics.webp")}
              alt="Politics"
              className="category-image"
            />
          </Link>
        </div>

        {/* Sports Section */}
        <div className="category">
          <h3>Sports</h3>
          <Link
            to="/news"
            state={{ category: "Sports" }}
            onClick={() => handleCategoryClick("Sports")}
          >
            <img
              src={require("./sports.webp")}
              alt="Sports"
              className="category-image"
            />
          </Link>
        </div>

        {/* Education Section */}
        <div className="category">
          <h3>Education</h3>
          <Link
            to="/news"
            state={{ category: "Education" }}
            onClick={() => handleCategoryClick("Education")}
          >
            <img
              src={require("./education.webp")}
              alt="Education"
              className="category-image"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
