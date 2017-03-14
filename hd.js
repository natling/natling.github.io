var $ = require("jquery");

$.get("files/some imagist poets.txt", function(data) {
	var corpus = data;
	console.log(corpus);
});