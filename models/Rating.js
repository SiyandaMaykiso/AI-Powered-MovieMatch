const pool = require('../config/db');

const Rating = {
    saveRating: async (userId, movieId, rating) => {
        const result = await pool.query(
            'INSERT INTO ratings (user_id, movie_id, rating) VALUES ($1, $2, $3) RETURNING *',
            [userId, movieId, rating]
        );
        return result.rows[0]; // Return the saved rating
    },
};

module.exports = Rating;