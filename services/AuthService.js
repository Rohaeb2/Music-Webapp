const path = require('path')
const userModel = require('../models/UserModel')
const bcrypt = require("bcrypt")

class AuthService{
    constructor(){
    }
    async login (username,password){
        const inputPassword = password
        let verifiedUser = await userModel.verifyUser(username)
        verifiedUser = verifiedUser[0][0]
        const hashedPassword = verifiedUser.password_hash;
        try{
            const result = await bcrypt.compare(inputPassword,hashedPassword)
            const user = {
                userData: verifiedUser,
                checkPassword: result,
                userId : verifiedUser.id
            }
            return user
        } catch (err){
            console.log(err)
        }

    }
};

module.exports = new AuthService;