const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');
const { requireAuth } = require('../middleware/authMiddleware')

router.post('/analyze', requireAuth, analysisController.analyzeResume);
module.exports = router;