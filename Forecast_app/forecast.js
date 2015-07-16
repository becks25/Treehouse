//takes in zipcode or postal code from command line
// and returns the forecast for today


//connect to forecast.io
//ask for weather of specific zip/postal
//geocode lat and lon
//return forecast for today

//https://api.forecast.io/forecast/apikey/lat,long

//google: AIzaSyAK5Xo22fBf-TfIclUeN_wl3flKt6mD1DY


var location = require('./geocode.js');

var apikey = '4ab36d9a0a102bb55ce2d6406ca67c25';

location.geocode(10022);

