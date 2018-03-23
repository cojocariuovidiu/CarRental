const express = require('express');
const session = require('express-session');
const config = require('./config');

module.exports=function(){
	const app = express();

	//Set the application view engine and 'views' folder
	app.set('views','./app/views');
	app.set('view engine','ejs');

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