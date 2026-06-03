const path = require('path')
require('dotenv').config()
const pool = require("../config/database")

class UserModel{
    constructor(){
    }
    static async verifyUser(username){
        console.log("we got",username)
        try{
            const sql = 'SELECT * FROM users WHERE username = ? LIMIT 1';
            const [rows] = await pool.query(sql, [username])

            if (rows.length === 0){
                return null
            } else {
                const user = [rows]
                console.log("model print",user)
                return user
            }
        } catch (error){
            console.log(error)
        }
    }
}

module.exports = UserModel;
