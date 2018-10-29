const settings = {
	scale : {
		x : randomFloat(0.005, 0.03),
		y : randomFloat(0.005, 0.03),
		t : randomFloat(0.005, 0.03),
	},

	density : randomFloat(0.1, 1.0),
};

console.log(settings.scale.x, settings.scale.y, settings.scale.t, settings.density);

settings.characters = Array.from({length: 128 - 32}, (_, i) => coin(settings.density) ? String.fromCharCode(32 + i) : ' ');

shuffleArray(settings.characters);

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
			const noiseMapped = int(map(noiseRaw, 0, 1, 0, settings.characters.length));
			text(settings.characters[noiseMapped], x * settings.columnWidth, y * settings.rowHeight);
		}
	}
}