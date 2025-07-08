const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/feedback', requireAuth, feedbackController.getFeedback);

module.exports = router;