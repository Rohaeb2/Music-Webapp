const express = require('express');
const router = express.Router()
const dashboardController = require('../controllers/DashboardController');
const isLoggedIn = require('../middleware/authMiddleware')


router.get('/dashboard',isLoggedIn,dashboardController.showDashboard);

module.exports = router;