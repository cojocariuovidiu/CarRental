//Load the module dependencies
const User = require('mongoose').model('User');
const passport = require('passport');

//Create a new error handling controller method
exports.create=function(req,res,next){

	const user = new User(req.body);
	//user the 'User instance's  'save' method
	user.save(function(err){
		if(err){
			//Call the next middleware with an error message
			return next(err);
		}
		else{
			res.json(user);
		}
	});
};

//create a new 'list' controller method

exports.list=function(req,res,next){
//User the 'User' static 'find' method tto retrieve the list of users
	User.find({},function(err,users){
		if(err){
			return next(err);
		}
		else{
			res.json(users);
		}
	});
};

exports.read=function(req,res){
	res.json(user);
};

exports.update=function(req,res,next){

	User.findByIdAndUpdate(req.user.id,req.body,function(err,user){
		if(err){

			return next(err);
		}
		else{
			res.json(user);
		}
	});
};

exports.delete=function(req,res,next){

	req.user.remove(function(err){
		if(err){
			return next(err);
		}
		else{
			res.json(req.user);
		}
	});
};


exports.userByID=function(req,res,next,id){
//Use the 'User' static 'findOne' method to retrieve a specific user
	User.findOne({
		_id:id
	},function(err,user){
		if(err){
			return next(err);
		}
		else{
			req.user=user;
			next();
		}
	});	
};

// Create a new error handling controller method
const getErrorMessage = function(err){// If a unique index error occurs set the message error
	// Define the error message variable
	
	const message='';

	if(err.code){
		switch (err.code) {
			// If a unique index error occurs set the message error
			case 11000:
			case 11001:
				message='Username already exists'
				break;
				// If a general error occurs set the message error
			default:
				message='Something went wrong';
			
		}
	}else{

		// Grab the first error message from a list of possible errors
		for(const errName in err.errors){
			if(err.errors[errName].message)
				message=err.errors[errName].message;
		}
	}

	return message;
};

//Create a new controller method that renders the signin page
exports.renderSignin = function(req, res, next) {
	// If user is not connected render the signin page, otherwise redirect the user back to the main application page
	if (!req.user) {
		// Use the 'response' object to render the signin page
		res.render('signin', {
			// Set the page title variable
			title: 'Sign-in Form',
			// Set the flash message variable
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/');
	}
};

// Create a new controller method that renders the signup page
exports.renderSignup = function(req, res, next) {
	// If user is not connected render the signup page, otherwise redirect the user back to the main application page
	if (!req.user) {
		// Use the 'response' object to render the signup page
		res.render('signup', {
			// Set the page title variable
			title: 'Sign-up Form',
			// Set the flash message variable
			messages: req.flash('error')
		});
	} else {
		return res.redirect('/');
	}
};


// Create a new controller method that creates new 'regular' users
exports.signup = function(req, res, next) {
	// If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
	if (!req.user) {
		// Create a new 'User' model instance
		const user = new User(req.body);
		const message = null;

		// Set the user provider property
		user.provider = 'local';

		// Try saving the new user document
		user.save((err) => {
			// If an error occurs, use flash messages to report the error
			if (err) {
				// Use the error handling method to get the error message
				const message = getErrorMessage(err);

				// Set the flash messages
				req.flash('error', message);

				// Redirect the user back to the signup page
				return res.redirect('/signup');
			}

			// If the user was created successfully use the Passport 'login' method to login
			req.login(user, (err) => {
				// If a login error occurs move to the next middleware
				if (err) return next(err);

				// Redirect the user back to the main application page
				return res.redirect('/');
			});
		});
	} else {
		return res.redirect('/');
	}
};

//Create a new controller method for signing out
exports.signout = function(req, res) {
	// Use the Passport 'logout' method to logout
	req.logout();

	// Redirect the user back to the main application page
	res.redirect('/');
};