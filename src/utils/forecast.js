const request = require('postman-request');

const forecast = (lat, long, callback) => {
	const url = `http://api.weatherstack.com/forecast?access_key=94c46223b6ff44c5336fa7a15e5aed74&query=${lat},${long}&units=f`;

	request({url, json:true}, function(err, {body}){
		if(err){
			callback("Something went wrong.", undefined);
		}else if(body.error){
			callback("Unable to load data", undefined)
		}else{
			const data = body.current;
			callback(undefined, `${data.weather_descriptions[0]}, the current Temperature is ${data.temperature} degrees out and it feels like ${data.feelslike} degrees out`);
		}
	})
}

module.exports = forecast;
