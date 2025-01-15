const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const authMiddleware = require('../middlewares/authMiddleware'); // Import the authentication middleware

// Define the path to the CSV file
const csvFilePath = path.join(__dirname, '../data/ml-latest-small/questionnaire_movies.csv');

// GET /questionnaire - Protected route to fetch movies for the questionnaire
router.get('/', authMiddleware, (req, res) => {
  const movies = [];

  // Check if the CSV file exists before attempting to read
  if (!fs.existsSync(csvFilePath)) {
    return res.status(500).json({ error: 'Movies data file not found.' });
  }

  // Read and parse the CSV file
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      // Validate the structure of each row before adding it to the response
      if (row.movie_id && row.title && row.genres) {
        movies.push({
          movie_id: parseInt(row.movie_id, 10),
          title: row.title,
          genres: row.genres,
        });
      }
    })
    .on('end', () => {
      // Check if movies were successfully loaded
      if (movies.length === 0) {
        return res.status(404).json({ error: 'No movies found in the data file.' });
      }
      res.json({ movies });
    })
    .on('error', (err) => {
      console.error('Error reading the CSV file:', err);
      res.status(500).json({ error: 'Failed to load movies data. Please try again later.' });
    });
});

module.exports = router;