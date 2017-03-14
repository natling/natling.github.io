var $ = require("jquery");

var corpus;

$.get("files/some imagist poets.txt", function(data) {
	corpus = data;
	callback();
});

function callback() {
	corpusFormatted = corpus.split();
	console.log(corpusFormatted);
}