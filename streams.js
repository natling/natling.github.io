numberOfStreams = 50;
probabilityOfMoving = 0.9;

lineArray = [], locationsOfStreams = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background('#000000');

	textFont('Menlo');
	textSize(12);
	textAlign(LEFT, TOP);
	fill('#00f72c');

	columnWidth = Math.round(textWidth(' '));
	rowHeight = 30;

	columns = Math.floor(width / columnWidth);
	rows = Math.floor(height / rowHeight);

	var emptyLine = new Array(columns);
	emptyLine.fill(' ');

	for (var i = 0; i < rows; i++) {
		lineArray.push(emptyLine);
	}

	for (var i = 0; i < numberOfStreams; i++) {
		locationsOfStreams[i] = int(random(columns));
	}
}

function draw() {
	background('#000000');

	for (var i = 0; i < rows; i++) {
		text(lineArray[i].join(''), 0, i * rowHeight);
	}

	var newLine = new Array(columns);
	newLine.fill(' ');

	for (var i = 0; i < numberOfStreams; i++) {
		newLine[locationsOfStreams[i]] = String.fromCharCode(random(32, 127));
		locationsOfStreams[i] = walk(locationsOfStreams[i], 0.9, 0, columns - 1);
	}

	lineArray.shift();
	lineArray.push(newLine);
}

function walk(start, p, low, high) {
	while (true) {
		newStart = start;
		if (random() < p) {
			if (random() < 0.5) {
				newStart++;
			} else {
				newStart--;
			}
		}
		if (newStart >= low && newStart <= high) {
			return newStart;
		}
	}
}