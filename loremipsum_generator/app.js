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
	
	response.writeHead(200)
	render.showPage('header.html', {}, response);
	render.showPage('form.html', {}, response);
	render.showPage('main.css', {}, response);
	render.showPage('lorem.js', {}, response);
	render.showPage('footer.html', {}, response);
	generate.getPostData(response, request);

}).listen(1337);



