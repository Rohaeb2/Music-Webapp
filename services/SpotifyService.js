const crypto = require('crypto')
const querystring = require('querystring')
require('dotenv').config()

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
    async buildSpotifyData(data){
        const rawData = data
        const authCode = rawData.code
        const accessToken = await this.exchangeCodeforToken(authCode)
        //console.log("the access token is", accessToken) 
        
        
    }
}

module.exports = new SpotifyService;