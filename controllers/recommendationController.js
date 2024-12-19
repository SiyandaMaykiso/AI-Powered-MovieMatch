const Movie = require('../models/Movie');
const Rating = require('../models/Rating');

const getMovies = async (req, res) => {
    try {
        // Use the Movie model to fetch all movies
        const movies = await Movie.getAllMovies();
        res.json(movies);
    } catch (err) {
        console.error('Error fetching movies:', err);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};

const saveRating = async (req, res) => {
    const { userId, movieId, rating } = req.body;
    try {
        // Use the Rating model to save the rating
        const savedRating = await Rating.saveRating(userId, movieId, rating);
        res.json(savedRating);
    } catch (err) {
        console.error('Error saving rating:', err);
        res.status(500).json({ error: 'Failed to save rating' });
    }
};

const addMovie = async (req, res) => {
    const { title, genre, release_year } = req.body;
    try {
        // Use the Movie model to add a new movie
        const movie = await Movie.addMovie(title, genre, release_year);
        res.json(movie);
    } catch (err) {
        console.error('Error adding movie:', err);
        res.status(500).json({ error: 'Failed to add movie' });
    }
};

module.exports = {
    getMovies,
    saveRating,
    addMovie,
};