const crypto = require('crypto')
const querystring = require('querystring')
require('dotenv').config()

class SpotifyController{
    constructor(){

    }
    async connectSpotify(req,res){
        //res.send('hi')
        //const state = crypto.randomBytes(16).toString('hex')

        res.redirect('https://accounts.spotify.com/authorize?'+
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.SPOTIFY_CLIENT_ID,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
                state: crypto.randomBytes(16).toString('hex'),
            })
        )
    }
    async getSpotifyData(req,res){
        //res.send('hi',req)
        //console.log("hel",req.query)
    }
}

module.exports = new SpotifyController;