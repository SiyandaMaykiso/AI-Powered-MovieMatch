const express = require('express');
const axios = require('axios');
const { getMovies, saveRating, addMovie } = require('../controllers/recommendationController');
const router = express.Router();

// Base URL for the Python API
const PYTHON_API_URL = 'http://127.0.0.1:8001';

// Get all movies
router.get('/movies', getMovies);

// Add a new movie
router.post('/movies', addMovie);

// Save a rating
router.post('/rate', saveRating);

// Recommend movies for a user
router.post('/recommendations', async (req, res) => {
  const { user_id, top_n } = req.body;

  try {
    // Forward the request to the Python API
    const response = await axios.post(`${PYTHON_API_URL}/recommendations`, {
      user_id,
      top_n,
    });

    // Return the Python API's response to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recommendations from Python API:', error.message);

    // Handle errors from the Python API or connection issues
    if (error.response) {
      // Python API responded with an error
      res.status(error.response.status).json({ error: error.response.data.detail });
    } else {
      // Connection error or other issues
      res.status(500).json({ error: 'Failed to fetch recommendations. Please try again later.' });
    }
  }
});

module.exports = router;