const path = require('path')
const AuthService = require('../services/AuthService');
const session = require('express-session')
const SpotifyService = require('../services/SpotifyService');



class AuthController{
    constructor(){
        this.showLogin = this.showLogin.bind(this)
    }
    showLogin(req,res){
        console.log(req)
        try{
        res.sendFile(path.join(__dirname,'..','views','login.html'))
    } catch (err){
        res.status(500).send("Something went wrong")
    }
    }
    async verifyLogin(req,res){
        try{
            const username = req.body.username;
            const password = req.body.password;
            const result = await AuthService.login(username,password)
            if (result.checkPassword === false){
                res.send("Failed login") 
            }
            if (result.checkPassword  === true){
                req.session.userID = result.userId
                req.session.save()
                const hasSpotify = await SpotifyService.hasTokens(req.session.userID)
                if (!hasSpotify){
                    res.redirect('/spotify/connect')
                }
                res.redirect('/Wavelength/dashboard')

            }
    } catch (err){
        //console.log(err)
    }
    }
}
module.exports = new AuthController;
 