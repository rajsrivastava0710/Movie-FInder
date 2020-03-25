
let search = $('#search');
let search_imdb_bar = $('#search_imdb');
let search_year_bar = $('#search_year');
let id=null;

search.on('keyup',function(){
	commonEvent(search,fetchMovieByName)
});

search_imdb_bar.on('keyup',function(){
	commonEvent(search_imdb_bar,fetchMovieByIMDB)
});

search_year_bar.on('keyup',function(){
	commonEvent(search_year_bar,fetchMovieByYear)
});

function fetchMovieByIMDB(){

$('div#circle').show();
	$('div#circle').addClass('loader');
	
	$.ajax({
		url:'http://www.omdbapi.com',
		data:{
			apikey: 'e78cbdc4',
			i: search_imdb_bar.val()
		},
		method:'GET',
		success: function(data){
			console.log(data);

			let msg = search_imdb_bar.val();
			if(msg){

			if(data.Response && data.Response == 'False'){
				console.log('entered');
				$('main').append($(`<div id='message'>No such movie Found..</div>`));
				$('div#circle').removeClass('loader');
				return;
			}else{
				$('main div#movie-list').append(searchIMDBDom(data));
				createFav(data['imdbID']);

			$('div#circle').removeClass('loader');
			}
		}
	},error:function(error){
		console.log(error.responseText);
		$('main').append($(`<div id='message'>No such movie Found..</div>`));
		$('div#circle').removeClass('loader');
		return;
	}
})

}

function fetchMovieByName(){
	$('div#circle').show();
	$('div#circle').addClass('loader');
	
	$.ajax({
		url:'http://www.omdbapi.com',
		data:{
			apikey: 'e78cbdc4',
			// apikey: env.apikey,
			s: search.val()
		},
		method:'GET',
		success: function(data){
			console.log(data.Search);

			let msg = search.val();
			if(search.val()){

			if(!data.Search){
				$('main').append($(`<div id='message'>No such movie Found..</div>`));
				$('div#circle').removeClass('loader');
				return;
			}else{
			data.Search.forEach(function(arr,index){
				$('main div#movie-list').append(searchDom(arr));
				createFav(arr['imdbID']);

			})
			$('div#circle').removeClass('loader');
			}
		}
	},error:function(error){
		console.log(error.responseText);
		$('main').append($(`<div id='message'>No such movie Found..</div>`));
		$('div#circle').removeClass('loader');
		return;
	}
})
	// $('div#circle').removeClass('loader');
}

function fetchMovieByYear(){
	$('div#circle').show();
	$('div#circle').addClass('loader');
	
	$.ajax({
		url:'http://www.omdbapi.com',
		data:{
			apikey: 'e78cbdc4',
			y: search_year_bar.val().split('+')[0],
			s: search_year_bar.val().split('+')[1]
		},
		method:'GET',
		success: function(data){
			console.log(data);

			let msg = search_year_bar.val();
			if(msg){

			if(!data.Search){
				$('main').append($(`<div id='message'>No such movie Found..</div>`));
				$('div#circle').removeClass('loader');
				return;
			}else{
			data.Search.forEach(function(arr,index){
				$('main div#movie-list').append(searchDom(arr));
				createFav(arr['imdbID']);

			})
			$('div#circle').removeClass('loader');
			}
		}
	},error:function(error){
		console.log(error.responseText);
		$('main').append($(`<div id='message'>No such movie Found..</div>`));
		$('div#circle').removeClass('loader');
		return;
	}
})
}

function searchDom(arr){
	return $(`
		<div class='movie-item'>
			<div><img class='lozad' src='${arr['Poster']}'></div>
			<div class='name-year'>${arr['Title']} (${arr['Year']})</div>
			<div><button id=${arr['imdbID']}><a href='/movies/${arr['imdbID']}/add-fav'>Toggle Favorite !</a></button></div>
		</div>
		`)
}

function searchIMDBDom(arr){
	return $(`
		<div class='movie-left'>
			<div><img class='lozad' src='${arr['Poster']}'></div>
			<div class='movie-name'>${arr['Title']}</div>
			<div><button id=${arr['imdbID']}><a href='/movies/${arr['imdbID']}/add-fav'>Toggle Favorite !</a></button></div>
		</div>
		<div class='movie-right'>
			<div>${arr['Plot']}</div>
			<div><strong>Actors</strong> : ${arr['Actors']}</div>
			<div><strong>Release Date</strong> : ${arr['Released']}</div>
			<div><strong>Duration</strong> : ${arr['Runtime']}</div>
			<div><strong>IMDB Rating</strong> : ${arr['imdbRating']}</div>
			<div><strong>Box Office Collection</strong> : ${arr['BoxOffice']}</div>
		</div>
		`)
}

function commonEvent(search_bar,functionName){
	$('main div#message').remove();
	$('main div#movie-list>div').remove();
	// e.preventDefault();
	clearTimeout(id);
	if(search_bar.val()){
	id = setTimeout(functionName,2000);
	}else{
	$('div#circle').removeClass('loader');
	$('main').append($(`<div id='message'>Search for your favourite movie using above search bar !</div>`));
	}
}