const winston = require('winston');


// The Logger Category (functional area)
const CATEGORY = 'Default';

// Logger configuration
const logConfiguration = {
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './Logs/logfile.log' })
    ],
    format: winston.format.combine(
        winston.format.label({
            label: CATEGORY
        }),
        winston.format.timestamp(),
        winston.format.printf((info) => {
            return `${info.timestamp} - ${info.label}:[${info.level}]: ${info.message}`;
        })
    )
};

// Create the logger
const logger = winston.createLogger(logConfiguration);


module.exports = logger;