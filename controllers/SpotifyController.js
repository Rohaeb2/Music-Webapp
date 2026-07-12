
const spotifyModel = require('../models/spotifyModel');
const SpotifyService = require('../services/SpotifyService');
const userService = require('../services/UserService');
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
            const result = await SpotifyService.buildSpotifyData(req.query,req.session.userID)
            if (result === true){
                console.log("data built")
                res.redirect('/Wavelength/dashboard')
            } else{
                res.send("Failed Connection, retry")
            }
        }
    }
    async showSpotifyData(req,res){
        const user = await userService.getUser(req.session.userID)
        res.render('data',{name: user.username})
    }
}

module.exports = new SpotifyController;