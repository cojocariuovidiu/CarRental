const config = require('./config');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride=require('method-override');
const compress = require('compression');

module.exports=function(){
	const app = express();

	//Set the application view engine and 'views' folder
	app.set('views','./app/views');
	app.set('view engine','ejs');

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

	//set routes
	require('../app/routes/index.server.routes')(app);

	return app;
};