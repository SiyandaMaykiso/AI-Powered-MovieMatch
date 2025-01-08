import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';

// Fetch the base URL from environment variables for flexibility
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:3001';

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

      // Retrieve token from localStorage or sessionStorage
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You are not logged in. Please log in to access recommendations.');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/recommendations`,
        {
          user_id: parseInt(userId, 10),
          top_n: parseInt(topN, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        }
      );

      setRecommendations(response.data.recommendations);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Unauthorized. Please log in again.');
      } else {
        setError('Failed to fetch recommendations. Please check your input.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Get Movie Recommendations
      </Typography>

      {/* User Input Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <TextField
          label="User ID"
          type="number"
          fullWidth
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter your User ID"
          margin="normal"
        />
        <TextField
          label="Number of Recommendations"
          type="number"
          fullWidth
          value={topN}
          onChange={(e) => setTopN(e.target.value)}
          placeholder="Enter number of recommendations"
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={fetchRecommendations}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          Get Recommendations
        </Button>
      </Paper>

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