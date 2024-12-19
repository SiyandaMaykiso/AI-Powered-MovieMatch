const pool = require('../config/db');

const Movie = {
    // Fetch all movies
    getAllMovies: async () => {
        const result = await pool.query('SELECT * FROM movies');
        return result.rows; // Return the list of movies
    },

    // Add a new movie
    addMovie: async (title, genre, releaseYear) => {
        const result = await pool.query(
            'INSERT INTO movies (title, genre, release_year) VALUES ($1, $2, $3) RETURNING *',
            [title, genre, releaseYear]
        );
        return result.rows[0]; // Return the newly added movie
    },
};

module.exports = Movie;