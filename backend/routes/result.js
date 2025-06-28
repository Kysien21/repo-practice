const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.get('/results', resultController.getresults);
router.post('/confirm', resultController.confirmAndDeleteOriginal);

module.exports = router;