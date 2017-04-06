// data source: https://catalog.data.gov/dataset/vessel-calls-at-us-and-world-ports-2012-vessel-calls-in-u-s-ports-terminals-and-lightering-fcbc0

var backgroundColor = '#002b36';
var foregroundColor = '#b58900';

var marginTop = 100;
var marginBottom = 100;
var marginLeft = 150;
var marginRight = 60;

var xLabelsNumber = 9;
var xLabelsMinimum = 0;
var xLabelsMaximum = 400000000;

var yLabelsNumber = 11;
var yLabelsMinimum = 0;
var yLabelsMaximum = 10000;

var pointSize = 5;

data = [];

function preload() {
	table = loadTable('files/DS_U.S._Port_Calls_2012.csv', 'csv', 'header');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(backgroundColor);

	textFont('Menlo');
	textSize(12);

	for (var i = 0; i < table.getRowCount(); i++) {
		var port        = table.getString(i, 0);
		var state       = table.getString(i, 1);
		var allCalls    = table.getString(i, 2);
		var allCapacity = table.getString(i, 3);

		var entry = {
			port: port,
			state: state,
			allCalls: allCalls,
			allCapacity: allCapacity
		}

		data.push(entry);
	}
}

function draw() {
	background(backgroundColor);

	xLabelsMaximum = map(mouseX, 0, width, 0, 400000000);
	yLabelsMaximum = map(mouseY, 0, height, 10000, 0);

	drawAxes();
	drawData();
	drawLabels();
}

function drawAxes() {
	stroke(foregroundColor);
	strokeWeight(1);
	line(marginLeft, height - marginBottom, width - marginRight, height - marginBottom);
	line(marginLeft, marginTop, marginLeft, height - marginBottom);

	for (var i = 0; i < xLabelsNumber; i++) {
		var xLabel = map(i, 0, xLabelsNumber - 1, xLabelsMinimum, xLabelsMaximum);
		var xLabelText = (xLabel / 1000000).toPrecision(3);
		// xLabelText = xLabelText.toPrecision
		var xLabelText = str(xLabelText) + 'm';
		var xLocation = map(i, 0, xLabelsNumber - 1, marginLeft, width - marginRight);
		textAlign(CENTER, TOP);
		noStroke();
		fill(foregroundColor);
		text(xLabelText, xLocation, height - marginBottom + 10);
		stroke(foregroundColor);
		strokeWeight(0.5);
		line(xLocation, marginTop, xLocation, height - marginBottom + 5);
	}

	for (var i = 0; i < yLabelsNumber; i++) {
		var yLabel = map(i, 0, yLabelsNumber - 1, yLabelsMinimum, yLabelsMaximum);
		var yLabelText = str(Math.round(yLabel));
		var yLocation = map(i, 0, yLabelsNumber - 1, height - marginBottom, marginTop);
		textAlign(RIGHT, CENTER);
		noStroke();
		fill(foregroundColor);
		text(yLabelText, marginLeft - 10, yLocation);
		stroke(foregroundColor)	;
		strokeWeight(0.5);
		line(marginLeft - 5, yLocation, width - marginRight, yLocation);
	}
}

function drawData() {
	for (var i = 0; i < data.length; i++) {
		var port        = data[i].port;
		var state       = data[i].state;
		var allCalls    = data[i].allCalls;
		var allCapacity = data[i].allCapacity;

		var x = map(allCapacity, xLabelsMinimum, xLabelsMaximum, marginLeft, width - marginRight);
		var y = map(allCalls, yLabelsMinimum, yLabelsMaximum, height - marginBottom, marginTop);

		fill(foregroundColor);
		noStroke();
		ellipse(x, y, pointSize, pointSize);
		textAlign(LEFT, CENTER);
		text(port + ', ' + state, x + 8, y);
	}
}

function drawLabels() {
	var title  = '2012 Total Vessel Calls - Vessels over 1,000 gross register tons (GRT)';
	var xAxisLabel = 'capacity';
	var yAxisLabel = 'calls';

	translate(0, 0);
	textAlign(CENTER, CENTER);
	text(title, 0, 0, width, marginTop);
	text(xAxisLabel, marginLeft, height - marginBottom, width - marginRight - marginLeft, marginBottom);
	translate(marginLeft / 2, marginTop + ((height - marginBottom) - marginTop) / 2);
	rotate(-HALF_PI);
	text(yAxisLabel, 0, 0);
	// rect(marginLeft / 2, marginTop + ((height - marginBottom) - marginTop) / 2, marginLeft, height - marginBottom - marginTop);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}