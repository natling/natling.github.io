const settings = {
	density :   0.7,
	layers  : 100,
	scale   :   9,
};

setup = () => {
	createCanvas(windowWidth, windowHeight);
	background('#000000');

	textFont('Menlo');
	textAlign(CENTER, CENTER);
	// fill('#00f72c');

	settings.characterArrays = Array.from({length: settings.layers}, (_, r) => {
		return Array.from({length: r * 5}, () => coin(settings.density) ? String.fromCharCode(random(32, 127)) : ' ');
	});

	settings.rotations = Array.from({length: settings.layers}, (_, r) => {
		const speed     = int(random(1, 3));
		const direction = coin(0.5);

		return {speed, direction};
	});

	settings.colors = Array.from({length: settings.layers}, (_, r) => color(random(255), random(255), random(255)));
}

draw = () => {
	background('#000000');

	for (let r = 0; r < settings.layers; r++) {
		const n = r * 5;
		
		for (let i = 0; i < n; i++) {
			const x = r * settings.scale * cos(TAU / n * i);
			const y = r * settings.scale * sin(TAU / n * i);

			fill(settings.colors[r]);
			text(settings.characterArrays[r][i], width / 2 + x, height / 2 + y);
		}

		settings.characterArrays[r] = rotateArray(settings.characterArrays[r], settings.rotations[r].speed, settings.rotations[r].direction);
	}
}