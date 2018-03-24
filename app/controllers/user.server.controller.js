const User = require('mongoose').model('User');

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
	})
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