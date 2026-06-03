const path = require('path')

class DashboardController{
    constructor(){
    }
    static showDashboard(req,res){
        try{
        res.sendFile(path.join(__dirname,'..','views','dashboard.html'))
    } catch (err){
        res.status(500).send("Something went wrong")
    }
    }
}

module.exports = DashboardController;