require('dotenv').config()
const express = require('express');
const path = require('path')
const app = express();
const port = 3000;
const AuthRouters = require("./routes/auth.js")
const SpotifyRouters = require("./routes/spotify.js")
const DashboardRouters = require("./routes/dashboard.js")
const session = require('express-session')


app.use(express.static('public'));
app.use(express.urlencoded({extended: true }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 *1000
    }
}))
app.set('view engine', 'ejs')
app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname,'','views','home.html'))
});

app.use('/auth', AuthRouters)
app.use('/spotify',SpotifyRouters)
app.use('/Wavelength', DashboardRouters)


app.listen(port,()=>{
    console.log(`Port ${port} is running!`)
})