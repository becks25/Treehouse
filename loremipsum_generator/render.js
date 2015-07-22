//render the page
var fs = require('fs');

function loadPage(response){
	// var css = fs.readFileSync('./views/main.css');
	// var header = fs.readFileSync('./views/header.html');
	// var output = fs.readFileSync('./views/loremOutput.html');
	// var form = fs.readFileSync('./views/form.html');
	// var footer = fs.readFileSync('./views/footer.html');
	// var js = fs.readFileSync('./views/lorem.js');

	// response.write(header);

	// response.write(output);
	// response.write(form);
	// response.write(css);
	// response.write(js);
	// response.write(footer);

	showPage('header.html', {}, response);
	showPage('form.html', {}, response);
	showPage('main.css', {}, response);
	showPage('lorem.js', {}, response);
	showPage('footer.html', {}, response);

	
}

function showPage(template, values, response){
	var fileContents = fs.readFileSync('./views/' + template, {encoding: 'utf8'});

	fileContents = mergeValues(values, fileContents);

	response.write(fileContents);
}

function mergeValues(values, content){
	for(var key in values){
		content = content.replace("{{" + key + "}}", values[key]);
		console.log(content);
	}

	return content;
}

module.exports.showPage = showPage;