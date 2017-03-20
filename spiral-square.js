var counter = 0;
var x = 0, y = 0;
var direction = 0;
var layerSize = 0;

var letterWidth, letterHeight;

var characterArray = [];

var numberOfLayers = 210;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background(0);

	textFont('Menlo');
	textAlign(CENTER, CENTER);
	fill('#00f72c');

	letterWidth = Math.round(textWidth(' '));
	letterHeight = 11;
	// letterWidth = 30;
	// letterHeight = 30;

	// console.log(x, y);
	write();
	walk();
	changeDirection();
	layerSize++;
	// console.log("new layer size: " + layerSize);

	for (var l = 0; l < numberOfLayers; l++) {
		for (var d = 0; d < 2; d++) {
			if (d == 1) {
				layerSize++;
				// console.log("new layer size: " + layerSize);
			}
			for (var m = 0; m < layerSize; m++) {
				// console.log(x, y);
				write();
				walk();
				if (m == layerSize - 1) {
					changeDirection();
				}
			}
		}
	}

	// stroke(50);
	// line(0, height / 2, width, height / 2);
	// line(width / 2, 0, width / 2, height);
}

function write() {
	text(str(0), width / 2 + letterWidth * x, height / 2 + letterHeight * y);
	counter++;
}

function walk() {
	switch (direction) {
		case 0:
			y++;
			break;
		case 1:
			x--;
			break;
		case 2:
			y--;
			break;
		case 3:
			x++;
			break;
	}
}

function changeDirection() {
	direction = (direction + 1) % 4;
	// console.log("new direction: " + direction);
}