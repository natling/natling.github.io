var charWidth,
	gridWidth,
	gridHeight,

	colors = 3,

	colorSpeed = 10,
	centerSpeed = 4,

	columns,
	rows,

	rgb = create2DArray(3, colors),
	centers = create2DArray(colors, 2);

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	noCursor();
	frameRate(10);

	textFont('Menlo');
	textAlign(LEFT, TOP);
	textSize(20);

	charWidth = textWidth(' ');

	gridWidth = charWidth * 1.3;
	gridHeight = charWidth * 1.7;

	columns = int(width / gridWidth);
	rows = int(height / gridHeight);

	for (var i = 0; i < colors; i++) {
		for (var j = 0; j < 3; j++) {
			rgb[j][i] = int(random(256));
		}
	}

	for (var i = 0; i < colors; i++) {
		centers[i][0] = int(random(columns));
		centers[i][1] = int(random(rows));
	};
}

function draw() {
	background(0);

	for (var i = 0; i < columns; i++) {
		for (var j = 0; j < rows; j++) {

			if (random(1) < 0.5) {

				var weights = new Array(colors);

				for (var m = 0; m < colors; m++) {
					var distance = sqrt(sq(i - centers[m][0]) + sq(j - centers[m][1]));
					//weights[m] = 1 / (distance + 1);
					weights[m] = 1 / sq(distance + 1);
				};

				fill(
					weightedAverage(rgb[0], weights),
					weightedAverage(rgb[1], weights),
					weightedAverage(rgb[2], weights),
					random(256)
				);

				randomCharacter = String.fromCharCode(random(32, 127));
				text(randomCharacter, i * gridWidth, j * gridHeight);
			}
		}
	}

	for (var i = 0; i < colors; i++) {
		for (var j = 0; j < 3; j++) {
			rgb[j][i] = randomWalk(rgb[j][i], 0, 255, colorSpeed);
		}
	}

	for (var i = 0; i < colors; i++) {
		centers[i][0] = randomWalk(centers[i][0], 0, columns, centerSpeed);
		centers[i][1] = randomWalk(centers[i][1], 0, rows, centerSpeed);
	}
}

function randomWalk(start, low, high, step) {
	while (true) {
		var newStart = start + int(random(-(step + 1), step + 1));
		if (newStart >= low && newStart <= high) {
			return newStart;
		}
	}
}