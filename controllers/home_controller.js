module.exports.home = async function(req,res){
	try{
	return res.render('home',{
		title:'Movies-OMDB',
	});
	}catch(err){
		console.log('Error',err);
		return res.redirect('/');
	}
}