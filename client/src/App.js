import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Questionnaire from './components/Questionnaire';
import Recommendations from './components/Recommendations';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;