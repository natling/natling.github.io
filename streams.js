const settings = {
	numberOfStreams : 50,
};

setup = () => {
	createCanvas(windowWidth, windowHeight);
	background('#000000');

	textFont('Menlo');
	textSize(12);
	textAlign(LEFT, TOP);
	fill('#00f72c');

	settings.columnWidth = Math.round(textWidth(' '));
	settings.rowHeight   = 30;

	settings.columns = Math.ceil(width  / settings.columnWidth);
	settings.rows    = Math.ceil(height / settings.rowHeight);

	settings.lines              = Array.from({length: settings.rows}, () => emptyLine());
	settings.locationsOfStreams = Array.from({length: settings.numberOfStreams}, () => int(random(settings.columns)));
}

draw = () => {
	background('#000000');

	for (let i = 0; i < settings.rows; i++) {
		text(settings.lines[i].join(''), 0, i * settings.rowHeight);
	}

	const newLine = emptyLine();

	for (let i = 0; i < settings.numberOfStreams; i++) {
		newLine[settings.locationsOfStreams[i]] = String.fromCharCode(random(32, 127));
		settings.locationsOfStreams[i] = walk(settings.locationsOfStreams[i], 0.9, 0, settings.columns - 1);
	}

	settings.lines.shift();
	settings.lines.push(newLine);
}

const walk = (start, p, low, high) => {
	while (true) {
		let newStart = start;

		if (coin(p)) {
			newStart += coin(0.5) ? 1 : -1;
		}

		if (newStart >= low && newStart <= high) {
			return newStart;
		}
	}
}

const emptyLine = () => Array.from({length: settings.columns}, () => ' ')