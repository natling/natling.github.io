class Stream {

	constructor(column, direction, speed, character) {
		this.column    = column;
		this.direction = direction;
		this.speed     = speed;
		this.character = character;
	}

	move() {
		if (this.direction) {
			this.column -= this.speed;
			if (this.column < 0) {
				this.column = 0;
				this.bounce();
			}
		} else {
			this.column += this.speed;
			if (this.column > columns - 1) {
				this.column = columns - 1;
				this.bounce();
			}
		}
	}

	bounce() {
		this.direction = ! this.direction;
		this.speed = int(random(1, maximumSpeed));
		this.changeCharacter();
	}

	changeCharacter() {
		this.character = randomCharacter();
	}
}

numberOfStreams = 10;
maximumSpeed = 5;

streamsArray = [], lineArray = [];

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
		lineArray.push(emptyLine(columns));
	}

	for (var i = 0; i < numberOfStreams; i++) {
		var column    = int(random(0, columns - 1));
		var direction = random() < 0.5;
		var speed     = int(random(1, maximumSpeed));
		var character = randomCharacter();

		newStream = new Stream(column, direction, speed, character);

		streamsArray.push(newStream);
	}
}

function draw() {
	background('#000000');

	for (var i = 0; i < rows; i++) {
		text(lineArray[i].join(''), 0, i * rowHeight);
	}

	var newLine = emptyLine(columns);

	for (var i = 0; i < numberOfStreams; i++) {
		newLine[streamsArray[i].column] = streamsArray[i].character;
		streamsArray[i].move();
	}

	lineArray.shift();
	lineArray.push(newLine);
}

function emptyLine(width) {
	var line = new Array(width);
	line.fill(' ');
	return line;
}

function randomCharacter() {
	return String.fromCharCode(random(32, 127))
}