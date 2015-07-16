//take in array with location, lat & long.
//connect to forecast.io and check weather
//print out today's weather forecast

//current temp & weather, high and low for the day, chance of rain

var https = require('https');
var http = require('http');

function get(info){
	var location = info[0];
	var lat = info[1];
	var lng = info[2];
	var today = [info[0]];

	var request = https.get('https://api.forecast.io/forecast/4ab36d9a0a102bb55ce2d6406ca67c25/' + lat + "," + lng, function(response){

		if(response.statusCode === 200){
			var body = "";

			response.on('data', function(chunk){
				body += chunk;
			});

			response.on('end', function(){
				try{
					var output = JSON.parse(body);
					var daily = output.daily.data[0];
					today.push(output.currently.temperature,
						 output.currently.summary,
						 daily.temperatureMin,
						 daily.temperatureMax,
						 daily.precipProbability,
						 daily.precipType);
					printWeather(today);

	
					}catch(error){
					console.error("Unable to find weather for that location." + error.message);
				}
			});

		}else{
			console.error("Error connecting to the forecast.io");

		}


	});

	request.on('error', function(e){
		console.error("Forecast.io not found");
	})

}


function printWeather(data){
	console.log("Location: " + data[0]);
	console.log("It is currently " + data[1] + "F and " + data[2] + ", with a high of " + data[3] + " and a low of " + data[4] + ", and a " + data[5] + "% chance of " + data[6] + ".");
}

module.exports.get = get;