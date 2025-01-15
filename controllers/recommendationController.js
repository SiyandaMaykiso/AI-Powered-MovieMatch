const axios = require('axios');
const Movie = require('../models/Movie');
const Rating = require('../models/Rating');
const Recommendation = require('../models/Recommendation');

// Base URL for the Python API
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://127.0.0.1:8000';

// Fetch all movies
const getMovies = async (req, res) => {
    try {
        const movies = await Movie.getAllMovies();
        res.json({ movies });
    } catch (err) {
        console.error('Error fetching movies:', err);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};

// Save a rating
const saveRating = async (req, res) => {
    const { userId, movieId, rating } = req.body;

    if (!userId || !movieId || !rating) {
        return res.status(400).json({ error: 'Missing required fields: userId, movieId, rating' });
    }

    try {
        const savedRating = await Rating.saveRating(userId, movieId, rating);
        res.json({ message: 'Rating saved successfully', savedRating });
    } catch (err) {
        console.error('Error saving rating:', err);
        res.status(500).json({ error: 'Failed to save rating' });
    }
};

// Add a new movie
const addMovie = async (req, res) => {
    const { title, genre, release_year } = req.body;

    if (!title || !genre || !release_year) {
        return res.status(400).json({ error: 'Missing required fields: title, genre, release_year' });
    }

    try {
        const movie = await Movie.addMovie(title, genre, release_year);
        res.json({ message: 'Movie added successfully', movie });
    } catch (err) {
        console.error('Error adding movie:', err);
        res.status(500).json({ error: 'Failed to add movie' });
    }
};

// Recommend movies for a user
const recommendMovies = async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch user ratings
        const userRatings = await Rating.getUserRatings(userId);

        if (!userRatings || userRatings.length === 0) {
            return res.status(404).json({ error: 'No ratings found for user' });
        }

        // Extract unique genres from rated movies
        const genres = [...new Set(userRatings.map((rating) => rating.genre))];

        if (!genres || genres.length === 0) {
            return res.status(404).json({ error: 'No genres found for recommendations' });
        }

        // Fetch recommendations from the database or Python API
        const recommendations = await Recommendation.getMoviesByGenres(userId, genres);
        res.json({ recommendations });
    } catch (err) {
        console.error('Error recommending movies:', err);
        res.status(500).json({ error: 'Failed to recommend movies' });
    }
};

// Forward user ratings to Python API for processing
const submitRatings = async (req, res) => {
    const { user_id, ratings } = req.body;

    if (!user_id || !Array.isArray(ratings) || ratings.length === 0) {
        return res.status(400).json({ error: 'Invalid request body. Ensure user_id and ratings are provided.' });
    }

    try {
        // Forward ratings to Python API
        const response = await axios.post(`${PYTHON_API_URL}/submit-ratings`, { user_id, ratings });
        res.status(200).json({
            message: 'Ratings submitted successfully',
            data: response.data,
        });
    } catch (err) {
        console.error('Error submitting ratings to Python API:', err.message);

        if (err.response) {
            res.status(err.response.status).json({ error: err.response.data });
        } else {
            res.status(500).json({ error: 'Failed to submit ratings. Please try again later.' });
        }
    }
};

module.exports = {
    getMovies,
    saveRating,
    addMovie,
    recommendMovies,
    submitRatings,
};