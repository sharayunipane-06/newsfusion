import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import News from './components/News';
import Pastnews from './components/Pastnews'; 
import Header from './components/Header';
import './index.css';
import NewsDetail from './components/News_detail';
import { NewsProvider } from './NewsContext'; // Import the NewsProvider

const App = () => {
   return (
      <NewsProvider> {/* Wrap the App in NewsProvider to provide global state */}
         <Header />
         <Routes>
            {/* Existing Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/pastnews" element={<Pastnews />} />
            <Route path='/newsdetail' element={<NewsDetail />} />
         </Routes>
      </NewsProvider>
   );
};

export default App;
