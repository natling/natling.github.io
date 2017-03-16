var a = 2;
var b = 0.0007;

var n = 30000;

var e = 2.71828;

var density = 1.0;
var characterArray = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background('#000000');
	frameRate(10);

	textFont('Menlo');
	textAlign(CENTER, CENTER);
	fill('#00f72c');

	for (var i = 0; i < n; i++) {
		if (random() < density) {
			characterArray.push(String.fromCharCode(random(32, 127)));
		} else {
			characterArray.push(' ');
		}
	}
}

function draw() {
	background('#000000');

	for (var i = 0; i < n; i += 3) {
		var x = a * e ** (b * i) * cos(i);
		var y = a * e ** (b * i) * sin(i);

		text(characterArray[i], width / 2 + x, height / 2 + y);
		// text(String.fromCharCode(random(32, 127)), width / 2 + x, height / 2 + y);
	}

	characterArray = arrayRotate(characterArray, 1, true);

	a = randomWalk(a, 0.01, 4, 0.01);
	b = randomWalk(b, 0.0004, 0.001, 0.0001);
}

function arrayRotate(array, distance, direction) {
	for (var i = 0; i < distance; i++) {
		if (direction) {
			array.unshift(array.pop());
		} else {
			array.push(array.shift());
		}
	}
	return array;
}

function randomWalk(start, low, high, step) {
	while (true) {
		var newStart = start + int(random(-(step + 1), (step + 1)));
		if (newStart >= low && newStart <= high) {
			return newStart;
		}
	}
}