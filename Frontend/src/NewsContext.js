import React, { createContext, useState } from "react";

// Creating context for managing the global news data and category
export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [category, setCategory] = useState(""); // Track the current category
  const [news, setNews] = useState([]); // Track fetched news

  return (
    <NewsContext.Provider value={{ category, setCategory, news, setNews }}>
      {children}
    </NewsContext.Provider>
  );
};
