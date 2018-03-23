const express = require('express');

module.exports=function(){
	const app = express();

	//Set the application view engine and 'views' folder
	app.set('views','./app/views');
	app.set('view engine','ejs');

	//set routes
	require('../app/routes/index.server.routes')(app);

	return app;
};