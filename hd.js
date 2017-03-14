var $ = require("jquery");
var Chance = require('chance');
var chance = new Chance();

var corpus;

$.get("files/some imagist poets.txt", function(data) {
	corpus = data;
	callback();
});

function callback() {
	var corpusFormatted = corpus.split('\n');
	newCorpusFormatted = corpusFormatted.filter(function(value) {return value});
	console.log(newCorpusFormatted);

	var line = chance.pickone(corpusFormatted);
	console.log(line);
}