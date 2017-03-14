var $ = require('jquery');
var _ = require('lodash');
var removePunctuation = require('remove-punctuation');
var Chance = require('chance');
var chance = new Chance();

var corpus;

$.get("files/some imagist poets.txt", function(data) {
	corpus = data;
	callback();
});

function callback() {
	var corpusFormatted = corpus.split('\n');
	corpusFormatted = corpusFormatted.map(function(line) {return line.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")});
	corpusFormatted = corpusFormatted.map(function(line) {return line.match(/\S+/g) || []});
	corpusFormatted = corpusFormatted.filter(function(line) {return line.length != 0});
	corpusFormatted = corpusFormatted.filter(function(line) {return  !(/[A-Z]/.test(line.slice(-1)[0].slice(-1)[0]))});
	corpusFormatted = corpusFormatted.map(function(line) {return line.map(function(word) {return word.toLowerCase()})})

	// console.log(corpusFormatted);

	function poem(
		numberOfInputLinesLow = 2,
		numberOfInputLinesHigh = 4,
		probabilitySpace = 10,
		probabilityNewLine = 5,
		probabilityNewStanza = 1
	) {
		var numberOfInputLines = chance.integer({min: numberOfInputLinesLow, max: numberOfInputLinesHigh});

		var words = Array.from({length: numberOfInputLines}, v => chance.pickone(corpusFormatted));
	}
}