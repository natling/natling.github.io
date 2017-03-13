// var fs = require('fs');
var read = require('read-file');
var interleave = require('loose-interleave');
var Chance = require('chance');
var chance = new Chance();

// var openFile = function(event) {
// 	var input = event.target;
// 	var reader = new FileReader();
// 	reader.onload = function() {
// 		corpus = reader.result;
// 	}
// 	reader.readAsText("files/some imagist poets.txt");
// }

// console.log(corpus);

var corpus = read.sync('files/some imagist poets.txt');
console.log(corpus);