const path = require('path')
const userModel = require('../models/UserModel')


class AuthController{
    constructor(){
        this.showLogin = this.showLogin.bind(this)
    }
    static showLogin(req,res){
        try{
        res.sendFile(path.join(__dirname,'..','views','login.html'))
    } catch (err){
        res.status(500).send("Something went wrong")
    }
    }
     static async verifyLogin(req,res){
        try{
            const username = req.body.username;
            const result = await userModel.verifyUser(username)
            if (result === null){
                return None
            }
            res.redirect('/Wavelength/dashboard')
            console.log("ehh")

        
    } catch (err){
        console.log("pass")
    }
    }
}
module.exports = AuthController;
 