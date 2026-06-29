
const SpotifyService = require('../services/SpotifyService');
require('dotenv').config()

class SpotifyController{
    constructor(){

    }
    async connectSpotify(req,res){
        try{
            console.log("step")
            const urlData = await SpotifyService.buildAuthURL()
            req.session.spotifyState = urlData.state 
            res.redirect(urlData.url)
        } catch (err){
            console.log(err)
        }
    }
    async getSpotifyData(req,res){
        if (req.session.spotifyState != req.query.state){
            res.send("Error")
        } else{
            res.send('pending')
            const cleanData = await SpotifyService.buildSpotifyData(req.query)
            console.log(cleanData)
        }
    }
}

module.exports = new SpotifyController;