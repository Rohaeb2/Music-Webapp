const express = require('express');
const router = express.Router()
const authController = require('../controllers/AuthController')

router.get('/login',authController.showLogin)

router.post('/login',authController.verifyLogin)

module.exports = router;