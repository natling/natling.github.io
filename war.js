const settings = {
	uniqueCharacters : 10,

	speed : {
		min : 7,
		max : 3,
	},
};

setup = () => {
	createCanvas(windowWidth, windowHeight);
	background('#000000');

	textFont('Menlo');
	textAlign(LEFT, TOP);
	fill('#00f72c');

	settings.columnWidth = Math.round(textWidth(' '));
	settings.rowHeight   = 11;

	settings.columns = Math.ceil(width  / settings.columnWidth);
	settings.rows    = Math.ceil(height / settings.rowHeight);

	settings.characterArray = Array.from({length: settings.uniqueCharacters}, () => coin(0.6) ? String.fromCharCode(random(32, 127)) : ' ');
	settings.centers        = Array.from({length: settings.uniqueCharacters}, () => [int(random(settings.columns)), int(random(settings.rows))]);
	settings.speeds         = Array.from({length: settings.uniqueCharacters}, () => int(random(settings.speed.min, settings.speed.max)));
	settings.densities      = Array.from({length: settings.uniqueCharacters}, () => random());
}

draw = () => {
	background('#000000');

	for (let j = 0; j < settings.rows; j++) {
		for (let i = 0; i < settings.columns; i++) {
			settings.distances = Array.from({length: settings.uniqueCharacters}, (_, k) => distanceBetweenCells([[i, j], settings.centers[k]]));

			const army = settings.distances.indexOf(Math.min(...settings.distances));

			if (coin(settings.densities[army])) {
				text(settings.characterArray[army], i * settings.columnWidth, j * settings.rowHeight);
			}
		}
	}

	for (let i = 0; i < settings.uniqueCharacters; i++) {
		settings.centers[i][0] = randomWalk(settings.centers[i][0], 0, settings.columns, settings.speeds[i]);
		settings.centers[i][1] = randomWalk(settings.centers[i][1], 0, settings.rows,    settings.speeds[i]);
	}
}

const distanceBetweenCells = coordinateArray => {
	const x1 = coordinateArray[0][0];
	const y1 = coordinateArray[0][1];
	const x2 = coordinateArray[1][0];
	const y2 = coordinateArray[1][1];
	return sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
}

const randomWalk = (start, low, high, step) => {
	while (true) {
		const newStart = start + int(random(-(step + 1), (step + 1)));
		if (newStart >= low && newStart <= high) {
			return newStart;
		}
	}
}