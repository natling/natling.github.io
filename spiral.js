var speed = 10;
var characterArrays = [], rotation = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background('#000000');

	textFont('Menlo');
	textAlign(CENTER, CENTER);
	fill('#00f72c');

	for (var r = 0; r < 100; r++) {
		var n = r * 5;

		var characterArray = [];

		for (var i = 0; i < n; i++) {
			if (random() < 1) {
				characterArray.push(String.fromCharCode(random(32, 127)));
			} else {
				characterArray.push(' ');
			}
		}

		characterArrays.push(characterArray);

		var rotationSpeed = int(random(1, 3));
		var rotationDirection;

		if (random() < 0.5) {
			rotationDirection = true;
		} else {
			rotationDirection = false;
		}

		rotation.push([rotationSpeed, rotationDirection]);
	}
}

function draw() {
	background('#000000');

	for (var r = 0; r < 100; r++) {
		var n = r * 5;
		
		var scale = 10;

		for (var i = 0; i < n; i++) {
			var x = r * scale * cos(TAU / n * i);
			var y = r * scale * sin(TAU / n * i);
			text(characterArrays[r][i], width / 2 + x, height / 2 + y);
		}

		characterArrays[r] = arrayRotate(characterArrays[r], rotation[r][0], rotation[r][1]);
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