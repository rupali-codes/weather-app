//creating our own server

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const request = require('postman-request');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
//Second change part 1
const port = process.env.PORT || 3000; //heroku provides process.env.PORT 

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../pages/views');
const partialsPath = path.join(__dirname, '../pages/partials');

app.set('views', viewsPath); //changing default folder name 
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath)); //loading root page

app.get('', (req, res) => {
	res.render('index', {
		title: 'Forecast',
		name: 'Rupali'
	});
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Rupali'
	});
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		phone: '+91 xxxxxx2887',
		email: 'rupali@roops.io',
		name: 'Rupali'
	})
})


//listening event for check weather
app.get('/weather', (req, res) => {
	const address = req.query.address;

	if(!address) {
		return res.send({
			error: 'Please provide a valid address'
		})
	}else{
		geocode(address, (err, {latitude, longitude, location}  = {}) => {
			if(err) {
				return res.send({
					error: 'Geocode Error'
				})
			}else{
				forecast(latitude, longitude, (err, forecastData) => {
					if(err){
						return res.send({
							error: 'Forcast Error'
						})
					}else{
						res.send({
							Location: location,
							Forecast: forecastData
						})
					}
				})
			}
		})	
	}
})

app.get('/products', (req, res) => {
	if(!req.query.search){
		return res.send({
			error: 'You must provide a search term.'
		})
	}

	console.log(req.query);
	res.send({			//sending json as response
		products: []
	});
})


app.get('/help/*', (req, res) => {
	res.render('error', {
		title: 'ERROR'
	})
})

app.get('*', (req, res) => {
	res.render('error', {
		title: 'Error 404'
	})
})

//setting up a port - 3000 (it can be anything else)
app.listen(port, () => {
	console.log(`Sever started at port ${port}`); //Second change part 2
})