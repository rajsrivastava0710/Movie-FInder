let search_name = $('#search');
let search_imdb = $('#search_imdb');
let search_year = $('#search_year');
let movie_text = $('#search-text');
let imdb_text = $('#search-imdb a');
let dropdown = $('#dropdown');

dropdown.on('change',function(){
	if(this.value == 'movie_name'){
		search_imdb.hide();
		search_year.hide();
		search_name.fadeToggle(1000);
	}else if(this.value == 'movie_imdb'){
		search_name.hide();
		search_year.hide();
		search_imdb.fadeToggle(1000);
	}
	else if(this.value == 'movie_year'){
		search_name.hide();
		search_imdb.hide();
		search_year.fadeToggle(1000);
	}
})
