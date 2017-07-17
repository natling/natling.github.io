class Snake {

	constructor(column, row, speedX, speedY, character) {
		this.column    = column;
		this.row       = row;
		this.speedX    = speedX;
		this.speedY    = speedY;
		this.character = character;
	}

	display() {
		text(this.character, this.column * columnWidth, this.row * rowHeight);
	}

	move() {
		this.column += this.speedX;
		this.row    += this.speedY;

		if (this.column < 0) {
			this.column = 0;
			this.bounce();
		}

		if (this.column > columns - 1) {
			this.column = columns - 1;
			this.bounce();
		}

		if (this.row < 0) {
			this.row = 0;
			this.bounce();
		}

		if (this.row > rows - 1) {
			this.row = rows - 1;
			this.bounce();
		}
	}

	bounce() {
		this.speedX = randomSpeed();
		this.speedY = randomSpeed();
		this.changeCharacter();
	}

	changeCharacter() {
		this.character = randomCharacter();
	}
}

var numberOfSnakes = 20;
var maximumSpeed = 3;

var snakes = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	frameRate(30);
	background('#000000');

	textFont('Menlo');
	textAlign(LEFT, TOP);
	textSize(12);
	fill('#00f72c');

	columnWidth = Math.round(textWidth(' '));
	rowHeight = 11;

	columns = Math.floor(width / columnWidth);
	rows = Math.floor(height / rowHeight);

	for (var i = 0; i < numberOfSnakes; i++) {
		var column    = randomIntegerInclusive(0, columns - 1);
		var row       = randomIntegerInclusive(0, rows - 1);
		var speedX    = randomSpeed();
		var speedY    = randomSpeed();
		var character = randomCharacter();

		snakes.push(new Snake(column, row, speedX, speedY, character));
	}
}

function draw() {
	background(0, 20);

	for (var i = 0; i < snakes.length; i++) {
		snakes[i].display();
		snakes[i].move();
	}
}

function randomCharacter() {
	return String.fromCharCode(random(32, 127))
}

function randomSpeed() {
	if (coin(0.5)) {
		return randomIntegerInclusive(-1, -maximumSpeed);
	} else {
		return randomIntegerInclusive(1, maximumSpeed);
	}
}