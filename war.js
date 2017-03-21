var uniqueCharacters = 10,
	speedMax         = 3,
	speedMin         = 7;

var columns, rows, columnWidth, rowHeight, characterArray = [], centers = [], speeds = [], densities = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background('#000000');

	textFont('Menlo');
	textAlign(LEFT, TOP);
	fill('#00f72c');

	columnWidth = Math.round(textWidth(' '));
	rowHeight = 11;

	columns = Math.floor(width / columnWidth);
	rows = Math.floor(height / rowHeight);

	for (var i = 0; i < uniqueCharacters; i++) {
		if (random() < 0.6) {
			characterArray.push(String.fromCharCode(random(32, 127)));
		} else {
			characterArray.push(' ');
		}
		centers.push([int(random(columns)), int(random(rows))]);
		speeds.push(int(random(speedMin, speedMax)));
		densities.push(random());
	}
}

function draw() {
	background('#000000');

	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < columns; i++) {
			var distances = [];

			for (var k = 0; k < uniqueCharacters; k++) {
				distances.push(distanceBetweenCells([[i, j], centers[k]]));
			}

			var army = minIndex(distances);

			if (random() < densities[army]) {
				text(characterArray[army], i * columnWidth, j * rowHeight);
			}
		}
	}

	for (var i = 0; i < uniqueCharacters; i++) {
		centers[i][0] = randomWalk(centers[i][0], 0, columns, speeds[i]);
		centers[i][1] = randomWalk(centers[i][1], 0, rows, speeds[i]);
	}
}

function distanceBetweenCells (coordinateArray) {
	var x1 = coordinateArray[0][0];
	var y1 = coordinateArray[0][1];
	var x2 = coordinateArray[1][0];
	var y2 = coordinateArray[1][1];
	return sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
}

function minIndex(array) {
	var minIndex = 0;
	for (var i = 0; i < array.length; i++) {
		if (array[i] < array[minIndex]) {
			minIndex = i;
		}
	}
	return minIndex;
}

function randomWalk(start, low, high, step) {
	while (true) {
		var newStart = start + int(random(-(step + 1), (step + 1)));
		if (newStart >= low && newStart <= high) {
			return newStart;
		}
	}
}