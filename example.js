var getArtwork = require('./lib/itunes-artwork');
getArtwork(512505156, "US", function(error, artwork){ // "Bad Ass" https://itunes.apple.com/us/movie/bad-ass/id512505156
	if(!error){
		console.log(artwork);
	} else {
		console.log(error);
	}
})