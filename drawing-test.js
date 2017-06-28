var t = 0;

var numberOfLines        = 10;
var numberOfCurves       = 10;
var numberOfBezierCurves = 10;
var numberOfArcs         = 10;

var linesArray        = [];
var curvesArray       = [];
var bezierCurvesArray = [];
var arcsArray         = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);

	for (var i = 0; i < numberOfLines; i++) {
		var x1     = random(width);
		var y1     = random(height);
		var x2     = random(width);
		var y2     = random(height);
		var t1     = int(random(10, 100));
		var t2     = t1 + int(random(100, 200));
		var weight = 1;
		var col    = color(255, 255, 255);

		linesArray.push(new AnimatedLine(x1, y1, x2, y2, t1, t2, weight, col));
	}

	for (var i = 0; i < numberOfCurves; i++) {
		var x1c        = random(width);
		var y1c        = random(height);
		var x1p        = random(width);
		var y1p        = random(height);
		var x2p        = random(width);
		var y2p        = random(height);
		var x2c        = random(width);
		var y2c        = random(height);
		var t1         = i * 50;
		var t2         = t1 + 50;
		var weight     = 1;
		var col        = color(255, 255, 255);
		var resolution = 0.001;

		curvesArray.push(new AnimatedCurve(x1c, y1c, x1p, y1p, x2p, y2p, x2c, y2c, t1, t2, weight, col, resolution));
	}

	for (var i = 0; i < numberOfBezierCurves; i++) {
		var x1p        = random(width);
		var y1p        = random(height);
		var x1c        = random(width);
		var y1c        = random(height);
		var x2c        = random(width);
		var y2c        = random(height);
		var x2p        = random(width);
		var y2p        = random(height);
		var t1         = i * 50;
		var t2         = t1 + 50;
		var weight     = 1;
		var col        = color(255, 255, 255);
		var resolution = 0.001;

		bezierCurvesArray.push(new AnimatedBezierCurve(x1p, y1p, x1c, y1c, x2c, y2c, x2p, y2p, t1, t2, weight, col, resolution));
	}

	for (var i = 0; i < numberOfArcs; i++) {
		var x         = random(width);
		var y         = random(height);
		var w         = random(100, 200);
		var h         = w;
		var start     = random(TAU);
		var stop      = start + TAU * 0.999;
		var direction = random() < 0.5;
		var t1        = i * 100;
		var t2        = t1 + 100;
		var weight    = 1;
		var col       = color(255, 255, 255);

		arcsArray.push(new AnimatedArc(x, y, w, h, start, stop, direction, t1, t2, weight, col));
	}
}

function draw() {
	background(0);

	for (var i = 0; i < numberOfLines; i++) {
		linesArray[i].draw();
	}

	for (var i = 0; i < numberOfCurves; i++) {
		curvesArray[i].draw();
	}

	for (var i = 0; i < numberOfBezierCurves; i++) {
		bezierCurvesArray[i].draw();
	}

	for (var i = 0; i < numberOfArcs; i++) {
		arcsArray[i].draw();
	}

	t++;
}