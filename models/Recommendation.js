const pool = require('../config/db');

const Recommendation = {
    getMoviesByGenres: async (userId, genres) => {
        if (!genres || genres.length === 0) {
            throw new Error('Genres list is empty or undefined');
        }

        // Sanitize genre list for the query
        const genreList = genres.map((g) => `'${g}'`).join(', ');

        // Query for movies matching the genres but exclude those already rated by the user
        const query = `
            SELECT * 
            FROM movies 
            WHERE genre IN (${genreList}) 
              AND id NOT IN (SELECT movie_id FROM ratings WHERE user_id = $1)
        `;
        
        try {
            const result = await pool.query(query, [userId]);
            return result.rows; // Return the recommended movies
        } catch (err) {
            console.error('Error in getMoviesByGenres:', err);
            throw new Error('Failed to fetch recommended movies');
        }
    },
};

module.exports = Recommendation;