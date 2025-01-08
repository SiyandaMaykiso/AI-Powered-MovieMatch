const express = require('express');
const cors = require('cors'); // Import CORS middleware
const app = express();
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const questionnaireRoutes = require('./routes/questionnaireRoutes'); // Import questionnaire routes
const authMiddleware = require('./middlewares/authMiddleware');

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Public Routes
app.use('/api/auth', authRoutes); // Prefix for authentication routes
app.use('/api/questionnaire', questionnaireRoutes); // Prefix for questionnaire route

// Protected Routes
app.use('/api/recommendations', authMiddleware, recommendationRoutes); // Prefix for recommendations route

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));