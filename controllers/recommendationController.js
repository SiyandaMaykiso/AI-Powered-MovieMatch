const pool = require('../config/db');

const getMovies = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM movies');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching movies:', err);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};

const saveRating = async (req, res) => {
    const { userId, movieId, rating } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO ratings (user_id, movie_id, rating) VALUES ($1, $2, $3) RETURNING *',
            [userId, movieId, rating]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error saving rating:', err);
        res.status(500).json({ error: 'Failed to save rating' });
    }
};

module.exports = {
    getMovies,
    saveRating,
};