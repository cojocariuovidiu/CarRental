const config = require('./config');
const mongoose = require('mongoose');

module.exports=function(){
	//Use the Mongoose to connect to MongoDB
	const db = mongoose.connect(config.db);

	//Load the 'User' model
	require('../app/models/user.server.model');

	//Return the Mongoose connection instance
	return db;
};