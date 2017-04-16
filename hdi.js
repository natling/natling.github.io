var margin = 100;
var tickMarkLength = 5;

var table;

function preload() {
	table = loadTable('files/HDI.csv', 'csv', 'header');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);

	console.log(table);
	print(table.getRowCount());
	print(table.getColumnCount());

	makeAxis();
}

function makeAxis() {
	stroke(255);

	line(margin, height - margin, width - margin, height - margin);
	line(margin, height - margin, margin, margin);

	textFont('Menlo');
	textStyle(NORMAL);
	textSize(12);

	textAlign(CENTER, CENTER);

	fill(255);

	for (var i = 1980; i < 2015; i += 10) {
		var x = map(i, 1980, 2015, 100, width - margin);
		noStroke();
		text(str(i), x, height - margin + 15);
		stroke(255);
		line(x, height - margin, x, height - margin + tickMarkLength);
	}

	textAlign(RIGHT, CENTER);

	for (var i = 0; i < 1; i += 0.2) {
		var y = map(i, 0, 1, height - margin, margin);
		noStroke();
		text(str(roundPrecise(i, 1)), margin - 10, y);
		stroke(255);
		line(margin - tickMarkLength, y, margin, y);
	}
}

function roundPrecise(number, precision) {
	var factor = Math.pow(10, precision);
	var tempNumber = number * factor;
	var roundedTempNumber = Math.round(tempNumber);
	return roundedTempNumber / factor;
};