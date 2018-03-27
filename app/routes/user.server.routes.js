// Load the module dependencies
const users = require('../../app/controllers/user.server.controller');
const passport = require('passport');

// Define the routes module' method
module.exports=function(app){
	app.route('/users')
	.post(users.create)
	.get(users.list);

	// Set up the 'users' parameterized routes
	app.route('/users/:userId')
		.get(users.read)
		.put(users.update)
		.delete(users.delete);

	app.param('userId',users.userByID);

	app.route('/signup')
	    .get(users.renderSignup)
	    .post(users.signup);

	//Set up the 'signin' routes
	app.route('/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local',{
			successRedirect:'/',
			failureRedirect:'/signin',
			failureFlash:true
		}));

	//Set up the 'signout' route
	app.get('/signout',users.signout);
};