class Line {

	constructor(length, density, direction, speed) {
		this.length         = length;
		this.density        = density;
		this.direction      = direction;
		this.speed          = speed;
		this.characterArray = Array.from({length: length}, v => {
			if (Math.random() < density) {
				return randomCharacter();
			} else {
				return ' ';
			}
		});
	}

	createPaddedString() {
		var string = this.characterArray.join('');
		var paddedString;

		if (! this.direction) {
			paddedString = string.padStart(columns);
		} else {
			paddedString = string.padEnd(columns);
		}

		return paddedString;
	}

	move() {
		this.characterArray = rotateArray(this.characterArray, this.speed, this.direction);
	}
}

var lines = [];

var speedMinimum = 1;
var speedMaximum = 5;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	frameRate(30);
	background('#000000');

	textFont('Menlo');
	textSize(12);
	textAlign(LEFT, TOP);
	fill('#00f72c');

	columnWidth = Math.round(textWidth(' '));
	rowHeight = 11;

	columns = Math.floor(width / columnWidth);
	rows = Math.floor(height / rowHeight);

	for (var i = 0; i < rows; i++) {
		lines.push(createLine());
	}
}

function draw() {
	background('#000000');

	for (var i = 0; i < rows; i++) {
		text(lines[i].createPaddedString(), 0, i * rowHeight);
		lines[i].move();
	}

	lines.shift();
	lines.push(createLine());
}

function createLine() {
	var length    = randomIntegerInclusive(1, columns);
	var density   = Math.random();
	var direction = Math.random() < 0.5;
	var speed     = randomIntegerInclusive(speedMinimum, speedMaximum);

	return new Line(length, density, direction, speed);
}

function randomCharacter() {
	return String.fromCharCode(randomIntegerInclusive(32, 127));
}

function randomIntegerInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rotateArray(array, n, direction) {
	var rotatedArray = array;

	for (var i = 0; i < n; i++) {
		if (direction) {
			rotatedArray.push(rotatedArray.shift());
		} else {
			rotatedArray.unshift(rotatedArray.pop());
		}
	}

	return rotatedArray;
}