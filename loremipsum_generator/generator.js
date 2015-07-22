//get the post data from the user
var querystring = require('querystring');
var http = require('http');
var render = require('./render.js');
var stream = require('stream');

function getPostData(response, request){
	var urlBody = request.url.replace('/', '');
	if(urlBody === 'error'){
		render.renderPage('error.html', {}, response);
	}else if(urlBody !== ""){
		var num = /^(\d+)/;
		var splitBody = urlBody.split(num);
		if(splitBody.length === 3){
			var body ={ 
				number: +splitBody[1], 
				typeOfText: splitBody[2]
			}
			getLorem(body,response);
		}else{
			response.writeHead(303, {'location': '/error'});
			response.end();
		}
	}else if(request.method === 'POST'){
		request.on('data', function(postBody){
			var body = querystring.parse(postBody.toString());
			response.writeHead(303, {'location': '/' + body.number + body.typeOfText});
			response.end();

		});

		request.on('error', function(e){
			console.error("this time? " + e.message);
		})
	}else{
		render.renderPage('', {}, response);
	}

}

function getLorem(body, pageResponse){
	var num = body.number;
	var text = body.typeOfText.toLowerCase();
	var err = false;

	var askFor;

	if(Number.isInteger(num) === false){
		err = true;
	}

	if(text.match(/paragraphs?/) !== null){
		askFor = num;
	}else if(text.match(/sentences?/) !== null){
		askFor = Math.ceil(num/5);
	}else if (text.match(/words?/) !== null){
		askFor = Math.ceil(num/20);
	}else{
		err = true;
	}

	if(err === true){
		pageResponse.writeHead(303, {'location': '/error'});
		pageResponse.end();
	}else{
		var request= http.get('http://www.loripsum.net/api/' + askFor + '/medium/headers', function(response){
			if(response.statusCode === 200){
				var body = "";

				response.on('data', function(chunk){
					body+= chunk;

				});

				response.on('end', function(){
					try{
						displayOutput(num, text, body, pageResponse);
					}catch(error){
						console.error('Invalid request: ' + error.message);
					}
				})
			}else{
				console.error("Error connecting to the website");
			}
		})

		request.on('error', function(e){
			console.error("Website not found" + e.message);
		})
	}
}

function displayOutput(num, text, body, response){
	var output = {};
	output.num = num;
	output.text = text;

	var end_sentence = /[\.\?!]/;
	var end_word = /[\.\?! ]/;


	if(text.match(/paragraphs?/) !== null){
		output.body = body;
	}else if(text.match(/sentences?/) !== null){
		output.body = body.split(end_sentence, num).join(".") + ".";
	}else{
		output.body = body.split(end_word, num).join(" ");
	}

	output.body = output.body.replace(/(h\d)/g, 'b');
	try{
		render.renderPage('loremOutput.html', output, response);
	}catch(error){
		console.error("here " + error.message);
	}
	
}


module.exports.getPostData = getPostData;