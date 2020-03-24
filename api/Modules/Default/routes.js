const express = require('express');

const home = require('./Routes/home');
// const users = require('./Routes/users');
// const auth = require('./Routes/auth');

module.exports = function(app){

    app.use(express.json());
    
    app.use('/', home);

    // app.use('/api/users', users);

    // app.use('/api/auth', auth);
};