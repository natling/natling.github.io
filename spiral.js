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
// var characterArray = [];
// var colorArray = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background('#000000');
	frameRate(10);

	textFont('Menlo');
	textAlign(CENTER, CENTER);
	fill('#00f72c');

	a = map(0.5, 0, 1, aLow, aHigh);
	b = map(0.5, 0, 1, bLow, bHigh);

	// a = aLow;
	// b = bLow;

	// for (var i = 0; i < n; i++) {
	// 	if (random() < density) {
	// 		characterArray.push(String.fromCharCode(random(32, 127)));
	// 	} else {
	// 		characterArray.push(' ');
	// 	}
	// }
}

function draw() {
	background('#000000');

	for (var i = 0; i < n; i += 3) {
		var x = a * e ** (b * i) * cos(i);
		var y = a * e ** (b * i) * sin(i);

		// text(characterArray[i], width / 2 + x, height / 2 + y);
		text(String.fromCharCode(random(32, 127)), width / 2 + x, height / 2 + y);
		// text('o', width / 2 + x, height / 2 + y);
	}

	// characterArray = arrayRotate(characterArray, 1, true);

	// a = walk(a, aLow, aHigh, aStep, aUp);
	// b = walk(b, bLow, bHigh, bStep, bUp);

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

function arrayRotate(array, distance, direction) {
	for (var i = 0; i < distance; i++) {
		if (direction) {
			array.unshift(array.pop());
		} else {
			array.push(array.shift());
		}
	}
	return array;
}

// function randomWalk(start, low, high, step) {
// 	while (true) {
// 		var newStart = start + int(random(-(step + 1), (step + 1)));
// 		if (newStart >= low && newStart <= high) {
// 			return newStart;
// 		}
// 	}
// }

// function walk(currentValue, low, high, step, direction) {
// 	if (direction) {
// 		if (currentValue < high) {
// 			newValue = currentValue + step;
// 		} else {
// 			direction = ! direction;
// 		}
// 	} else {
// 		if (currentValue > low) {
// 			newValue = currentValue - step;
// 		} else {
// 			direction = ! direction;
// 		}
// 	}
// 	return newValue;
// }