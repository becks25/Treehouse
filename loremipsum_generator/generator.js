//get the post data from the user
var querystring = require('querystring');
var http = require('http');
var render = require('./render.js');
var stream = require('stream');

function getPostData(response, request){
	var urlBody = request.url.replace('/', '');
	if(urlBody !== ""){
		var num = /^(\d+)/;
		var splitBody = urlBody.split(num);
		if(splitBody.length === 3){
			var body ={ 
				number: +splitBody[1], 
				typeOfText: splitBody[2]
			}
			getLorem(body,response);
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
		render.showPage('header.html', {}, response);
		render.showPage('form.html', {}, response);
		render.showPage('main.css', {}, response);
		render.showPage('lorem.js', {}, response);
		render.showPage('footer.html', {}, response);
	}

}

function getLorem(body, pageResponse){
	var num = body.number;
	var text = body.typeOfText.toLowerCase();

	var askFor;

	if(text === 'paragraphs'){
		askFor = num;
	}else if(text === 'sentences'){
		askFor = Math.ceil(num/5);
	}else{
		askFor = Math.ceil(num/20);
	}

	var request= http.get('http://www.loripsum.net/api/' + askFor + '/medium/headers/plaintext', function(response){
		if(response.statusCode === 200){
			var body = "";

			response.on('data', function(chunk){
				body+= chunk;
				console.log(body);
			});

			response.on('end', function(){
				try{
					displayOutput(num, text, body, pageResponse);
				}catch(error){
					console.error('asked for wrong thing' + error.message);
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

function displayOutput(num, text, body, response){
	var output = {};
	output.num = num;
	output.text = text;

	var end_sentence = /[\.\?!]/;
	var end_word = /[\.\?! ]/;


	if(text === 'paragraphs'){
		output.body = body;
	}else if(text ==='sentences'){
		output.body = body.split(end_sentence, num).join(".");
	}else{
		output.body = body.split(end_word, num).join(" ");
	}

	try{
		render.showPage('header.html', {}, response);
		render.showPage('loremOutput.html', output, response);
		render.showPage('form.html', {}, response);
		render.showPage('main.css', {}, response);
		render.showPage('lorem.js', {}, response);
		render.showPage('footer.html', {}, response);
		response.end();
}catch(error){
	console.error("here " + error.message);
}
	
}

module.exports.getPostData = getPostData;