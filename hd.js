var $ = require("jquery");
var Chance = require('chance');
var chance = new Chance();
var removePunctuation = require('remove-punctuation');

var corpus;

$.get("files/some imagist poets.txt", function(data) {
	corpus = data;
	callback();
});

function callback() {
	var corpusFormatted = corpus.split('\n');
	corpusFormatted = corpusFormatted.map(function(line) {return line.match(/\S+/g) || []});
	corpusFormatted = corpusFormatted.filter(function(line) {return line.length != 0});
	// corpusFormatted = corpusFormatted.map(function(line) {return line.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")});
	corpusFormatted = corpusFormatted.map(function(line) {return removePunctuation(line)});
	console.log(corpusFormatted);

	var line = chance.pickone(corpusFormatted);
	console.log(line);
}