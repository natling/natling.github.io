var letterHeight           = 45,
	letterWidth            = 15,
	spaceBetweenLines      = 10,
	spaceBetweenCharacters =  0,
	rowHeight              = letterHeight + spaceBetweenLines,
	columnWidth            = letterWidth + spaceBetweenCharacters;

var rows, columns, marginGlobal, marginHorizontal, marginVertical, lineArray = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);

	marginGlobal     = 60;
	rows             = int((height - marginGlobal * 2) / rowHeight);
	columns          = int((width - marginGlobal * 2) / columnWidth);
	marginVertical   = ((height - marginGlobal * 2) - rows * rowHeight) / 2;
	marginHorizontal = ((width - marginGlobal * 2) - columns * columnWidth) / 2;

	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < columns; i++) {
			var x              = columnWidth * i + marginGlobal + marginHorizontal + spaceBetweenCharacters / 2;
			var y              = rowHeight   * j + marginGlobal + marginVertical   + spaceBetweenLines      / 2;
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
		newX = random(x, x + w);
		newY = random(y, y + h);

		pointsArray.push([newX, newY]);
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