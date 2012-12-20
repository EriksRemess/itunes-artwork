var request = require("request");
module.exports = function(iTunesId, callback){
	request({
		method: "GET",
		uri: "http://client-api.itunes.apple.com/WebObjects/MZStorePlatform.woa/wa/lookup?version=1&id=" + iTunesId + "&p=lockup&caller=DI6",
		headers: {
			"X-Apple-Tz": "7200", // Latvian Tz
			"X-Apple-Store-Front": "143519,17" // Latvian Store-Front
		}
	}, function(error, response, body){
		if(!error){
			try{
				var data = JSON.parse(body);
				if(data.results.length === 0 || typeof data.results[iTunesId] === "undefined"){
					callback({
						error: "sorry, did not find anything"
					})
				} else {
					var artwork = data.results[iTunesId].artwork;
					artwork.sort(function(a, b){
						if(a.height > b.height) return -1;
						if(a.height < b.height) return 1;
						return 0;
					});
					callback(null, artwork);
				}
			}
			catch(error){
				callback(error);
			}
		} else {
			callback(error);
		}
	});
}