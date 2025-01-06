import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Optional: Add custom styling

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to AI-Powered MovieMatch!</h1>
        <p>Your personalized movie recommendation platform.</p>
      </header>
      <div className="home-actions">
        <Link to="/questionnaire" className="home-button">
          Start Questionnaire
        </Link>
        <Link to="/recommendations" className="home-button">
          View Recommendations
        </Link>
      </div>
    </div>
  );
};

export default Home;