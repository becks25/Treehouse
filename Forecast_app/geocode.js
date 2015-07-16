//convert the zipcode/postal code into location, lat & long

var https = require('https');
var http = require('http');
var weather = require('./weather.js');

function geocode(zipcode){
	var request = https.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + zipcode + '&key=AIzaSyAK5Xo22fBf-TfIclUeN_wl3flKt6mD1DY', function(response){

		if(response.statusCode === 200){
			var body = "";
			var output = [];

			response.on('data', function(chunk){
				body += chunk;
			});

			response.on('end', function(){
				try{
					var parsedBody = JSON.parse(body).results[0];
					output.push(parsedBody.formatted_address);
					output.push(parsedBody.geometry.location.lat);
					output.push(parsedBody.geometry.location.lng);

					weather.get(output);
				}catch(error){
					console.error("Unable to find location. Please enter a valid zipcode.");

				}

			});

			
		}else{
			//status code error
			console.error("Error connecting to the website");
		}

	});

	//connection error
	request.on('error', function(e){
		console.error("Website not found");
	})

}



module.exports.geocode = geocode;