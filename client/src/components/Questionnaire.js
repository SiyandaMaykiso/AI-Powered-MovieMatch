import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Questionnaire.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';

const Questionnaire = () => {
  const [movies, setMovies] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Retrieve user_id and token from localStorage
  const token = localStorage.getItem('token');
  const userId = parseInt(localStorage.getItem('user_id'), 10);

  // Fetch questionnaire movies from the backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (!token || isNaN(userId)) {
          setError('You are not logged in. Please log in to access the questionnaire.');
          setLoading(false);
          return;
        }

        setLoading(true);
        setError('');

        const response = await axios.get(`${API_BASE_URL}/api/questionnaire`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        });

        setMovies(response.data.movies);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load questionnaire movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [token, userId]);

  // Handle rating input changes
  const handleRatingChange = (movieId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [movieId]: parseFloat(rating),
    }));
  };

  // Submit ratings to the backend and navigate to recommendations
  const submitRatings = async () => {
    try {
      setError('');
      setSubmitting(true);

      if (!token || isNaN(userId)) {
        setError('You are not logged in. Please log in to submit ratings.');
        setSubmitting(false);
        return;
      }

      // Format the ratings object into the correct payload
      const formattedRatings = Object.entries(ratings).map(([movieId, rating]) => ({
        movie_id: parseInt(movieId, 10),
        rating: parseFloat(rating),
      }));

      if (formattedRatings.length === 0) {
        setError('Please rate at least one movie before submitting.');
        setSubmitting(false);
        return;
      }

      // Send POST request to the backend
      await axios.post(
        `${API_BASE_URL}/api/submit-ratings`,
        { user_id: userId, ratings: formattedRatings },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );

      // Redirect to recommendations page upon success
      navigate('/recommendations');
    } catch (err) {
      console.error('Error submitting ratings:', err.response || err);
      setError('Failed to submit ratings. Please check your input or try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  // Render loading state
  if (loading) return <div>Loading movies...</div>;

  // Render error state
  if (error) return <div className="error">{error}</div>;

  // Render questionnaire
  return (
    <div className="questionnaire">
      <h2>Rate These Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.movie_id} className="movie-item">
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
      <button onClick={submitRatings} disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Ratings'}
      </button>
    </div>
  );
};

export default Questionnaire;