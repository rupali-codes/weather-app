const request = require('postman-request');

const forecast = (lat, long, callback) => {
	const url = `http://api.weatherstack.com/forecast?access_key=94c46223b6ff44c5336fa7a15e5aed74&query=${lat},${long}&units=f`;

	request({url, json:true}, function(err, {body}){
		if(err){
			callback("Something went wrong.", undefined, undefined);
		}else if(body.error){
			callback("Unable to load data", undefined, undefined);
		}else{
			const data = body.current;
			const current = (data.temperature - 32) * 5/9;
			const feelsLike = (data.feelslike - 32) * 5/9;
			callback(undefined, `${data.weather_descriptions[0]}, the current Temperature is ${current.toFixed(2)} degree celsius out and it feels like ${feelsLike.toFixed(2)} degree celsius out.`,data.observation_time);
		}
	})
}

module.exports = forecast;
