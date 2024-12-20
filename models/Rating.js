const pool = require('../config/db');

const Rating = {
    saveRating: async (userId, movieId, rating) => {
        const query = `
            INSERT INTO ratings (user_id, movie_id, rating)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const result = await pool.query(query, [userId, movieId, rating]);
        return result.rows[0]; // Return the saved rating
    },

    getUserRatings: async (userId) => {
        const query = `
            SELECT r.*, m.genre
            FROM ratings r
            JOIN movies m ON r.movie_id = m.id
            WHERE r.user_id = $1;
        `;
        const result = await pool.query(query, [userId]);
        return result.rows; // Returns ratings with movie genres
    },
};

module.exports = Rating;