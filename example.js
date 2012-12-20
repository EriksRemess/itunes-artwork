var getArtwork = require('itunes-artwork');
getArtwork(512505156, function(error, artwork){ // "Bad Ass" https://itunes.apple.com/lv/movie/bad-ass/id512505156
	if(!error){
		console.log(artwork);
	} else {
		console.log(error);
	}
})