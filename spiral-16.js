var aLow  = 0.01,
	aHigh = 10,
	bLow  = 0.0004,
	bHigh = 0.001,

	resolution = 128,

	aStep = (aHigh - aLow) / resolution,
	bStep = (bHigh - bLow) / resolution,

	aUp = true,
	bUp = true;

var a, b;

var n = 30000;

var e = 2.71828;

var density = 1.0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background('#000000');
	frameRate(10);

	textFont('Menlo');
	textAlign(CENTER, CENTER);
	textSize(16);

	a = map(0.5, 0, 1, aLow, aHigh);
	b = map(0.5, 0, 1, bLow, bHigh);
}

function draw() {
	background('#000000');

	for (var i = 0; i < n; i += 3) {
		var x = a * e ** (b * i) * cos(i);
		var y = a * e ** (b * i) * sin(i);

		fill(color(random(255), random(255), random(255)));

		text(String.fromCharCode(random(32, 127)), width / 2 + x, height / 2 + y);
	}

	if (aUp) {
		if (a < aHigh) {
			a += aStep;
		} else {
			aUp = ! aUp;
		}
	} else {
		if (a > aLow) {
			a -= aStep;
		} else {
			aUp = ! aUp;
		}
	}

	if (bUp) {
		if (b < bHigh) {
			b += bStep;
		} else {
			bUp = ! bUp;
		}
	} else {
		if (b > aLow) {
			b -= bStep;
		} else {
			bUp = ! bUp;
		}
	}
}