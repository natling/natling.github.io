var letterHeight           = 80,
	letterWidth            = 80,
	spaceBetweenLines      = 20,
	spaceBetweenCharacters = 20,
	rowHeight              = letterHeight + spaceBetweenLines,
	columnWidth            = letterWidth + spaceBetweenCharacters;

var rows, columns, marginGlobal, marginHorizontal, marginVertical;
var globalCurvesArray = [], characterDuration = 50, cornerStrokeProbability = 1, connectedStrokeProbability = 1;

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
			var characterNumber = j * columns + i;

			var x              = columnWidth * i + marginGlobal + marginHorizontal + spaceBetweenCharacters / 2;
			var y              = rowHeight   * j + marginGlobal + marginVertical   + spaceBetweenLines      / 2;
			var w              = letterWidth;
			var h              = letterHeight;
			var numberOfCurves = int(random(4, 15));
			var t1Character    = characterDuration * characterNumber;
			var t2Character    = characterDuration * (characterNumber + 1);

			drawCharacter(x, y, w, h, numberOfCurves, t1Character, t2Character);
		}
	}
}

function draw() {
	background(0);

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
		var newX, newY;

		if (random() < cornerStrokeProbability) {
			if (random() < 0.8) {
				if (random() < 0.5) {
					newX = x;
				} else {
					newX = x + w;
				}
			} else {
				newX = x + w / 2;
			}

			if (random() < 0.8) {
				if (random() < 0.5) {
					newY = y;
				} else {
					newY = y + h;
				}
			} else {
				newY = y + h / 2;
			}

		} else {
			newX = random(x, x + w);
			newY = random(y, y + h);
		}

		pointsArray.push({x: newX, y: newY});
	}

	for (var i = 0; i < numberOfCurves; i++) {
		var x1c         = random(x, x + w);
		var y1c         = random(y, y + h);
		if (random() < connectedStrokeProbability) {
			var x1p     = pointsArray[i].x;
			var y1p     = pointsArray[i].y;
		} else {
			var x1p     = random(x, x + w);
			var y1p     = random(y, y + h);
		}
		var x2p         = pointsArray[i + 1].x;
		var y2p         = pointsArray[i + 1].y;
		var x2c         = random(x, x + w);
		var y2c         = random(y, y + h);
		var t1Curve     = t1Character + curveDuration * i;
		var t2Curve     = t1Character + curveDuration * (i + 1);
		var weight      = random(0.5, 1.0);
		var col         = color(255, 255, 255);
		var resolution  = 0.005;

		curvesArray.push(new AnimatedCurve(x1c, y1c, x1p, y1p, x2p, y2p, x2c, y2c, t1Curve, t2Curve, weight, col, resolution));
	}

	globalCurvesArray.push(curvesArray);
}