const settings = {
	colors : 3,

	colorSpeed  : 10,
	centerSpeed :  4,
};

settings.rgb     = create2DArray(3, settings.colors);
settings.centers = create2DArray(settings.colors, 2);

setup = () => {
	createCanvas(windowWidth, windowHeight);
	background(0);
	frameRate(10);

	textFont('Menlo');
	textAlign(LEFT, TOP);
	textSize(20);

	settings.charWidth = textWidth(' ');

	settings.gridWidth  = settings.charWidth * 1.3;
	settings.gridHeight = settings.charWidth * 1.7;

	settings.columns = int(width  / settings.gridWidth);
	settings.rows    = int(height / settings.gridHeight);

	for (let i = 0; i < settings.colors; i++) {
		for (let j = 0; j < 3; j++) {
			settings.rgb[j][i] = int(random(256));
		}
	}

	for (let i = 0; i < settings.colors; i++) {
		settings.centers[i][0] = int(random(settings.columns));
		settings.centers[i][1] = int(random(settings.rows));
	};
}

draw = () => {
	background(0);

	for (let i = 0; i < settings.columns; i++) {
		for (let j = 0; j < settings.rows; j++) {

			if (coin(0.5)) {
				const weights = new Array(settings.colors);

				for (let m = 0; m < settings.colors; m++) {
					const distance = sqrt(sq(i - settings.centers[m][0]) + sq(j - settings.centers[m][1]));
					//weights[m] = 1 / (distance + 1);
					weights[m] = 1 / sq(distance + 1);
				};

				fill(
					weightedAverage(settings.rgb[0], weights),
					weightedAverage(settings.rgb[1], weights),
					weightedAverage(settings.rgb[2], weights),
					random(256)
				);

				const randomCharacter = String.fromCharCode(random(32, 127));
				text(randomCharacter, i * settings.gridWidth, j * settings.gridHeight);
			}
		}
	}

	for (let i = 0; i < settings.colors; i++) {
		for (let j = 0; j < 3; j++) {
			settings.rgb[j][i] = randomWalk(settings.rgb[j][i], 0, 255, settings.colorSpeed);
		}
	}

	for (let i = 0; i < settings.colors; i++) {
		settings.centers[i][0] = randomWalk(settings.centers[i][0], 0, settings.columns, settings.centerSpeed);
		settings.centers[i][1] = randomWalk(settings.centers[i][1], 0, settings.rows, settings.centerSpeed);
	}
}

const randomWalk = (start, low, high, step) => {
	while (true) {
		const newStart = start + int(random(-(step + 1), step + 1));
		if (newStart >= low && newStart <= high) {
			return newStart;
		}
	}
}