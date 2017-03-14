var $ = require("jquery");
// var fs = require('fs');
// var read = require('read-file');
// var interleave = require('loose-interleave');
// var Chance = require('chance');
// var chance = new Chance();

// var openFile = function(event) {
// 	var input = event.target;
// 	var reader = new FileReader();
// 	reader.onload = function() {
// 		corpus = reader.result;
// 		console.log(reader.result.substring(0, 200));
// 	};
// 	reader.readAsText("files/some imagist poets.txt");
// };

// console.log(corpus);

// var corpus = read.sync('files/some imagist poets.txt');
// console.log(corpus);

// console.log("hue");

// function loadFile(filePath) {
// 	var result = null;
// 	var xmlhttp = new XMLHttpRequest();
// 	xmlhttp.open("GET", filePath, false);
// 	xmlhttp.send();
// 	if (xmlhttp.status == 200) {
// 		result = xmlhttp.responseText;
// 	}
// 	return result;
// }

// loadFile("files/some imagist poets.txt");
var corpus;

$.get("files/some imagist poets.txt", function(data) {
	// corpus = data;
	console.log(data);
});

// console.log(corpus);