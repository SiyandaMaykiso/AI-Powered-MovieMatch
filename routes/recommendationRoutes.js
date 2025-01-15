const express = require('express');
const axios = require('axios');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Import authentication middleware

// Base URL for the Python API
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://127.0.0.1:8001';

// Submit user ratings (Protected route)
router.post('/submit-ratings', authMiddleware, async (req, res) => {
  const { user_id, ratings } = req.body;

  // Validate request body
  if (!user_id || !Array.isArray(ratings) || ratings.length === 0) {
    return res.status(400).json({
      error: 'Invalid request body. Please provide a valid user_id and a non-empty ratings array.',
    });
  }

  try {
    // Forward the request to the Python API
    const response = await axios.post(`${PYTHON_API_URL}/submit-ratings`, { user_id, ratings });

    // Return the response to the client
    res.status(200).json({
      message: 'Ratings submitted successfully',
      user_id,
      ratings: response.data.ratings, // Include Python API response
    });
  } catch (error) {
    console.error('Error submitting ratings to Python API:', error.message);

    // Handle Python API errors or connection issues
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Failed to submit ratings. Please try again later.' });
    }
  }
});

// Fetch movie recommendations (Protected route)
router.post('/recommendations', authMiddleware, async (req, res) => {
  const { user_id, top_n } = req.body;

  // Validate request body
  if (!user_id || !top_n || typeof top_n !== 'number' || top_n <= 0) {
    return res.status(400).json({
      error: 'Invalid request body. Please provide a valid user_id and a positive top_n value.',
    });
  }

  try {
    // Forward the request to the Python API
    const response = await axios.post(`${PYTHON_API_URL}/recommendations`, { user_id, top_n });

    // Return the recommendations from the Python API
    res.status(200).json({
      recommendations: response.data.recommendations, // Include recommendations from Python API
    });
  } catch (error) {
    console.error('Error fetching recommendations from Python API:', error.message);

    // Handle Python API errors or connection issues
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Failed to fetch recommendations. Please try again later.' });
    }
  }
});

module.exports = router;