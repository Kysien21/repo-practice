const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

router.post('/api/signup', authController.signup)
module.exports = router