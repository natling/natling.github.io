class Cell {

	constructor(row, column, speed, r, g, b, colorSpeed) {
		this.row = row;
		this.column = column;
		this.speed = speed;
		this.r = r;
		this.g = g;
		this.b = b;
		this.colorSpeed = colorSpeed;
	}

	display() {
		fill(color(this.r, this.g, this.b));
		strokeWeight(0.2);
		rect(this.row * gridSize, this.column * gridSize, gridSize, gridSize);
	}

	move() {
		this.row = randomWalk(this.row, 0, rows, this.speed);
		this.column = randomWalk(this.column, 0, columns, this.speed);
	}

	changeColor() {
		this.r = randomWalk(this.r, 0, 255, this.colorSpeed);
		this.g = randomWalk(this.g, 0, 255, this.colorSpeed);
		this.b = randomWalk(this.b, 0, 255, this.colorSpeed);
	}
}

var gridSize = 10;
numberOfLiveCells = 100;
var rows, columns;
var liveCells = [];

function randomWalk(start, low, high, step) {
	while (true) {
		var newStart = start + int(random(-(step + 1), step + 1));
		if (newStart >= low && newStart <= high) {
			return newStart;
		}
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background(0);

	rows = int(windowWidth / gridSize);
	columns = int(windowWidth / gridSize);

	for (var i = 0; i < numberOfLiveCells; i++) {
		var row = int(random(rows));
		var column = int(random(columns));
		var speed = int(random(1, 4));
		var r = random(255);
		var g = random(255);
		var b = random(255);
		colorSpeed = int(random(5, 10));

		liveCells.push(new Cell(row, column, speed, r, g, b, colorSpeed));
	}
}

function draw() {
	background(0, 5);

	for (var i = 0; i < liveCells.length; i++) {
		liveCells[i].display();
		liveCells[i].move();
		liveCells[i].changeColor();
	}
}