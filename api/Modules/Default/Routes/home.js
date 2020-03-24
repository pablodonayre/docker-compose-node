const express = require('express');
const router = express.Router();

const pug = require('pug');


router.get('/', (req, res) => {
    
    console.log('Home route=', __dirname);
    
    res.render('index', {
        title: 'API', 
        message: 'Server Running'
    });

});


router.get('/token', (req, res) => {
    
    let timestamp = Date.now();

    console.log(`Go to your web browser: localhost/token [${timestamp}]`);
    
    data = {
        timestamp: timestamp,
        token: "asdfgfasddddss"
    };

    res.send(data);

});

module.exports = router;
