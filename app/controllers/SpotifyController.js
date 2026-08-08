
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
    async getProfile(req,res){
        const user = await userService.getUser(req.session.userID)
        const profile = await SpotifyService.getProfileData(req.session.userID)
        console.log("profile isss",profile.display_name)
        res.render('profile', {name: user.username,
            display_name: profile.display_name,
            id: profile.account_id,          
            type: profile.type,
            spotify_uri: profile.uri,
            followers: profile.followers.total,
            profile_image: profile.profile_image
        })
    }
    async showTopTracks(req,res){
        const type = "tracks"
        const topTracks = await SpotifyService.getTopData(req.session.userID,type)
        res.render('top-tracks',{tracks: topTracks})
    }
}

module.exports = new SpotifyController;