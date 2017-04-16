var density = 0.7;
var layers = 100;
var scale;
var characterArrays = [], rotations = [], colors = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background('#000000');

	textFont('Menlo');
	textAlign(CENTER, CENTER);
	// fill('#00f72c');

	scale = 9;

	for (var r = 0; r < layers; r++) {
		var n = r * 5;

		var characterArray = [];

		for (var i = 0; i < n; i++) {
			if (random() < density) {
				characterArray.push(String.fromCharCode(random(32, 127)));
			} else {
				characterArray.push(' ');
			}
		}

		characterArrays.push(characterArray);

		var rotationSpeed = int(random(1, 2));
		var rotationDirection;

		if (random() < 0.5) {
			rotationDirection = true;
		} else {
			rotationDirection = false;
		}

		rotations.push([rotationSpeed, rotationDirection]);

		colors.push(color(random(255), random(255), random(255)));
	}
}

function draw() {
	background('#000000');

	for (var r = 0; r < layers; r++) {
		var n = r * 5;
		
		for (var i = 0; i < n; i++) {
			var x = r * scale * cos(TAU / n * i);
			var y = r * scale * sin(TAU / n * i);

			fill(colors[r]);
			text(characterArrays[r][i], width / 2 + x, height / 2 + y);
		}

		characterArrays[r] = arrayRotate(characterArrays[r], rotations[r][0], rotations[r][1]);
	}
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