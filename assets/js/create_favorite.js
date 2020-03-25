function createFav(imdb){
	let btn = $('#'+imdb);
	btn.click(function(e){
	 e.preventDefault();
	 $.ajax({
	    type: 'get',
	    url: '/movies/'+imdb+'/add-fav',
	    success: function(data){
	    	console.log(data.data);
	    	if(data.data.deleted == true){
	    		$(`button#${imdb} a`).html('Favorite+');
	    		new Noty({
						theme:'relax',
						text: "Movie removed from favorites successfully !",
						type:'success',
						layout:'topCenter',
						timeout: 1500,
					}).show();
	    	}else{
	    		$(`button#${imdb} a`).html('Unfavorite-');
	    		new Noty({
						theme:'relax',
						text: "Movie added to favorites successfully !",
						type:'success',
						layout:'topCenter',
						timeout: 1500,
					}).show();
	    	}

	    },error:function(error){
		
			console.log(error.responseText);
		
		}
	})
	})
}