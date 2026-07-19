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
        const modelResult = await spotifyModel.saveTokens(spotifyPayload)
        return modelResult
        //return accessTokenData
        
        
    }
    async hasTokens(userID){
        const tokenVerificaton = await spotifyModel.hasTokens(userID)
        return tokenVerificaton
    }
    async istokenExpired (token){
        const now = new Date();
        console.log(now)
        console.log("scrib",token.expires_at)
        if (now >= token.expires_at){
            console.log("yup")
            const response= await fetch('https://accounts.spotify.com/api/token', {
            method: "POST",
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic '  + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: token.refresh_token
            })
            
        })
            if (!response.ok){
                console.log("Error occurred")
            } else{
                const data = await response.json()
                //if new refresh_token is not provided
                if (!data.refresh_token) {
                    data.refresh_token = token.refresh_token
                }
                const expiresAt = new Date(Date.now() + (data.expires_in * 1000))
                console.log("new token expires in",expiresAt)
                const newtokenData = {
                    user_id: token.user_id,
                    access_token: data.access_token,
                    refresh_token: data.refresh_token,
                    expires_at: expiresAt
            };
                const modelResult = await spotifyModel.updateToken(newtokenData)
                console.log(modelResult)
                return newtokenData
        }

        //add buffer of 60s
        } else {
            console.log("token isn not espires")
            return token
        }
    }
    async getProfileData(userID){
        const token = await spotifyModel.getToken(userID)
        console.log("token in database",token)
        const newToken = await this.istokenExpired(token)
        console.log("token i got back",newToken)

        console.log("token is",newToken.access_token,newToken.expires_at)
        const response = await fetch('https://api.spotify.com/v1/me',{
            method: "GET",
            headers: {
                Authorization: `Bearer ${newToken.access_token}`
            }
        });
        return (await response.json());
    }
    async getTopData(userID,type){
        const token = await spotifyModel.getToken(userID)
        const newToken = await this.istokenExpired(token)
        const response = await fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=medium_term&limit=20&offset=0`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${newToken.access_token}`
            }
        });
        console.log(await response.json())
    }
}

module.exports = new SpotifyService;