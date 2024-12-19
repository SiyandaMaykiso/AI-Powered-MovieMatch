const pool = require('../config/db');

const User = {
    getUserByUsername: async (username) => {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0]; // Return the user object
    },
    createUser: async (username, hashedPassword) => {
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );
        return result.rows[0]; // Return the newly created user
    },
};

module.exports = User;