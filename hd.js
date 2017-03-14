var $ = require("jquery");

var corpus;

$.get("files/some imagist poets.txt", function(data) {
	corpus = data;
	callback();
	// console.log(corpus);
});

function callback() {
	corpus = corpus.substring(0, 200);
	console.log(corpus);
}