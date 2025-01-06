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