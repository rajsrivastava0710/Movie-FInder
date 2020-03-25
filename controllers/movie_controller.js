const User = require('../models/user');

module.exports.favourites = async function(req,res){
	try{
		let activeUser = await User.findById(req.user._id);
		let favs = await activeUser.favorites;
		res.render('favourites',{
			title:'My Favourites',
			favs:favs
		});
	}catch(err){
		console.log(err);
		return;
	}
}

module.exports.addToFavourites = async function(req,res){
	try{

		let currentUser = await User.findById(req.user._id);
		
		let exist = currentUser.favorites.includes(req.params.id);

		let deleted = false;
		if(exist){
			console.log('Removed from favorites');
			currentUser.favorites.pull(req.params.id);
			currentUser.save();
			deleted = true;
		}else{
		currentUser.favorites.push(req.params.id);
		currentUser.save();
		console.log('Favorited');
		}
		if (req.xhr){
                return res.status(200).json({
                    data: {
                        imdb: req.params.id,
                        deleted:deleted
                    },
                    message: "Movie favorite toggled.."
                });
        }
		return res.redirect('/');
	}catch(err){
		console.log(err);
	}
}