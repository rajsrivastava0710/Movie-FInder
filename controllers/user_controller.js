const User = require('../models/user');

module.exports.signup = async function(req,res){
	try{
		if(req.isAuthenticated()){
			return res.redirect('/');
		}
		return res.render('signup',{
			title:'SignUp'
		})
	}catch(err){
		console.log('error in rendering signup page',err);
	}
}

module.exports.login = async function(req,res){
	try{
		if(req.isAuthenticated()){
			return res.redirect('/');
		}
		return res.render('login',{
			title:'Login'
		})
	}catch(err){
		console.log('error in rendering login page',err);
	}
}

module.exports.createUser = async function(req,res){
	try{
		if(req.body.confirm_password != req.body.password){
			req.flash('error','Passwords do not match !');
			console.log('Passwords dont match...');
			return res.redirect('/user/signup');
		}
		await User.create(req.body);
		req.flash('success','User signed up successfully !');
		return res.redirect('/');
	}catch(err){
		console.log('error in creating user',err);
		req.flash('error','Error in creating User !');
	}
}

// signin and create session for user
module.exports.createSession = function(req,res){
	try{
	req.flash('success','Logged in successfully !');
	return res.redirect('/');
	}catch(err){
		req.flash('error','Error while signing in..');
		return;
	}
}

module.exports.removeSession = function(req,res){
	try{
	if(req.isAuthenticated()){
		req.logout();
	}
	req.flash('success','Logged out successfully..');
	// res.clearCookie('datamonk_user');
	return res.redirect('/');
	}catch(err){
		req.flash('error','Error while logging out ....');
		return;
	}
}
