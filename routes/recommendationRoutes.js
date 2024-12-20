const express = require('express');
const { getMovies, saveRating, addMovie, recommendMovies } = require('../controllers/recommendationController');
const router = express.Router();

// Get all movies
router.get('/movies', getMovies);

// Add a new movie
router.post('/movies', addMovie);

// Save a rating
router.post('/rate', saveRating);

// Recommend movies for a user
router.get('/recommend/:userId', recommendMovies);

module.exports = router;