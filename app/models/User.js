const path = require('path')
require('dotenv').config()


class User{
    constructor(data){
        this.id = data[0].id;
        this.username = data[0].username;
    }
    
}

module.exports = User;