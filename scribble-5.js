var letterHeight           = 40,
	letterWidth            = 40,
	spaceBetweenLines      =  0,
	spaceBetweenCharacters =  0,
	rowHeight              = letterHeight + spaceBetweenLines,
	columnWidth            = letterWidth + spaceBetweenCharacters;

var rows, columns, marginGlobal, marginHorizontal, marginVertical;
var globalCurvesArray = [], characterDuration = 30, density = 0.95;

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
			var characterNumber = i + (rows - j);

			if (random() < density) {
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

	var gridHorizontal = [x, x + w / 2, x + w];
	var gridVertical   = [y, y + h / 2, y + h];

	for (var i = 0; i < numberOfCurves + 1; i++) {
		shuffleArray(gridHorizontal);
		shuffleArray(gridVertical);

		var x1p = gridHorizontal[0];
		var y1p = gridVertical[0];
		var x1c = gridHorizontal[0];
		var y1c = gridVertical[1];
		var x2c = gridHorizontal[1];
		var y2c = gridVertical[0];
		var x2p = gridHorizontal[1];
		var y2p = gridVertical[1];

		pointsArray.push({x1p: x1p, y1p: y1p, x1c: x1c, y1c: y1c, x2c: x2c, y2c: y2c, x2p: x2p, y2p: y2p});
	}

	for (var i = 0; i < pointsArray.length; i++) {
		var x1p        = pointsArray[i].x1p;
		var y1p        = pointsArray[i].y1p;
		var x1c        = pointsArray[i].x1c;
		var y1c        = pointsArray[i].y1c;
		var x2c        = pointsArray[i].x2c;
		var y2c        = pointsArray[i].y2c;
		var x2p        = pointsArray[i].x2p;
		var y2p        = pointsArray[i].y2p;
		var t1Curve    = t1Character + curveDuration * i;
		var t2Curve    = t1Character + curveDuration * (i + 1);
		// var weight     = random(0.5, 1.0);
		var weight     = 1.0;
		var col        = color(255, 255, 255);
		var resolution = 0.005;


		curvesArray.push(new AnimatedBezierCurve2(x1p, y1p, x1c, y1c, x2c, y2c, x2p, y2p, t1Curve, t2Curve, weight, col, resolution));
	}

	globalCurvesArray.push(curvesArray);
}