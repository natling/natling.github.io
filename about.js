var strings = [ "natalie braginsky" ];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);

	fill(255);
	textFont("Menlo");
	text(strings[0], random(width), random(height));
}