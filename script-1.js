var letterHeight           = 45,
	letterWidth            = 15,
	spaceBetweenLines      = 10,
	spaceBetweenCharacters =  0,
	rowHeight              = letterHeight + spaceBetweenLines,
	columnWidth            = letterWidth + spaceBetweenCharacters;

var rows, columns, marginHorizontal, marginVertical, lineArray = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	noCursor();

	rows             = int(height / rowHeight) - 3;
	columns          = int(width / columnWidth) - 8;
	marginVertical   = (height - rows * rowHeight) / 2;
	marginHorizontal = (width - columns * columnWidth) / 2;

	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < columns; i++) {
			var x              = columnWidth * i + marginHorizontal + spaceBetweenCharacters / 2;
			var y              = rowHeight   * j + marginVertical   + spaceBetweenLines      / 2;
			var w              = letterWidth;
			var h              = letterHeight;
			var numberOfPoints = int(random(6, 15));
			var weight         = random(0.5, 1.0);

			drawCharacter(x, y, w, h, numberOfPoints, weight);

			// noFill();
			// strokeWeight(1);
			// stroke(100);
			// rect(x, y, w, h);
		}
	}

	// noFill();
	// strokeWeight(1);
	// stroke(200);
	// rect(marginHorizontal, marginVertical, width - marginHorizontal * 2, height - marginVertical * 2);
}

function drawCharacter(x, y, w, h, numberOfPoints, weight) {
	pointsArray = [];

	for (var i = 0; i < numberOfPoints; i++) {
		pointsArray.push([random(x, x + w), random(y, y + h)]);
	}

	strokeWeight(weight);
	stroke(255);
	noFill();

	beginShape();

	for (var i = 0; i < pointsArray.length; i++) {
		var x = pointsArray[i][0];
		var y = pointsArray[i][1];
		curveVertex(x, y);
	}

	endShape();
}

function create2DArray(rows, columns) {
	var x = new Array(rows);

	for (var i = 0; i < rows; i++) {
		x[i] = new Array(columns);
	}

	return x;
}