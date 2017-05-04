var letterHeight           =  30,
	letterWidth            =  50,
	spaceBetweenLines      =  20,
	spaceBetweenCharacters = -25,
	rowHeight              = letterHeight + spaceBetweenLines,
	columnWidth            = letterWidth + spaceBetweenCharacters;

var rows, columns, marginHorizontal, marginVertical, lineArray = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);

	rows             = int(height / rowHeight) - 2;
	columns          = int(width / columnWidth) - 6;
	marginVertical   = (height - rows * rowHeight) / 2;
	marginHorizontal = (width - columns * columnWidth) / 2;

	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < columns; i++) {
			var x              = columnWidth * i + marginHorizontal + spaceBetweenCharacters / 2;
			var y              = rowHeight   * j + marginVertical   + spaceBetweenLines      / 2;
			var w              = letterWidth;
			var h              = letterHeight;
			var numberOfPoints = int(random(10, 12));
			var weight         = 1;
			// var weight         = random(0.5, 1.0);

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
		var newX, newY;

		if (i == 0) {
			newX = random(x, x + w);
			newY = random(y, y + h);
		} else {
			if (i % 2 == 0) {
				newX = random(x, x + w);
				newY = pointsArray[i - 1][1]
			} else {
				newX = pointsArray[i - 1][0]
				newY = random(y, y + h);
			}
		}

		pointsArray.push([newX, newY]);
	}

	strokeWeight(weight);
	stroke(255);
	noFill();

	beginShape();

	for (var i = 0; i < pointsArray.length - 1; i++) {
		var x = pointsArray[i][0];
		var y = pointsArray[i][1];

		if (random() < 0.5) {
			x += int(random(-2, 2));
			y += int(random(-2, 2));
		}

		vertex(x, y);
	}

	endShape();
}