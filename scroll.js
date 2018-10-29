class Line {

	constructor(length, density, direction, speed, color) {
		this.length         = length;
		this.density        = density;
		this.direction      = direction;
		this.speed          = speed;
		this.color          = color;
		this.characterArray = Array.from({length: length}, v => coin(density) ? randomCharacter() : ' ');
	}

	paddedString() {
		const string = this.characterArray.join('');
		return this.direction ? string.padStart(settings.columns) : string.padEnd(settings.columns);
	}

	move() {
		this.characterArray = rotateArray(this.characterArray, this.speed, this.direction);
	}
}

const settings = {
	speed : {
		min : 1,
		max : 5,
	},
};

setup = () => {
	createCanvas(windowWidth, windowHeight);
	frameRate(30);
	background('#000000');

	textFont('Menlo');
	textSize(12);
	textAlign(LEFT, TOP);
	// fill('#00f72c');

	settings.columnWidth = Math.round(textWidth(' '));
	settings.rowHeight   = 11;

	settings.columns = Math.ceil(width  / settings.columnWidth);
	settings.rows    = Math.ceil(height / settings.rowHeight);

	settings.lines = Array.from({length: settings.rows}, () => createLine());
}

draw = () => {
	background('#000000');

	for (let i = 0; i < settings.rows; i++) {
		fill(settings.lines[i].color);
		text(settings.lines[i].paddedString(), 0, i * settings.rowHeight);
		settings.lines[i].move();
	}

	settings.lines.shift();
	settings.lines.push(createLine());
}

const createLine = () => {
	const length    = randomIntegerInclusive(1, settings.columns);
	const density   = random();
	const direction = coin(0.5);
	const speed     = randomIntegerInclusive(settings.speed.min, settings.speed.max);
	const col       = color(random(255), random(255), random(255));

	return new Line(length, density, direction, speed, col);
}

const randomCharacter = () => String.fromCharCode(randomIntegerInclusive(32, 127))