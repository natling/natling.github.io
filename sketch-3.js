var columns, rows;

var columnWidth = 40;
var rowHeight   = 40;

var squareSize;

var speedLow  = 1000;
var speedHigh =  100;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(205, 205, 205);

	rows    = Math.floor(height / rowHeight) - 1;
	columns = rows;

	squareSize = sqrt(sq(columnWidth / 2) + sq(rowHeight / 2));

	rectMode(CENTER);
	noStroke();
	fill(0);
}

function draw() {
	background(205, 205, 205);

	translate((width - columns * columnWidth) / 2, (height - rows * rowHeight) / 2);

	for (var i = 0; i < columns; i++) {
		for (var j = 0; j < rows; j++) {
			var x = (i + 0.5) * columnWidth;
			var y = (j + 0.5) * rowHeight;

			var speed = map(i + j, 0, columns * rows, speedLow, speedHigh);
			var angle = map(frameCount % speed, 0, speed - 1, 0, TAU);

			push();
			translate(x, y);
			rotate(angle);
			rect(0, 0, squareSize, squareSize);
			pop();
		}
	}
}