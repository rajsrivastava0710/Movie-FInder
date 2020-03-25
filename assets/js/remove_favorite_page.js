function hideFav(id){
	let btn  = $('button#'+id+' a');
	btn.click(function(e){
		e.preventDefault();
		$.ajax({
		    type: 'get',
		    url: '/movies/'+id+'/add-fav',
		    success: function(data){
		    	console.log(data.data);
		    	$('div#'+id).remove();

		    	new Noty({
						theme:'relax',
						text: "Movie removed from Favorites successfully!",
						type:'success',
						layout:'topCenter',
						timeout: 1500,
					}).show();

		    },error:function(error){
			
				console.log(error.responseText);
			
			}
		})
	})
}