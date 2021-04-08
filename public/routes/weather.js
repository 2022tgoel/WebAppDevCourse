var url = 'https://api.weather.gov/points/'

var testurl = 'https://api.weather.gov/gridpoints/LWX/89,68/forecast/hourly'

const https = require('https')

module.exports.run_setup = (app) => {
	app.get('/weather', [func00, func01, func02, func03]);
}

function generalError(res){
	obj = {'msg' : 'Sorry, we could not fetch the weather data'};
	res.render('error', obj);
}

function func00 (req, res, next) {
	if (isNaN(req.query.lat) || isNaN(req.query.long)){
		obj = {'msg' : 'your request failed because we need a valid (numerical) latitude and longitude'};
	    res.render('error', obj);
	    return;
	}
	console.log(Number.isNaN(req.query.lat));
	console.log(req.query.lat);
	next();
	
}

function func01 (req, res, next) {
	var rawData = "";
	var options = { headers : { 'User-Agent' : 'request' } } ;
	https.get(url+req.query.lat+','+req.query.long, options, (response) => {
	    console.log('statusCode:', response.statusCode);
	    response.on('data', (d) => {
			rawData += String.fromCharCode.apply(null, d);
	    });
	    response.on('end', () => {
	    	obj = JSON.parse(rawData);
	    	if (obj == undefined || obj['properties']==undefined) {
	    		generalError(res);
	    	}
	    	else {
	    		req.weather_url = obj['properties']['forecastHourly'];
				next();
			}
	    });
	}).on('error', (e) => {
	    console.error(e);
	    generalError(res);
	});
}

function func02 (req, res, next) {
	var rawData = "";
	var options = { headers : { 'User-Agent' : 'request' } } ;
	https.get(req.weather_url, options, (response) => {
	    console.log('statusCode:', response.statusCode);
	    response.on('data', (d) => {
			rawData += String.fromCharCode.apply(null, d);
	    });
	    response.on('end', () => {
	    	obj = JSON.parse(rawData);
	    	req.forecastData = obj['properties'];
	    	next();
	    });
	}).on('error', (e) => {
	    console.error(e);
	    obj = {'msg' : 'Sorry, we could not fetch the weather data'};
	    res.render('error', obj);
	});
}

function func03 (req, res, next) {
	res.render('weather', req.forecastData)
}
