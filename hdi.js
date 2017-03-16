var margin = 100;
var table;

function preload() {
	table = loadTable("files/HDI.csv", "csv", "header");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);

	console.log(table);
	print(table.getRowCount());
	print(table.getColumnCount());

	makeAxis();
}

function makeAxis() {
	fill(0);
	line(margin, height - margin, width - margin, height - margin);
	line(margin, height - margin, margin, margin);
	textAlign(CENTER, CENTER);
	for (var i = 1980; i < 2015; i += 10) {
		var x = map(i, 1980, 2015, 100, width - margin);
		text(str(i), x, height - margin + 10);
		line(x, height - margin, x, height - margin + 5);
	}
}