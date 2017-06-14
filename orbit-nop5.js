var frameRate = 30;

var speed = 10;
var consistency, density, xCoefficient, yCoefficient, direction;
var columns, rows, columnWidth, rowHeight, characterArray = [];

function setup() {
	var width  = window.innerWidth;
	var height = window.innerHeight;

	columnWidth = 7;
	rowHeight = 11;

	columns = Math.floor(width / columnWidth);
	rows = Math.floor(height / rowHeight);

	consistency  = randomFloat(0.01, 0.1);
	density      = randomFloat(0.1, 1.0);
	xCoefficient = randomFloat(1.0, 1.7);
	yCoefficient = randomFloat(1.0, 1.7);
	direction    = Math.random() < 0.5;

	console.log('consistency ' + consistency);
	console.log('density ' + density);
	console.log('xCoefficient ' + xCoefficient);
	console.log('yCoefficient ' + yCoefficient);
	console.log('direction ' + direction);

	currentCharacter = randomCharacter(density);

	for (var i = 0; i < columns * rows; i++) {
		characterArray.push(currentCharacter);
		if (Math.random() < consistency) {
			currentCharacter = randomCharacter(density);
		}
	}
}

function draw() {
	var elements = document.getElementsByTagName('p');
	while (elements[0]) elements[0].parentNode.removeChild(elements[0]);

	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < columns; i++) {
			var p = document.createElement("p");
			var character = document.createTextNode(characterArray[Math.round(i ** xCoefficient + j ** yCoefficient) % characterArray.length]);

			p.style.left = i * columnWidth + 'px';
			p.style.top = j * rowHeight + 'px';

			document.body.appendChild(p);
			p.appendChild(character);
		}
	}

	characterArray = rotateArray(characterArray, speed, direction);
}

function randomCharacter(p) {
	if (Math.random() < p) {
		return String.fromCharCode(randomIntegerInclusive(32, 127));
	} else {
		return ' ';
	}
}

setup();
setInterval(draw, 1 / frameRate * 1000);