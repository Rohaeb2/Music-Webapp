const express = require('express');
const path = require('path')
const app = express();
const port = 3000;
const AuthRouters = require("./routes/auth.js")

app.use(express.static('public'));
app.use(express.urlencoded({extended: true }))

app.get('/',(req,res) =>{
    res.send('Hello World')
});

app.use('/auth', AuthRouters)



app.listen(port,()=>{
    console.log(`Port ${port} is running!`)
})