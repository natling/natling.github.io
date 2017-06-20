var t = 0;

var xScale  = randomFloat(0.005, 0.03);
var yScale  = randomFloat(0.005, 0.03);
var tScale  = randomFloat(0.005, 0.03);
var density = randomFloat(0.1, 1.0);

console.log(xScale, yScale, tScale, density);

var characters = [];

for (var i = 32; i < 128; i++) {
	if (coin(density)) {
		characters.push(String.fromCharCode(i));
	} else {
		characters.push(' ');
	}
}

shuffleArray(characters);

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background('#000000');

	textFont('Menlo');
	textAlign(LEFT, TOP);
	textSize(16);
	fill('#00f72c');

	columnWidth = Math.round(textWidth(' '));
	rowHeight = 15;

	columns = Math.floor(width / columnWidth);
	rows = Math.floor(height / rowHeight);
}

function draw() {
	background('#000000');

	for (var y = 0; y < rows; y++) {
		for (var x = 0; x < columns; x++) {
			var noiseRaw = noise(x * xScale, y * yScale, t * tScale);
			var noiseMapped = int(map(noiseRaw, 0, 1, 0, characters.length));
			text(characters[noiseMapped], x * columnWidth, y * rowHeight);
		}
	}

	t++;
}