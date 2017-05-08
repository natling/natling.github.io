var speed = 10;
var consistency, density, xCoefficient, yCoefficient, direction;
var columns, rows, columnWidth, rowHeight, characterArray = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background('#000000');

	textFont('Menlo');
	textAlign(LEFT, TOP);
	fill('#00f72c');

	columnWidth = Math.round(textWidth(' '));
	rowHeight = 11;

	columns = Math.floor(width / columnWidth);
	rows = Math.floor(height / rowHeight);

	// consistency  = 0.07;
	// density      = 0.6;
	// xCoefficient = 1.5;
	// yCoefficient = 1.5;
	// direction    = false;

	consistency  = random(0.01, 0.1);
	density      = random(0.1, 1.0);
	xCoefficient = random(1.0, 1.7);
	yCoefficient = random(1.0, 1.7);
	direction    = random() < 0.5;

	console.log('consistency ' + consistency);
	console.log('density ' + density);
	console.log('xCoefficient ' + xCoefficient);
	console.log('yCoefficient ' + yCoefficient);
	console.log('direction ' + direction);

	currentCharacter = randomCharacter(density);

	for (var i = 0; i < columns * rows; i++) {
		characterArray.push(currentCharacter);
		if (random() < consistency) {
			currentCharacter = randomCharacter(density);
		}
	}
}

function draw() {
	background('#000000');

	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < columns; i++) {
			text(characterArray[Math.round(i ** xCoefficient + j ** yCoefficient) % characterArray.length], i * columnWidth, j * rowHeight);
		}
	}

	characterArray = arrayRotate(characterArray, speed, direction);
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

function randomCharacter(p) {
	if (random() < p) {
		return String.fromCharCode(random(32, 127));
	} else {
		return ' ';
	}
}