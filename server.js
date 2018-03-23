//Configure Files
const ConfigureExpress = require('./config/express');

//Instance of the file

const app = ConfigureExpress();


//Runing on port


app.listen(3000);
	console.log("http://localhost:3000 connected");	
/*app.listen(process.env.PORT||3000,function(){
		console.log("http://localhost:"+process.env.PORT||3000+" connected");	
});*/