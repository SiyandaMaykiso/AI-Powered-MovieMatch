import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Questionnaire.css';

const Questionnaire = () => {
  const [movies, setMovies] = useState([]);
  const [ratings, setRatings] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch questionnaire movies from the backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/questionnaire');
        setMovies(response.data.movies);
        setLoading(false);
      } catch (err) {
        setError('Failed to load questionnaire movies.');
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Handle rating input changes
  const handleRatingChange = (movieId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [movieId]: rating,
    }));
  };

  // Submit ratings to the backend
  const submitRatings = async () => {
    try {
      const userId = 4; // Replace with dynamically assigned user ID if available
      const formattedRatings = Object.entries(ratings).map(([movieId, rating]) => ({
        movie_id: parseInt(movieId),
        rating: parseFloat(rating),
      }));

      await axios.post('http://127.0.0.1:8000/submit-ratings', {
        user_id: userId,
        ratings: formattedRatings,
      });

      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit ratings.');
    }
  };

  // Render loading state
  if (loading) return <div>Loading movies...</div>;

  // Render error state
  if (error) return <div>{error}</div>;

  // Render submitted state
  if (submitted) return <div>Thank you for submitting your ratings!</div>;

  // Render questionnaire
  return (
    <div>
      <h2>Rate These Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.movie_id}>
            <div>
              <strong>{movie.title}</strong> - {movie.genres}
            </div>
            <div>
              <label>
                Rating:
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.5"
                  onChange={(e) => handleRatingChange(movie.movie_id, e.target.value)}
                />
              </label>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={submitRatings}>Submit Ratings</button>
    </div>
  );
};

export default Questionnaire;