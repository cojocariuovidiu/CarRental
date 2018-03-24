const users = require('../../app/controllers/user.server.controller');

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


}