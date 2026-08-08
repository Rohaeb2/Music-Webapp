const path = require('path')
require('dotenv').config()
const pool = require("../config/database")
const User = require("./User")

class UserModel{
    constructor(){
    }
    async verifyUser(username){
        try{
            const sql = 'SELECT * FROM users WHERE username = ? LIMIT 1';
            const [rows] = await pool.query(sql, [username])

            if (rows.length === 0){
                return null
            } else {
                const user = [rows]
                return user
            }
        } catch (error){
            console.log(error)
        }
    }
    async getUser(id){
        try{
            const sql = 'SELECT * FROM users WHERE id = ? LIMIT 1';
            const [rows] = await pool.query(sql, [id])
            if (rows.length === 0){
                console.log("failed")
                return none
            } else {
                const user = [rows][0]
                const loggedInUser = new User(user)
                return  loggedInUser
            }
        } catch (error){
            console.log(error)
    }
    } 
}

module.exports = new UserModel;
