const express = require('express');
const { getMovies, saveRating } = require('../controllers/recommendationController');
const router = express.Router();

router.get('/movies', getMovies);
router.post('/rate', saveRating);

module.exports = router;