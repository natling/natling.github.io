var letterHeight           = 50,
	letterWidth            = 50,
	spaceBetweenLines      = 10,
	spaceBetweenCharacters = 10,
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
			var x                = columnWidth * i + marginGlobal + marginHorizontal + spaceBetweenCharacters / 2;
			var y                = rowHeight   * j + marginGlobal + marginVertical   + spaceBetweenLines      / 2;
			var w                = letterWidth;
			var h                = letterHeight;
			var numberOfArcs     = int(random(2, 3));
			var weight           = random(0.8, 1.5);
			var circleDistortion = 4;
			var arcDistortion    = 4;

			drawCharacter(x, y, w, h, numberOfArcs, weight, circleDistortion);

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

function drawCharacter(x, y, w, h, numberOfArcs, weight, circleDistortion, arcDistortion) {

	strokeWeight(weight);
	stroke(255);
	noFill();

	var ellipseX = x + w / 2;
	var ellipseY = y + w / 2;
	var ellipseW = letterWidth;
	var ellipseH = letterHeight;

	ellipse(ellipseX, ellipseY, ellipseW + int(random(-circleDistortion, circleDistortion)), ellipseH + int(random(-circleDistortion, circleDistortion)));

	for (var i = 0; i < numberOfArcs; i++) {
		var layer = int(random(1, 4));

		var a     = ellipseX;
		var b     = ellipseY;
		var c     = ellipseW - layer * 13 + int(random(-arcDistortion, arcDistortion));
		var d     = ellipseH - layer * 13 + int(random(-arcDistortion, arcDistortion));
		var start = random(TAU);
		var stop  = start + random(TAU * 0.5, TAU * 0.75);

		arc(a, b, c, d, start, stop);
	}
}