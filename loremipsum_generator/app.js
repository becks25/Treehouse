
var http = require('http');
var render = require('./render.js');
var generate = require('./generator.js');

http.createServer(function(request, response){
	response.writeHead(200, '/');
	generate.getPostData(response, request);

}).listen(1337);



