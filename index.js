const express = require('express');
const cors = require('cors'); // Import CORS middleware
const dotenv = require('dotenv');
const app = express();

// Load environment variables
dotenv.config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const questionnaireRoutes = require('./routes/questionnaireRoutes');

// Import Middleware
const authMiddleware = require('./middlewares/authMiddleware');

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Public Routes
app.use('/api/auth', authRoutes); // Routes for user authentication
app.use('/api/questionnaire', questionnaireRoutes); // Routes for fetching questionnaire data

// Update: Directly register recommendation routes under `/api`
app.use('/api', recommendationRoutes); // All recommendation routes, including `/submit-ratings`

// Root Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to AI-Powered MovieMatch API!' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});