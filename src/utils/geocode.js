const request = require('postman-request');

// //callback functions, making httos request using callback functions
const geocode = (address, callback) => {
	//making request
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicnVwYWxpMTgwODIwMDMiLCJhIjoiY2t2ZGZpZXdtMGYwcDJubjN2ZzEwNzdxdyJ9.mEZKj1sF3JbMFSLW5SoKng&limit=1`;

	request({url, json:true}, (err, {body}) => {
		if(err) {
			callback('Unable to connect to locaton services.', undefined)
		}else if(body.features.length === 0){
			callback('Unable to find location', undefined)
		}else{
			const data = {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			}
			callback(undefined, data)
		}
	})
}

module.exports = geocode;