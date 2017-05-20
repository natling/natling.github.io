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

		if (t > this.t2) {
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

// var t = 0;

// var numberOfLines = 0;
// var linesArray = [];

// var numberOfCurves = 100;
// var curvesArray = [];

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
// }

// function draw() {
// 	background(0);

// 	for (var i = 0; i < numberOfLines; i++) {
// 		linesArray[i].draw();
// 	}

// 	for (var i = 0; i < numberOfCurves; i++) {
// 		curvesArray[i].draw();
// 	}

// 	t++;
// }