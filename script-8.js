var letterHeight           = 15,
	letterWidth            = 70,
	spaceBetweenLines      =  0,
	spaceBetweenCharacters = 15,
	rowHeight              = letterHeight + spaceBetweenLines,
	columnWidth            = letterWidth + spaceBetweenCharacters;

var rows, columns, marginGlobal, marginHorizontal, marginVertical;

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
			var numberOfPoints = int(random(5, 10));
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

	var corners = [ [x, y], [x + w, y], [x + w, y + h], [x, y + h] ];

	for (var i = 0; i < numberOfPoints; i++) {
		var randomCorner = int(random(4));

		var cx = random(x, x + w);
		var cy = random(y, y + h);
		var x3 = corners[randomCorner][0] + random(-3, 3);
		var y3 = corners[randomCorner][1] + random(-3, 3);

		pointsArray.push([cx, cy, x3, y3]);
	}

	strokeWeight(weight);
	stroke(255);
	noFill();

	beginShape();
	vertex(random(x, x + w), random(y, y + h))

	for (var i = 0; i < pointsArray.length; i++) {
		var cx = pointsArray[i][0];
		var cy = pointsArray[i][1];
		var x3 = pointsArray[i][2];
		var y3 = pointsArray[i][3];

		quadraticVertex(cx, cy, x3, y3);
	}

	endShape();
}