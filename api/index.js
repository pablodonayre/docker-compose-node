const express = require('express');
const app = express();
const config = require('config');




/**
    Handling errors with "Express Library"
	Requires the error Middleware to be called after the last route
	This moves control from the express route handler to our error middleware
*/
require('express-async-errors');

/**
    Load Module Routes
*/
require('./Modules/Default/routes')(app);


/**
    ERROR Middleware (debe estar despues de todas las rutas y demas Middlewares)
 */
app.use(require('./Middleware/error'));

/**
 *  Sistema de plantillas (habilitandolo por defecto en EXPRESS)
 */
app.set('view engine', 'pug');
app.set('views', './Modules/Default/Views');


async function checkConfigVariables() {
	
    if (!config.get('API_PORT')) {
		throw new Error('FATAL ERROR: API_PORT is not defined.');
	}

	// if (
	// 	!config.get('MONGO_INITDB_ROOT_HOST') ||
	// 	!config.get('MONGO_INITDB_ROOT_PORT') ||
	// 	!config.get('MONGO_INITDB_ROOT_USERNAME') ||
	// 	!config.get('MONGO_INITDB_ROOT_PASSWORD') ||
	// 	!config.get('MONGO_INITDB_ROOT_DB_NAME')
	// ) {
	// 	throw new Error('FATAL ERROR: Database Credentials are not defined.');
	// }

	return true;
}

function connectDatabase() {
	return require('./Library/database')();
}

function listenServer(port = config.get('API_PORT')) {
	app.listen(
		port, () => console.log(`Listening on port ${port}...`)
	);
}

async function main() {
	try {
		await checkConfigVariables();
		//await connectDatabase();
		listenServer(config.get('API_PORT'));
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
}

main();

process.on('uncaughtException', (ex) => {
	console.log('We got an uncaught exception');
	// call winston here
	//process.exit(1);
});

process.on('uncaughtRejection', (ex) => {
	console.log('We got an unhandled rejection');
	// call winston here
	//process.exit(1);
});