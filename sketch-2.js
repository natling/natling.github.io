var columns, rows;

var columnWidth = 50;
var rowHeight   = 50;

var squareSize;

var globalSpeed = 1000;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(205, 205, 205);

	columns = Math.floor(width / columnWidth) - 1;
	rows    = Math.floor(height / rowHeight) - 1;

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

			var speed = map(j + i * rows, 0, columns * rows - 1, globalSpeed * 4, globalSpeed);
			var angle = map(frameCount % speed, 0, speed - 1, 0, TAU);

			push();
			translate(x, y);
			rotate(angle);
			rect(0, 0, squareSize, squareSize);
			pop();
		}
	}
}