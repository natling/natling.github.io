var canvas;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	// canvas.parent('container');
	canvas.background(0);

	var text = createDiv("Here is some text and <a href='http://i.imgur.com/WXaUlrK.gif'>this is an HTML link</a>!");
	text.position(100, 100);
}