class Snake {

	constructor(coordinates, vector, character) {
		this.coordinates = coordinates;
		this.vector      = vector;
		this.character   = character;
	}

	display() {
		text(this.character, this.coordinates.x * settings.columnWidth, this.coordinates.y * settings.rowHeight);
	}

	move() {
		this.coordinates.x += this.vector.x;
		this.coordinates.y += this.vector.y;

		if (
			this.coordinates.x < 0                    ||
			this.coordinates.x > settings.columns - 1 ||
			this.coordinates.y < 0                    ||
			this.coordinates.y > settings.rows    - 1
		) {
			this.vector    = randomVector();
			this.character = randomCharacter();
		}
	}
}

const settings = {
	numberOfSnakes : 20,
	maximumSpeed   :  3,
};

setup = () => {
	createCanvas(windowWidth, windowHeight);
	frameRate(30);
	background('#000000');

	textFont('Menlo');
	textAlign(LEFT, TOP);
	textSize(12);
	fill('#00f72c');

	settings.columnWidth = Math.round(textWidth(' '));
	settings.rowHeight   = 11;

	settings.columns = Math.ceil(width  / settings.columnWidth);
	settings.rows    = Math.ceil(height / settings.rowHeight);

	settings.snakes = Array.from({length: settings.numberOfSnakes}, () => {
		const coordinates = randomCoordinates();
		const vector      = randomVector();
		const character   = randomCharacter();

		return new Snake(coordinates, vector, character);
	});
}

draw = () => {
	background(0, 20);

	settings.snakes.forEach(snake => {
		snake.display();
		snake.move();
	});
}

const randomCharacter = () => String.fromCharCode(randomIntegerInclusive(32, 127))

const randomCoordinates = () => {
	const x = randomIntegerInclusive(0, settings.columns - 1);
	const y = randomIntegerInclusive(0, settings.rows    - 1);
	return {x, y};
}

const randomVector = () => {
	const [x, y] = Array.from({length: 2}, () => randomIntegerInclusive(1, settings.maximumSpeed) * (coin(0.5) ? -1 : 1));
	return {x, y};
}