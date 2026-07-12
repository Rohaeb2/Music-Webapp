const path = require('path')
const pool = require("../config/database")
require('dotenv').config()

class spotifyModel{
    constructor(){
    }
    async hasTokens(userID){
        try{
            const sql = 'SELECT * FROM spotify_tokens WHERE user_id = ? LIMIT 1';
            const [rows] = await pool.query(sql, [userID])

            if (rows.length === 0){
                return false
            } else {
                return true
            }
        } catch (error){
            console.log(error)
        }
    }
    async saveTokens(spotifyTokenData){
        try{
            const sql = 'INSERT INTO spotify_tokens (user_id, access_token, refresh_token,expires_at) VALUES (?,?,?,?)';
            const [result] = await pool.query(sql, [spotifyTokenData.user_id,spotifyTokenData.access_token,spotifyTokenData.refresh_token,spotifyTokenData.expires_at]);
            if (result.affectedRows === 1){
                return true
            } else{
                return false
            }   
        } catch (error){
            console.log(error)
        }
        
    }
}

module.exports = new spotifyModel;