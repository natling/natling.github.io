var a = 100;
var b = 0.01;

var n = 10000;

var e = 2.71828;

var density = 1.0;
var characterArray = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background('#000000');

	textFont('Menlo');
	textAlign(CENTER, CENTER);
	fill('#00f72c');

	for (var i = 0; i < n; i++) {
		if (random() < density) {
			characterArray.push(String.fromCharCode(random(32, 127)));
		} else {
			characterArray.push(' ');
		}
	}

	for (var i = 0; i < n; i++) {
		var x = a * e ** (b * i) * cos(i);
		var y = a * e ** (b * i) * sin(i);
		// console.log(x, y);

		// text(characterArray[i], width / 2 + x, height / 2 + y);
		text('o', width / 2 + x, height / 2 + y);
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