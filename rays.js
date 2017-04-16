var white = 1;
var black = 5;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background(0);
	frameRate(100);
}

function draw() {

	for (var i = 0; i < white; i++) {
		stroke(255);
		line(0, 0, random(width), random(height));
	}

	for (var i = 0; i < black; i++) {
		stroke(0);
		line(random(width), random(height), width, height);
	}
}