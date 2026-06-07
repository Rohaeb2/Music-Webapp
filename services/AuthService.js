const path = require('path')
const userModel = require('../models/UserModel')
const bcrypt = require("bcrypt")

class AuthService{
    constructor(){
    }
    static async  login (username,password){
        const inputPassword = password
        const verifiedUser = await userModel.verifyUser(username)
        const hashedPassword = verifiedUser[0][0].password_hash;
        try{
            const result = await bcrypt.compare(inputPassword,hashedPassword)
            const user = {
                userData: verifiedUser,
                checkPassword: result
            }
            return user
        } catch (err){
            console.log(err)
        }

    }
};

module.exports = AuthService;