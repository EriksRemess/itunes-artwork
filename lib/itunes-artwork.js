var request = require("request")
	, storefronts = require('./storefronts');
module.exports = function(iTunesId, storefront, callback){
	var storefrontId = (storefronts[storefront] || 143441); // US storefront by default
	request({
		method: "GET",
		uri: "http://client-api.itunes.apple.com/WebObjects/MZStorePlatform.woa/wa/lookup?version=1&id=" + iTunesId + "&p=lockup&caller=DI6&storefront=" + storefrontId,
		headers: {
			"X-Apple-Store-Front": storefrontId
		}
	}, function(error, response, body){
		if(!error){
			try{
				var data = JSON.parse(body);
				if(data.results.length === 0 || typeof data.results[iTunesId] === "undefined"){
					callback({
						error: "sorry, this iTunesId doesn't exist in this store"
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