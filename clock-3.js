var currentSeconds;
var aspectRatio, factors, findRatio, rows, columns, rowHeight, columnWidth;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background(0);

	aspectRatio = width / height;
	factors = [[2,7], [3,3], [5,2]]; // n = 24 * 60 * 60 = 86400;
	findRatio = createFindRatio(factors);

	rows = findRatio(aspectRatio)[1];
	columns = findRatio(aspectRatio)[2];

	rowHeight = height / rows;
	columnWidth = width / columns;

	// console.log(aspectRatio);
	// console.log(rows);
	// console.log(columns);
}

function draw() {
	background(0);

	currentSeconds = hour() * 60 * 60 + minute() * 60 + second();
	// console.log(hour(), minute(), second(), currentSeconds);

	for (var j = 0; j < columns; j++) {
		for (var i = 0; i < rows; i++) {
			noStroke();
			if (j * rows + i < currentSeconds) {
				fill('#00f72c');
			} else {
				fill(0);
			}
			rect(j * columnWidth, i * rowHeight, columnWidth, rowHeight);
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	aspectRatio = width / height;

	rows = findRatio(aspectRatio)[1];
	columns = findRatio(aspectRatio)[2];

	rowHeight = height / rows;
	columnWidth = width / columns;
}