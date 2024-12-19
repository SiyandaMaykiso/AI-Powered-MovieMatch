const express = require('express');
const { getMovies, saveRating, addMovie } = require('../controllers/recommendationController');
const router = express.Router();

// Get all movies
router.get('/movies', getMovies);

// Add a new movie
router.post('/movies', addMovie);

// Save a rating
router.post('/rate', saveRating);

module.exports = router;