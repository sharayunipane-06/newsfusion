import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { NewsProvider } from "./NewsContext"; // Import NewsProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NewsProvider> {/* Wrap with NewsProvider */}
      <BrowserRouter> {/* Wrap your App component with BrowserRouter */}
        <App />
      </BrowserRouter>
    </NewsProvider>
  </React.StrictMode>
);

// For performance monitoring
reportWebVitals();
