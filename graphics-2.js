class Line {

	constructor(orientation, position, currentLength, done, character) {
		this.orientation   = orientation;
		this.position      = position;
		this.currentLength = currentLength;
		this.done          = done;
		this.character     = character;
	}

	draw() {
		if (this.orientation) {
			var x1        = this.currentLength;
			var y1        = this.position;
			var x2        = this.currentLength + 1;
			var y2        = y1;
		} else {
			var x1        = this.position;
			var y1        = this.currentLength;
			var x2        = x1;
			var y2        = this.currentLength + 1;
		}

		block(x1, y1, x2, y2, this.character);
	}

	increment() {
		if (this.orientation) {
			var limit = columns;
		} else {
			var limit = rows;
		}

		if (this.currentLength + 1 < limit) {
			this.currentLength++;
		} else {
			this.done = true;
		}
	}
}

var unicodeRange = [parseInt('2580', 16), parseInt('259F', 16)];
var characters = [];

for (var i = unicodeRange[0]; i < unicodeRange[1] + 1; i++) {
	characters.push(String.fromCharCode(i));
}

var numberOfLines = 1000;

var columns, rows, columnWidth, rowHeight, lineArray = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background('#000000');

	textFont('Menlo');
	textAlign(LEFT, TOP);
	textSize(16);
	fill('#00f72c');

	columnWidth = Math.round(textWidth(' '));
	rowHeight = 15;

	columns = Math.floor(width / columnWidth);
	rows = Math.floor(height / rowHeight);

	for (var i = 0; i < numberOfLines; i++) {
		lineArray.push(newLine());
	}
}

function draw() {
	background(0, 10);

	for (var i = 0; i < lineArray.length; i++) {
		if (! lineArray[i].done) {
			lineArray[i].increment();
			lineArray[i].draw();
		} else {
			lineArray.splice(i, 1);
			lineArray.push(newLine());
		}
	}
}

function block(x1, y1, x2, y2, character) {
	for (var j = y1; j < y2 + 1; j++) {
		for (var i = x1; i < x2 + 1; i++) {
			text(character, i * columnWidth, j * rowHeight);
		}
	}
}

function newLine() {
	var orientation = coin(0.5);

	if (orientation) {
		var position = random(rows);
	} else {
		var position = random(columns);
	}

	var character = randomItem(characters);

	return new Line(orientation, position, 0, false, character);
}