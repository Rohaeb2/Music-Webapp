const path = require('path')
const session = require('express-session')
function isLoggedIn(req,res,next){
    if (req.session.userID){
        next()
    } else{
        console.log("not")
        res.redirect("/auth/login")
    }
}
module.exports = isLoggedIn;