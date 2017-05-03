var letterHeight           =  35,
	letterWidth            =  35,
	spaceBetweenLines      = -20,
	spaceBetweenCharacters =  20,
	rowHeight              = letterHeight + spaceBetweenLines,
	columnWidth            = letterWidth + spaceBetweenCharacters;

var rows, columns, marginHorizontal, marginVertical, lineArray = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	noCursor();

	rows             = int(height / rowHeight) - 12;
	columns          = int(width / columnWidth) - 3;
	marginVertical   = (height - rows * rowHeight) / 2;
	marginHorizontal = (width - columns * columnWidth) / 2;

	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < columns; i++) {
			var x              = columnWidth * i + marginHorizontal + spaceBetweenCharacters / 2;
			var y              = rowHeight   * j + marginVertical   + spaceBetweenLines      / 2;
			var w              = letterWidth;
			var h              = letterHeight;
			var numberOfPoints = int(random(7, 10));
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
		var x2 = x;
		var y2 = random(y, y + h);
		var x3 = x;
		var y3 = random(y, y + h);
		var x4 = x;
		var y4 = random(y, y + h);

		pointsArray.push([x2, y2, x3, y3, x4, y4]);
	}

	strokeWeight(weight);
	stroke(255);
	noFill();

	beginShape();
	vertex(random(x, x + w), random(y, y + h))

	for (var i = 0; i < pointsArray.length; i++) {
		var x2 = pointsArray[i][0];
		var y2 = pointsArray[i][1];
		var x3 = pointsArray[i][2];
		var y3 = pointsArray[i][3];
		var x4 = pointsArray[i][4];
		var y4 = pointsArray[i][5];

		bezierVertex(x2, y2, x3, y3, x4, y4);
	}

	endShape();

	pointsArray = [];

	for (var i = 0; i < numberOfPoints; i++) {
		var x2 = x + w;
		var y2 = random(y, y + h);
		var x3 = x + w;
		var y3 = random(y, y + h);
		var x4 = x + w;
		var y4 = random(y, y + h);

		pointsArray.push([x2, y2, x3, y3, x4, y4]);
	}

	beginShape();
	vertex(random(x, x + w), random(y, y + h))

	for (var i = 0; i < pointsArray.length; i++) {
		var x2 = pointsArray[i][0];
		var y2 = pointsArray[i][1];
		var x3 = pointsArray[i][2];
		var y3 = pointsArray[i][3];
		var x4 = pointsArray[i][4];
		var y4 = pointsArray[i][5];

		bezierVertex(x2, y2, x3, y3, x4, y4);
	}

	endShape();
}