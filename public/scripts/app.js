const forecast = document.querySelector('.forecast');
const loc = document.querySelector('.loc');
const search = document.querySelector('#search');
const address = document.querySelector('#address');
const Displayata = document.querySelector('.data');
const err = document.querySelector('.err');
const loading = document.querySelector('.loading');
const observationTime = document.querySelector('.observation-time');

/*
 * http://localhost:3000/weather?address=${adrs} - when running locally
 * /weather?address=${adrs} - when hosting on heroku
*/

const getForecast = (adrs) => {
	fetch(`/weather?address=${adrs}`)  //Third change
	.then(res => res.json())
	.then(data => {
		if(data.error){
			throw Error("Invalid location");
		}
		else{
			forecast.textContent = data.Forecast;
			loc.textContent = data.Location;
			observationTime.textContent = data.ObservationTime; 
			err.style.display = 'none';
			loading.style.display = 'none';
			Displayata.style.display = 'block';
		}		
	})
	.catch(error => {
		err.style.display = 'block';
		Displayata.style.display = 'none';
		loading.style.display = 'none';
	})
}


search.addEventListener('click', (e) => {
	e.preventDefault();
	loading.style.display = 'block';
	err.style.display = 'none';
	getForecast(address.value);
	address.value = '';
})