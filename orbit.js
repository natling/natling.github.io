const settings = {
	speed : 10,

	characterArray : [],
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

	// settings.consistency  = 0.07;
	// settings.density      = 0.6;
	// settings.xCoefficient = 1.5;
	// settings.yCoefficient = 1.5;
	// settings.direction    = false;

	settings.consistency  = random(0.01, 0.1);
	settings.density      = random(0.1, 1.0);
	settings.xCoefficient = random(1.0, 1.7);
	settings.yCoefficient = random(1.0, 1.7);
	settings.direction    = coin(0.5);

	console.log('consistency '  + settings.consistency);
	console.log('density '      + settings.density);
	console.log('xCoefficient ' + settings.xCoefficient);
	console.log('yCoefficient ' + settings.yCoefficient);
	console.log('direction '    + settings.direction);

	let currentCharacter = randomCharacter(settings.density);

	for (let i = 0; i < settings.columns * settings.rows; i++) {
		settings.characterArray.push(currentCharacter);
		if (coin(settings.consistency)) {
			currentCharacter = randomCharacter(settings.density);
		}
	}
}

draw = () => {
	background('#000000');

	for (let j = 0; j < settings.rows; j++) {
		for (let i = 0; i < settings.columns; i++) {
			text(settings.characterArray[Math.round(i ** settings.xCoefficient + j ** settings.yCoefficient) % settings.characterArray.length], i * settings.columnWidth, j * settings.rowHeight);
		}
	}

	settings.characterArray = rotateArray(settings.characterArray, settings.speed, settings.direction);
}

const randomCharacter = p => coin(p) ? String.fromCharCode(random(32, 127)) : ' '