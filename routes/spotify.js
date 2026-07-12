const express = require('express');
const router = express.Router()
const spotifyController = require('../controllers/SpotifyController');
const isLoggedIn = require('../middleware/authMiddleware')

router.get('/connect',isLoggedIn,spotifyController.connectSpotify);
router.get('/callback',isLoggedIn,spotifyController.getSpotifyData);
router.get('/data',isLoggedIn,spotifyController.showSpotifyData);


module.exports = router;