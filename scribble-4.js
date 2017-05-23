var letterHeight           =  60,
	letterWidth            =  20,
	spaceBetweenLines      =   0,
	spaceBetweenCharacters = -15,
	rowHeight              = letterHeight + spaceBetweenLines,
	columnWidth            = letterWidth + spaceBetweenCharacters;

var rows, columns, marginGlobal, marginHorizontal, marginVertical;
var globalCurvesArray = [], characterDuration = 8;

var t = 0;

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
			var characterNumber = j * columns + (columns - i);

			var x              = columnWidth * i + marginGlobal + marginHorizontal + spaceBetweenCharacters / 2;
			var y              = rowHeight   * j + marginGlobal + marginVertical   + spaceBetweenLines      / 2;
			var w              = letterWidth;
			var h              = letterHeight;
			var numberOfCurves = int(random(2, 3));
			var t1Character    = characterDuration * characterNumber;
			var t2Character    = characterDuration * (characterNumber + 1);

			drawCharacter(x, y, w, h, numberOfCurves, t1Character, t2Character);
		}
	}
}

function draw() {
	// background(0);

	for (var i = 0; i < globalCurvesArray.length; i++) {
		for (var j = 0; j < globalCurvesArray[i].length; j++) {
			globalCurvesArray[i][j].draw();
		}
	}

	t++;
}

function drawCharacter(x, y, w, h, numberOfCurves, t1Character, t2Character) {
	pointsArray = [];
	curvesArray = [];

	var curveDuration = (t2Character - t1Character) / numberOfCurves;

	for (var i = 0; i < numberOfCurves + 1; i++) {
		var x1c = random(x, x + w);
		var y1c = y + h / 2;
		var x2c = random(x, x + w);
		var y2c = random(y, y + h);
		var x2p = random(x, x + w);
		var y2p = y + h / 2;

		pointsArray.push({x1c: x1c, y1c: y1c, x2c: x2c, y2c: y2c, x2p: x2p, y2p: y2p});
	}

	for (var i = 0; i < pointsArray.length; i++) {
		if (i == 0) {
			var x1p    = random(x, x + w);
			var y1p    = random(y, y + h);
		} else {
			var x1p    = pointsArray[i - 1].x2p;
			var y1p    = pointsArray[i - 1].y2p;
		}
		var x1c        = pointsArray[i].x1c;
		var y1c        = pointsArray[i].y1c;
		var x2c        = pointsArray[i].x2c;
		var y2c        = pointsArray[i].y2c;
		var x2p        = pointsArray[i].x2p;
		var y2p        = pointsArray[i].y2p;
		var t1Curve    = t1Character + curveDuration * i;
		var t2Curve    = t1Character + curveDuration * (i + 1);
		var weight     = 0.5;
		var col        = color(255, 255, 255);
		var resolution = 0.005;


		curvesArray.push(new AnimatedBezierCurve2(x1p, y1p, x1c, y1c, x2c, y2c, x2p, y2p, t1Curve, t2Curve, weight, col, resolution));
	}

	globalCurvesArray.push(curvesArray);
}