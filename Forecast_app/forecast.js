//takes in zipcode or postal code from command line
// and returns the forecast for today

//convert zipcode to lat/long
//connect to forecast.io
//ask for weather of specific zip/postal
//return forecast for today



var location = require('./geocode.js');

var input = process.argv.slice(2);

input.forEach(location.geocode);

