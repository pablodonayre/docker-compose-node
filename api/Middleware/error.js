//const winston = require('winston');
const logger = require('../Library/logger');

module.exports = function(err, req, res, next){

    logger.error(err.message);
    
    /***
     *  winston.error(err.message, err);
     * 
     * Logging level
        error
        warn
        info
        verbose
        debug
        silly
     */
    

    res.status(500).send({'msg': 'Error Middleware: Something failed in the Server'});

};


