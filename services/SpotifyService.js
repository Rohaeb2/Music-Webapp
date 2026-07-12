const crypto = require('crypto')
const querystring = require('querystring')
require('dotenv').config()
const spotifyModel = require('../models/spotifyModel')

class SpotifyService{
    constructor(){

    }
    async buildAuthURL(req,res){
        console.log("hi")
        const buildState = crypto.randomBytes(16).toString('hex');
        const authUrl = ('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.SPOTIFY_CLIENT_ID,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
                state: buildState,
        })
    )
    const urlData = {
        url : authUrl,
        state: buildState

    }
    return urlData;
}
    async exchangeCodeforToken(code){
        const response= await fetch('https://accounts.spotify.com/api/token', {
            method: "POST",
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic '  + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
            },
            body: new URLSearchParams({
                code: code,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
                grant_type: 'authorization_code'
            }),
            
        })
        if (!response.ok){
            console.log("Error occurred")
        } else{
            const data = await response.json()
            const tokenData = {
                access_token: data.access_token,
                expires_in: data.expires_in,
                refresh_token: data.refresh_token
            };
            return tokenData;
        }
    }
    async buildSpotifyData(data,userId){
        const rawData = data
        const authCode = rawData.code
        const accessTokenData = await this.exchangeCodeforToken(authCode)
        const expiresAt = new Date(Date.now() + accessTokenData["expires_in"] * 1000)
        const spotifyPayload = {
            user_id: userId,
            access_token: accessTokenData["access_token"],
            refresh_token: accessTokenData["refresh_token"],
            expires_at: expiresAt
            }
        const modelResult = spotifyModel.saveTokens(spotifyPayload)
        return modelResult
        //return accessTokenData
        
        
    }
    async hasTokens(userID){
        const tokenVerificaton = await spotifyModel.hasTokens(userID)
        return tokenVerificaton
    }
}

module.exports = new SpotifyService;