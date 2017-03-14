var $ = require("jquery");
var interleave = require('loose-interleave');
var Chance = require('chance');
var chance = new Chance();

$.get("files/some imagist poets.txt", function(corpus) {
	callback();
});

function callback() {
	console.log(corpus);
}