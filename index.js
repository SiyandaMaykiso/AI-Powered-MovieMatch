const express = require('express');
const app = express();

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

app.use(express.json());

// Public Routes
app.use('/api', authRoutes);

// Protected Routes
app.use('/api', authMiddleware, recommendationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));