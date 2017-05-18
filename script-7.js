var letterHeight           = 50,
	letterWidth            = 50,
	spaceBetweenLines      = 10,
	spaceBetweenCharacters = 10,
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
			var numberOfLayers = int(random(1, 6));
			var weight         = random(0.8, 1.5);

			drawCharacter(x, y, w, h, numberOfLayers, weight);

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

function drawCharacter(x, y, w, h, numberOfLayers, weight) {

	strokeWeight(weight);
	stroke(255);
	noFill();

	for (var j = 0; j < numberOfLayers; j++) {
		var offset = j * 5;
		var corners = [ [x + offset, y + offset], [x + w - offset, y + offset], [x + w - offset, y + h - offset], [x + offset, y + h - offset] ];
		var numberOfSides = int(random(1, 5));
		var orientation = int(random(4));

		beginShape();

		for (var i = 0; i < numberOfSides + 1; i++) {
			var newX = corners[(i + orientation) % corners.length][0] + random(-1, 1);
			var newY = corners[(i + orientation) % corners.length][1] + random(-1, 1);

			vertex(newX, newY);
		}

		endShape();
	}
}