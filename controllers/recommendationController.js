const Movie = require('../models/Movie');
const Rating = require('../models/Rating');
const Recommendation = require('../models/Recommendation');

const getMovies = async (req, res) => {
    try {
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
        const movie = await Movie.addMovie(title, genre, release_year);
        res.json(movie);
    } catch (err) {
        console.error('Error adding movie:', err);
        res.status(500).json({ error: 'Failed to add movie' });
    }
};

const recommendMovies = async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch user ratings to identify genres
        const userRatings = await Rating.getUserRatings(userId);

        if (!userRatings || userRatings.length === 0) {
            return res.status(404).json({ error: 'No ratings found for user' });
        }

        // Extract unique genres from the user's rated movies
        const genres = [...new Set(userRatings.map((rating) => rating.genre))];

        if (!genres || genres.length === 0) {
            return res.status(404).json({ error: 'No genres found for recommendations' });
        }

        // Fetch recommendations based on genres
        const recommendations = await Recommendation.getMoviesByGenres(userId, genres);
        res.json(recommendations);
    } catch (err) {
        console.error('Error recommending movies:', err);
        res.status(500).json({ error: 'Failed to recommend movies' });
    }
};

module.exports = {
    getMovies,
    saveRating,
    addMovie,
    recommendMovies,
};