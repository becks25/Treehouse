//takes in zipcode or postal code from command line
// and returns the forecast for today

//convert zipcode to lat/long
//connect to forecast.io
//ask for weather of specific zip/postal
//return forecast for today



var location = require('./geocode.js');

var apikey = '4ab36d9a0a102bb55ce2d6406ca67c25';

location.geocode(10022);

