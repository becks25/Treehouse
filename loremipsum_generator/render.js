//render the page
var fs = require('fs');

function renderPage(extra, values, response){

	showPage('header.html', {}, response);
	if(extra !== ""){
		showPage(extra, values, response);
	}
	showPage('form.html', {}, response);
	showPage('main.css', {}, response);
	showPage('lorem.js', {}, response);
	showPage('footer.html', {}, response);
	response.end();
}
function showPage(template, values, response){
	var fileContents = fs.readFileSync('./views/' + template, {encoding: 'utf8'});

	fileContents = mergeValues(values, fileContents);
	response.write(fileContents);
}

function mergeValues(values, content){
	for(var key in values){
		content = content.replace("{{" + key + "}}", values[key]);
	}

	return content;
}

module.exports.renderPage = renderPage;