const path = require('path')
const userService  = require('../services/UserService');
class DashboardController{
    constructor(){
    }
    async showDashboard(req,res){
        const userId = req.session.userID;
        const user = await userService.getUser(userId)
        try{
        res.render('dashboard', {name: user.username})
    } catch (err){
        res.status(500).send("Something went wrong")
    }
    }
}
//i need to get a new user object

module.exports = new DashboardController;