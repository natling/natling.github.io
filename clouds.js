const settings = {
	scale : {
		x : randomFloat(0.005, 0.03),
		y : randomFloat(0.005, 0.03),
		t : 0.005,
	},

	variety : randomIntegerInclusive(3, 10),

	threshold            : 0.4,
	characterChangeSpeed : 0.1,
};

console.log(settings.scale.x, settings.scale.y, settings.scale.t, settings.variety);

settings.characters = Array.from({length: 127 - 33}, (_, i) => String.fromCharCode(33 + i));

settings.currentCharacters = Array.from({length: settings.variety}, () => randomItem(settings.characters));

setup = () => {
	createCanvas(windowWidth, windowHeight);
	background('#000000');

	textFont('Menlo');
	textAlign(LEFT, TOP);
	textSize(16);
	fill('#00f72c');

	settings.columnWidth = Math.round(textWidth(' '));
	settings.rowHeight   = 15;

	settings.columns = Math.ceil(width  / settings.columnWidth);
	settings.rows    = Math.ceil(height / settings.rowHeight);
}

draw = () => {
	background('#000000');

	for (let y = 0; y < settings.rows; y++) {
		for (let x = 0; x < settings.columns; x++) {
			const noiseRaw = noise(x * settings.scale.x, y * settings.scale.y, frameCount * settings.scale.t);
			if (noiseRaw < settings.threshold) {
				text(randomItem(settings.currentCharacters), x * settings.columnWidth, y * settings.rowHeight);
			}
		}
	}

	if (coin(settings.characterChangeSpeed)) {
		shuffleArray(settings.currentCharacters);
		settings.currentCharacters.pop();
		settings.currentCharacters.push(randomItem(settings.characters));
	}
}