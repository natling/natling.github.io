var links = ['evaluation', 'okc', 'pronouns', 'love', 'why', 'you'];
var strings = ['evaluation', 'okc', 'pronouns', 'things we say around love', 'why', 'you'];

var layerHeight;

var canvas;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);

	layerHeight = height / links.length;

	for (var i = 0; i < strings.length; i++) {
		var link = createDiv("<section class=\"text\"><p><a href=" + links[i] + ">" + strings[i] + "</a></p></section>");
		link.position(0, i * layerHeight);
		link.size(width, layerHeight);
	}
}