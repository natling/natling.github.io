var margin = 100;
var table;

function preload() {
	table = loadTable("files/HDI.csv", "csv", "header");
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
	line(margin, height - margin, width - margin, height - margin);
	// line();
}