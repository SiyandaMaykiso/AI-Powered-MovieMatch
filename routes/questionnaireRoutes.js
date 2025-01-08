const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Define the path to the CSV file
const csvFilePath = path.join(__dirname, '../data/ml-latest-small/questionnaire_movies.csv');

// GET /questionnaire
router.get('/', (req, res) => {
  const movies = [];

  // Read the CSV file and parse its contents
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      movies.push({
        movie_id: parseInt(row.movie_id),
        title: row.title,
        genres: row.genres,
      });
    })
    .on('end', () => {
      res.json({ movies });
    })
    .on('error', (err) => {
      console.error('Error reading the CSV file:', err);
      res.status(500).json({ error: 'Failed to load movies data' });
    });
});

module.exports = router;