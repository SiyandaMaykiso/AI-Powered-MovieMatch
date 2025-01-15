import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8001';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Automatically fetch recommendations when the component mounts
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError('');

        // Retrieve the JWT token and user ID from localStorage
        const token = localStorage.getItem('token');
        const userId = parseInt(localStorage.getItem('user_id'), 10);

        if (!token || isNaN(userId)) {
          setError('You are not logged in. Please log in to access recommendations.');
          setLoading(false);
          return;
        }

        // Make the API call to fetch recommendations
        const response = await axios.post(
          `${API_BASE_URL}/api/recommendations`,
          { user_id: userId, top_n: 5 }, // Include user_id and top_n in the payload
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
            },
          }
        );

        // Set the recommendations state with the API response
        setRecommendations(response.data.recommendations);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized. Please log in again.');
        } else if (err.response && err.response.status === 422) {
          setError('Invalid request data. Please try again.');
        } else {
          setError('Failed to fetch recommendations. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    // Trigger the fetchRecommendations function on component mount
    fetchRecommendations();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Movie Recommendations
      </Typography>

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Loading recommendations...
          </Typography>
        </div>
      )}

      {/* Error State */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Recommendations List */}
      {recommendations.length > 0 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Your Recommendations:
          </Typography>
          <List>
            {recommendations.map((movie) => (
              <ListItem key={movie.movie_id} divider>
                <ListItemText
                  primary={movie.title}
                  secondary={`Predicted Rating: ${movie.predicted_rating.toFixed(2)}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default Recommendations;