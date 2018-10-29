const settings = {
	speed : 10,
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

	let currentCharacter = String.fromCharCode(randomIntegerInclusive(32, 127));

	settings.characters = [];

	for (let i = 0; i < settings.columns * settings.rows; i++) {
		settings.characters.push(currentCharacter);
		if (coin(0.1)) {
			currentCharacter = String.fromCharCode(randomIntegerInclusive(32, 127));
		}
	}
}

draw = () => {
	background('#000000');

	for (let j = 0; j < settings.rows; j++) {
		for (let i = 0; i < settings.columns; i++) {
			text(settings.characters[i * j + i], i * settings.columnWidth, j * settings.rowHeight);
		}
	}

	settings.characters = rotateArray(settings.characters, settings.speed);
}