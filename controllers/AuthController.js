const path = require('path')
class AuthController{
    constructor(){
        this.showLogin = this.showLogin.bind(this)
    }
    showLogin(req,res){
        try{
        res.sendFile(path.join(__dirname,'..','views','login.html'))
        console.log("success")
    } catch (err){
        res.status(500).send("Something went wrong")
    }
    }
    verifyLogin(req,res){
        try{
            console.log(req)
            res.send("hello")
        
    } catch (err){
        console.log("pass")
    }
    }
}
module.exports = new AuthController()
 