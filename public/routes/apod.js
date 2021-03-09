const https = require('https')

var url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';


module.exports.run_setup = (app) => {
    app.get('/apod', (req, res) => {
		var obj = {};
		let rawData = '';
		let date = req.query.date;
		console.log(date);
		https.get(url+'&date='+date, (response) => {
		    console.log('statusCode:', response.statusCode);
		    response.on('data', (d) => {
				rawData += String.fromCharCode.apply(null, d);
				console.log(rawData + "here");

		    });
		    response.on('end', () => {
		    	console.log(rawData);
				obj = JSON.parse(rawData);
				console.log(obj);
				//res.send(obj);
				res.render('apod', obj);
		    });
		}).on('error', (e) => {
		    console.error(e);
		    obj = {'msg' : 'Sorry, this page is not working'};
		    res.render('error', obj);
		});
    });
    
};



