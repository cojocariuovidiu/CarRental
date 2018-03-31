const config = require('./config');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride=require('method-override');
const compress = require('compression');
const passport = require('passport');
const flash =require('connect-flash');

module.exports=function(){
	// Create a new Express application instance
	const app = express();

	
	//Use the 'body-parser' and 'method-override' middleware functions
	app.use(bodyParser.urlencoded({
		extended:true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());



	
	//Configure the 'session' middleware
	app.use(session({
		saveUnintialized:true,
		resave:true,
		secret:config.sessionSecret
	}));


	//Set the application view engine and 'views' folder
	app.set('views','./app/views');
	app.set('view engine','ejs');

	//Configure the flash messages middleware
	app.use(flash());

	//Configure the passport messages middleware

	app.use(passport.initialize());
	app.use(passport.session());



	//Loading the routing files
	require('../app/routes/index.server.routes')(app);
	require('../app/routes/user.server.routes')(app);
	
	//Configure static file serving
	app.use(express.static('./public'));

	//Return the Express application instance
	return app;
};