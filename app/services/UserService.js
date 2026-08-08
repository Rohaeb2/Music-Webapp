const userModel = require('../models/UserModel')

class DashboardService{
    constructor(){
    }
    async getUser(id){
        const user = await userModel.getUser(id)
        console.log("service",user)
        return user
    }
}

module.exports = new DashboardService;