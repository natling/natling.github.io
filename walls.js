class Stream {

	constructor(column, direction, speed, character) {
		this.column    = column;
		this.direction = direction;
		this.speed     = speed;
		this.character = character;
	}

	move() {
		if (this.direction) {
			this.column -= this.speed;
			if (this.column < 0) {
				this.column = 0;
				this.bounce();
			}
		} else {
			this.column += this.speed;
			if (this.column > settings.columns - 1) {
				this.column = settings.columns - 1;
				this.bounce();
			}
		}
	}

	bounce() {
		this.direction = ! this.direction;
		this.speed = int(random(1, settings.maximumSpeed));
		this.changeCharacter();
	}

	changeCharacter() {
		this.character = randomCharacter();
	}
}

const settings = {
	numberOfStreams : 10,
	maximumSpeed    :  5,
};

setup = () => {
	createCanvas(windowWidth, windowHeight);
	frameRate(30);
	background('#000000');

	textFont('Menlo');
	textSize(12);
	textAlign(LEFT, TOP);
	fill('#00f72c');

	settings.columnWidth = Math.round(textWidth(' '));
	settings.rowHeight   = 11;

	settings.columns = Math.ceil(width  / settings.columnWidth);
	settings.rows    = Math.ceil(height / settings.rowHeight);

	settings.lines = Array.from({length: settings.rows}, () => emptyLine(settings.columns));

	settings.streams = Array.from({length: settings.numberOfStreams}, () => {
		const column    = int(random(0, settings.columns - 1));
		const direction = coin(0.5);
		const speed     = int(random(1, settings.maximumSpeed));
		const character = randomCharacter();

		return new Stream(column, direction, speed, character);
	});
}

draw = () => {
	background('#000000');

	for (let i = 0; i < settings.rows; i++) {
		text(settings.lines[i].join(''), 0, i * settings.rowHeight);
	}

	const newLine = emptyLine(settings.columns);

	for (let i = 0; i < settings.numberOfStreams; i++) {
		newLine[settings.streams[i].column] = settings.streams[i].character;
		settings.streams[i].move();
	}

	settings.lines.shift();
	settings.lines.push(newLine);
}

const emptyLine = width => Array.from({length: width}, () => ' ')

const randomCharacter = () => String.fromCharCode(random(32, 127))