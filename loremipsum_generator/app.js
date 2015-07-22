/*
	1. Connect to server
	2. Render page
	3. receive info from user
	4. connect to lorem ipsum api
	5. generate lorem ipsum/ render page again


*/

var http = require('http');
var render = require('./render.js');
var generate = require('./generator.js');

http.createServer(function(request, response){
	
	response.writeHead(200, '/');



	generate.getPostData(response, request);

}).listen(1337);



