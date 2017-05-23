class AnimatedLine {

	constructor(x1, y1, x2, y2, t1, t2, weight, col) {
		this.x1     = x1;
		this.y1     = y1;
		this.x2     = x2;
		this.y2     = y2;
		this.t1     = t1;
		this.t2     = t2;
		this.weight = weight;
		this.col    = col;
	}

	draw() {
		strokeWeight(this.weight);
		stroke(this.col);

		if (t >= this.t2) {
			line(this.x1, this.y1, this.x2, this.y2);
		} else {
			if (t >= this.t1) {
				var x2temp = map(t, this.t1, this.t2, this.x1, this.x2);
				var y2temp = map(t, this.t1, this.t2, this.y1, this.y2);
				line(this.x1, this.y1, x2temp, y2temp);
			}
		}
	}
}

class AnimatedLine2 {

	constructor(x1, y1, x2, y2, t1, t2, weight, col) {
		this.x1     = x1;
		this.y1     = y1;
		this.x2     = x2;
		this.y2     = y2;
		this.t1     = t1;
		this.t2     = t2;
		this.weight = weight;
		this.col    = col;
	}

	draw() {
		if (t >= this.t1 && t < this.t2) {
			strokeWeight(this.weight);
			stroke(this.col);

			var x2temp = map(t, this.t1, this.t2, this.x1, this.x2);
			var y2temp = map(t, this.t1, this.t2, this.y1, this.y2);
			line(this.x1, this.y1, x2temp, y2temp);
		}
	}
}

class AnimatedCurve {

	constructor(x1c, y1c, x1p, y1p, x2p, y2p, x2c, y2c, t1, t2, weight, col, resolution) {
		this.x1c        = x1c;
		this.y1c        = y1c;
		this.x1p        = x1p;
		this.y1p        = y1p;
		this.x2p        = x2p;
		this.y2p        = y2p;
		this.x2c        = x2c;
		this.y2c        = y2c;
		this.t1         = t1;
		this.t2         = t2;
		this.weight     = weight;
		this.col        = col;
		this.resolution = resolution;
	}

	draw() {
		if (t >= this.t2) {
			noFill();
			stroke(this.col);
			strokeWeight(this.weight);

			curve(this.x1c, this.y1c, this.x1p, this.y1p, this.x2p, this.y2p, this.x2c, this.y2c);

		} else {

			if (t >= this.t1) {
				var progress = map(t, this.t1, this.t2, 0, 1);

				var ax = this.x1c;
				var bx = this.x1p;
				var cx = this.x2p;
				var dx = this.x2c;

				var ay = this.y1c;
				var by = this.y1p;
				var cy = this.y2p;
				var dy = this.y2c;

				for (var i = 0; i < progress; i += this.resolution) {
					var xTemp = curvePoint(ax, bx, cx, dx, i);
					var yTemp = curvePoint(ay, by, cy, dy, i);

					fill(this.col);
					noStroke();

					ellipse(xTemp, yTemp, this.weight, this.weight);
				}
			}
		}
	}
}

class AnimatedCurve2 {

	constructor(x1c, y1c, x1p, y1p, x2p, y2p, x2c, y2c, t1, t2, weight, col, resolution) {
		this.x1c        = x1c;
		this.y1c        = y1c;
		this.x1p        = x1p;
		this.y1p        = y1p;
		this.x2p        = x2p;
		this.y2p        = y2p;
		this.x2c        = x2c;
		this.y2c        = y2c;
		this.t1         = t1;
		this.t2         = t2;
		this.weight     = weight;
		this.col        = col;
		this.resolution = resolution;
	}

	draw() {
		if (t >= this.t1 && t < this.t2) {
			var progress = map(t, this.t1, this.t2, 0, 1);

			var ax = this.x1c;
			var bx = this.x1p;
			var cx = this.x2p;
			var dx = this.x2c;

			var ay = this.y1c;
			var by = this.y1p;
			var cy = this.y2p;
			var dy = this.y2c;

			for (var i = 0; i < progress; i += this.resolution) {
				var xTemp = curvePoint(ax, bx, cx, dx, i);
				var yTemp = curvePoint(ay, by, cy, dy, i);

				fill(this.col);
				noStroke();

				ellipse(xTemp, yTemp, this.weight, this.weight);
			}
		}
	}
}

class AnimatedBezierCurve {

	constructor(x1p, y1p, x1c, y1c, x2c, y2c, x2p, y2p, t1, t2, weight, col, resolution) {
		this.x1p        = x1p;
		this.y1p        = y1p;
		this.x1c        = x1c;
		this.y1c        = y1c;
		this.x2c        = x2c;
		this.y2c        = y2c;
		this.x2p        = x2p;
		this.y2p        = y2p;
		this.t1         = t1;
		this.t2         = t2;
		this.weight     = weight;
		this.col        = col;
		this.resolution = resolution;
	}

	draw() {
		if (t >= this.t2) {
			noFill();
			stroke(this.col);
			strokeWeight(this.weight);

			bezier(this.x1p, this.y1p, this.x1c, this.y1c, this.x2c, this.y2c, this.x2p, this.y2p);

		} else {

			if (t >= this.t1) {
				var progress = map(t, this.t1, this.t2, 0, 1);

				var ax = this.x1p;
				var bx = this.x1c;
				var cx = this.x2c;
				var dx = this.x2p;

				var ay = this.y1p;
				var by = this.y1c;
				var cy = this.y2c;
				var dy = this.y2p;

				for (var i = 0; i < progress; i += this.resolution) {
					var xTemp = bezierPoint(ax, bx, cx, dx, i);
					var yTemp = bezierPoint(ay, by, cy, dy, i);

					fill(this.col);
					noStroke();

					ellipse(xTemp, yTemp, this.weight, this.weight);
				}
			}
		}
	}
}

class AnimatedBezierCurve2 {

	constructor(x1p, y1p, x1c, y1c, x2c, y2c, x2p, y2p, t1, t2, weight, col, resolution) {
		this.x1p        = x1p;
		this.y1p        = y1p;
		this.x1c        = x1c;
		this.y1c        = y1c;
		this.x2c        = x2c;
		this.y2c        = y2c;
		this.x2p        = x2p;
		this.y2p        = y2p;
		this.t1         = t1;
		this.t2         = t2;
		this.weight     = weight;
		this.col        = col;
		this.resolution = resolution;
	}

	draw() {
		if (t >= this.t1 && t < this.t2) {
			noFill();
			stroke(this.col);
			strokeWeight(this.weight);

			var progress = map(t, this.t1, this.t2, 0, 1);

			var ax = this.x1p;
			var bx = this.x1c;
			var cx = this.x2c;
			var dx = this.x2p;

			var ay = this.y1p;
			var by = this.y1c;
			var cy = this.y2c;
			var dy = this.y2p;

			for (var i = 0; i < progress; i += this.resolution) {
				var xTemp = bezierPoint(ax, bx, cx, dx, i);
				var yTemp = bezierPoint(ay, by, cy, dy, i);

				fill(this.col);
				noStroke();

				ellipse(xTemp, yTemp, this.weight, this.weight);
			}
		}
	}
}

class AnimatedArc {

	constructor(x, y, w, h, start, stop, direction, t1, t2, weight, col) {
		this.x         = x;
		this.y         = y;
		this.w         = w;
		this.h         = h;
		this.start     = start;
		this.stop      = stop;
		this.direction = direction;
		this.t1        = t1;
		this.t2        = t2;
		this.weight    = weight;
		this.col       = col;
	}

	draw() {
		noFill();
		strokeWeight(this.weight);
		stroke(this.col);

		if (t > this.t2) {
			arc(this.x, this.y, this.w, this.h, this.start, this.stop);
		} else {
			if (t > this.t1) {
				if (this.direction) {
					var stopTemp = map(t, this.t1, this.t2, this.start, this.stop);
					arc(this.x, this.y, this.w, this.h, this.start, stopTemp);
				} else {
					var startTemp = map(t, this.t1, this.t2, this.stop, this.start);
					arc(this.x, this.y, this.w, this.h, startTemp, this.stop);
				}
			}
		}
	}
}

class AnimatedArc2 {

	constructor(x, y, w, h, start, stop, direction, t1, t2, weight, col) {
		this.x         = x;
		this.y         = y;
		this.w         = w;
		this.h         = h;
		this.start     = start;
		this.stop      = stop;
		this.direction = direction;
		this.t1        = t1;
		this.t2        = t2;
		this.weight    = weight;
		this.col       = col;
	}

	draw() {
		noFill();
		strokeWeight(this.weight);
		stroke(this.col);

		if (t >= this.t1 && t < this.t2) {
			if (this.direction) {
				var stopTemp = map(t, this.t1, this.t2, this.start, this.stop);
				arc(this.x, this.y, this.w, this.h, this.start, stopTemp);
			} else {
				var startTemp = map(t, this.t1, this.t2, this.stop, this.start);
				arc(this.x, this.y, this.w, this.h, startTemp, this.stop);
			}
		}
	}
}

// var t = 0;

// var numberOfLines        =   0;
// var numberOfCurves       =   0;
// var numberOfBezierCurves =   0;
// var numberOfArcs         = 100;

// var linesArray        = [];
// var curvesArray       = [];
// var bezierCurvesArray = [];
// var arcsArray         = [];

// function setup() {
// 	createCanvas(windowWidth, windowHeight);
// 	background(0);

// 	for (var i = 0; i < numberOfLines; i++) {
// 		var x1     = random(width);
// 		var y1     = random(height);
// 		var x2     = random(width);
// 		var y2     = random(height);
// 		var t1     = int(random(10, 100));
// 		var t2     = t1 + int(random(100, 200));
// 		var weight = 1;
// 		var col    = color(255, 255, 255);

// 		linesArray.push(new AnimatedLine(x1, y1, x2, y2, t1, t2, weight, col));
// 	}

// 	for (var i = 0; i < numberOfCurves; i++) {
// 		var x1c        = random(width);
// 		var y1c        = random(height);
// 		var x1p        = random(width);
// 		var y1p        = random(height);
// 		var x2p        = random(width);
// 		var y2p        = random(height);
// 		var x2c        = random(width);
// 		var y2c        = random(height);
// 		var t1         = i * 50;
// 		var t2         = t1 + 50;
// 		var weight     = 1;
// 		var col        = color(255, 255, 255);
// 		var resolution = 0.001;

// 		curvesArray.push(new AnimatedCurve(x1c, y1c, x1p, y1p, x2p, y2p, x2c, y2c, t1, t2, weight, col, resolution));
// 	}

// 	for (var i = 0; i < numberOfBezierCurves; i++) {
// 		var x1p        = random(width);
// 		var y1p        = random(height);
// 		var x1c        = random(width);
// 		var y1c        = random(height);
// 		var x2c        = random(width);
// 		var y2c        = random(height);
// 		var x2p        = random(width);
// 		var y2p        = random(height);
// 		var t1         = i * 50;
// 		var t2         = t1 + 50;
// 		var weight     = 1;
// 		var col        = color(255, 255, 255);
// 		var resolution = 0.001;

// 		bezierCurvesArray.push(new AnimatedBezierCurve(x1p, y1p, x1c, y1c, x2c, y2c, x2p, y2p, t1, t2, weight, col, resolution));
// 	}

// 	for (var i = 0; i < numberOfArcs; i++) {
// 		var x         = random(width);
// 		var y         = random(height);
// 		var w         = random(100, 200);
// 		var h         = w;
// 		var start     = random(TAU);
// 		var stop      = start + TAU * 0.999;
// 		var direction = random() < 0.5;
// 		var t1        = i * 100;
// 		var t2        = t1 + 100;
// 		var weight    = 1;
// 		var col       = color(255, 255, 255);

// 		arcsArray.push(new AnimatedArc(x, y, w, h, start, stop, direction, t1, t2, weight, col));
// 	}
// }

// function draw() {
// 	background(0);

// 	for (var i = 0; i < numberOfLines; i++) {
// 		linesArray[i].draw();
// 	}

// 	for (var i = 0; i < numberOfCurves; i++) {
// 		curvesArray[i].draw();
// 	}

// 	for (var i = 0; i < numberOfBezierCurves; i++) {
// 		bezierCurvesArray[i].draw();
// 	}

// 	for (var i = 0; i < numberOfArcs; i++) {
// 		arcsArray[i].draw();
// 	}

// 	t++;
// }