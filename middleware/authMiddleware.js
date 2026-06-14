const path = require('path')
function isLoggedIn(req,res,next){
    if (req.session.userID){
        next()
    } else{
        console.log("not",req.session.userID)
        res.redirect("/auth/login")
    }
}
module.exports = isLoggedIn;