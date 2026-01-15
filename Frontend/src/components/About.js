import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-description">
        Welcome to <strong>NewsFusion</strong>, your go-to source for the latest and most diverse news. 
        We aggregate articles and updates from multiple reliable sources to bring you a comprehensive view 
        of current events, all in one place.
      </p>
      <p className="about-description">
        Our mission is to keep you informed with accurate, unbiased, and up-to-date information. Whether it’s 
        breaking news, in-depth analysis, or trending stories, we ensure you have access to a variety of perspectives.
      </p>
      <p className="about-description">
        Built as an open-source project, our platform is powered by modern technologies and a commitment 
        to transparency. We aim to provide a user-friendly experience while embracing contributions from 
        developers worldwide to continually enhance our platform.
      </p>
      <p className="about-description">
        Explore news categories, track sentiments, and discover stories that matter. Thank you for choosing 
        <strong> NewsFusion </strong> as your trusted news source.
      </p>
    </div>
  );
};

export default About;
