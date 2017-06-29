var t = 0;

var xScale  = randomFloat(0.005, 0.03);
var yScale  = randomFloat(0.005, 0.03);
var tScale  = 0.005;
var variety = randomIntegerInclusive(3, 10);

var threshold            = 0.4;
var characterChangeSpeed = 0.1;

console.log(xScale, yScale, tScale, variety);

var characters = [];

for (var i = 33; i < 127; i++) {
	characters.push(String.fromCharCode(i));
}

var currentCharacters = [];

for (var i = 0; i < variety; i++) {
	currentCharacters.push(randomItem(characters));
}

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
			if (noiseRaw < threshold) {
				text(randomItem(currentCharacters), x * columnWidth, y * rowHeight);
			}
		}
	}

	if (coin(characterChangeSpeed)) {
		shuffleArray(currentCharacters);
		currentCharacters.pop();
		currentCharacters.push(randomItem(characters));
	}

	t++;
}