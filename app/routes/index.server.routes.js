const index = require('../controllers/index.server.controller');

module.exports=function(app){
	//Mount the 'index' Controller's render function
	app.get('/',index.render);
};