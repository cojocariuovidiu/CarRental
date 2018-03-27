//Loao the Mongoose module and Schema object
const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;


//Define a new 'UserSchema'
const UserSchema = new Schema({
	firstName:String,
	lastName:String,
	email:{
		type:String,
		//set an email index
		index:true,
		//Validate the email format
		match:/.+\@.+\..+/
	},
	username:{
		type:String,
		//Trim the 'username' field
		trim:true,
		//Set a unique 'username' index
		unique:true,
		//Validate 'username' value existance
		required:true
	},
	password:{
		type:String,
		//Validate the 'password' value length
		validate:[
		(password)=>password.length>=6,'password should be longer'
		]
	},
	salt:{
		type:String
	},
	provider:{
		type:String,
		// Validate 'provider' value existance
		required:'Provider is required'
	},
	providerId:String,
	providerData:{},
	created:{
		type:Date,
		//Create a default 'created' value
		default:Date.now
	},

	website:{
		type:String,
		//Use a setter property to validate protocol existance in 'website' field
		set:function(url){
			if(!url)
			{

				return url;
			}else{
				if(url.indexOf('http://')!==0 && url.indexOf('https://'!==0)){
					url = 'http://'+ url;
				}
			}

			return url;
		}
	},
	role:{
		type:String,
		//Validate the 'role' value using enum list
		enum:['Admin','Owner','User']
	 },
	 created:{
	 	type:Date,
	 	//Create a default 'created' value
	 	default:Date.now
	 }
});


//Set the 'fullname' virtual property
UserSchema.virtual('fullName').get(function(){
	return this.firstName+' '+this.lastName;
}).set(function(fullName){
	var splitName = fullName.split(' ');
	this.firstName=splitName[0]||'';
	this.lastName = splitName[1]||'';
});

//Use a pre-save middleware to hash the password
UserSchema.pre('save',function(next){
	if(this.password){
		this.salt=new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});
//Create an instance method for hashing a password
UserSchema.methods.hashPassword = function(password){
	return crypto.pdkdf2Sync(password,salt,10000,64).toString('base64');
};

// Create an instance method for authenticating user
UserSchema.methods.authenticate=function(password){
	return this.password ===this.hashPassword(password);
};
//Create the 'findOneByUsername' static method
UserSchema.statics.findOneByUsername=function(){
		// Add a 'username' suffix
		const possibleUsername = username +(suffix||'');


	this.findOne({
		username: possibleUsername
	},function(err,user){
		if(!err){

			if(!user){
				callback(possibleUsername);
			}else{
				return this.findUniqueUsername(username,(suffix||0)+1,callback);
			}
		}
		else{
				callback(null);
			}
	});
};

//Configure the 'UserSchema' to use getters and virtual when transforming to JSON
UserSchema.set('toJSON',{
	getters:true,
	virtuals:true
});

//Create the 'User' model out of the 'UserSchema'
mongoose.model('User',UserSchema);