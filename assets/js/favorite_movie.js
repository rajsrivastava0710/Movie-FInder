$('.hide').hide();
function favoriteMovie(fav){
	$('div#circle').addClass('loader');
	$.ajax({
		url:'http://www.omdbapi.com',
		data:{
			apikey: 'e78cbdc4',
			i: fav.id
		},
		method:'GET',
		success: function(data){
			console.log(data);
			$('div#movie-list').append(favMovieDOM(data));
			hideFav(fav.id);
			$('div#circle').removeClass('loader');
		},error:function(error){
		console.log(error.responseText);
		$('div#circle').removeClass('loader');
		}
	})
}

function favMovieDOM(movie){
	return $(`
		<div class='fav-movie-item' id=${movie.imdbID}>
			<img class='lozad' src='${movie.Poster}'>
			<div class='title'>${movie.Title}</div>
			<div><strong>Release Year : </strong>${movie.Year}</div>
			<div><strong>Genre : </strong>${movie.Genre}</div>
			<div><strong>Director : </strong>${movie.Director}</div>
			<div><strong>IMDB Rating : </strong>${movie.imdbRating}</div>
			<div><button id=${movie.imdbID}><a href='/movies/${movie.imdbID}/add-fav'>Unfavorite</a></button></div>
		</div>
		`)
}