const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Use the User model to create a new user
        const user = await User.createUser(username, hashedPassword);

        res.json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Use the User model to find the user by username
        const user = await User.getUserByUsername(username);

        if (user && (await bcrypt.compare(password, user.password))) {
            // Generate a JWT token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

            // Include the user_id in the response
            res.json({
                token,
                user_id: user.id, // Send user ID directly
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Failed to log in' });
    }
};

module.exports = {
    register,
    login,
};