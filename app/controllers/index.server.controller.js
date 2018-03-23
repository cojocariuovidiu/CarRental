exports.render=function(req,res){
	

	//If the session's lastVisit property
	if(req.session.lastVisit){
		console.log(req.session.lastVisit);
	}

	//Set the session's 'lastVisit' property
	req.session.lastVisit = new Date();



	//Use the 'respoonse ' object to render the 'index' view with a 'title' property
	res.render('index',{
		title:'Hello World'
	});
};