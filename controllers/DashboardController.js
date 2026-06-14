const path = require('path')
const DashboardService = require('../services/DashboardService');
class DashboardController{
    constructor(){
    }
    async showDashboard(req,res){
        const userId = req.session.userID;
        const userData = await DashboardService.getDashboardData(userId)
        try{
        res.render('dashboard', {name: userData.username})
    } catch (err){
        res.status(500).send("Something went wrong")
    }
    }
}
//i need to get a new user object

module.exports = new DashboardController;