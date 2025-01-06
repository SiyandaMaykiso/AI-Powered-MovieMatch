import React, { useState } from 'react';
import axios from 'axios';
import './Recommendations.css';

const Recommendations = () => {
  const [userId, setUserId] = useState('');
  const [topN, setTopN] = useState(5); // Default to 5 recommendations
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch recommendations from the backend
  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post('http://127.0.0.1:8000/recommendations', {
        user_id: parseInt(userId),
        top_n: parseInt(topN),
      });
      setRecommendations(response.data.recommendations);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch recommendations. Please check your input.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Get Movie Recommendations</h2>

      {/* User Input Form */}
      <div>
        <label>
          User ID:
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your User ID"
          />
        </label>
      </div>
      <div>
        <label>
          Number of Recommendations:
          <input
            type="number"
            value={topN}
            onChange={(e) => setTopN(e.target.value)}
            placeholder="Enter number of recommendations"
          />
        </label>
      </div>
      <button onClick={fetchRecommendations}>Get Recommendations</button>

      {/* Loading State */}
      {loading && <div>Loading recommendations...</div>}

      {/* Error State */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Recommendations List */}
      {recommendations.length > 0 && (
        <div>
          <h3>Your Recommendations:</h3>
          <ul>
            {recommendations.map((movie) => (
              <li key={movie.movie_id}>
                <strong>{movie.title}</strong> - Predicted Rating: {movie.predicted_rating.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Recommendations;