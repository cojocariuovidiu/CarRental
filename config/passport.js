// Load the module dependencies
const passport= require('passport');
const mongoose=require('mongoose');

// Define the Passport configuration method
module.exports=function(){
	// Load the 'User' model
	const User = mongoose.model('User');

	// Use Passport's 'serializeUser' method to serialize the user id
	passport.serializeUser(function(user,done){
		done(null,user.id);
	});
	// Use Passport's 'deserializeUser' method to load the user document
	passport.deserializeUser(function(id,done){
		User.findOne({
			_id:id
		},'-password-salt',function(err,user){
			done(err,user);
		});
	});


	//Load Passport's strategies configuration files
	require('./strategies/local.js');
	require('./strategies/twitter.js')();
	require('./strategies/facebook.js')();
	require('./strategies/google.js')();
};