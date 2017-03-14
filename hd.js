var $ = require("jquery");

$.get("files/some imagist poets.txt", function(data) {
	var corpus = data;
	callback();
	// console.log(corpus);
});

function callback() {
	console.log("hue");
}