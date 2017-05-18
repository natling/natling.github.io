var letterHeight           = 50,
	letterWidth            = 50,
	spaceBetweenLines      = 10,
	spaceBetweenCharacters = 10,
	rowHeight              = letterHeight + spaceBetweenLines,
	columnWidth            = letterWidth + spaceBetweenCharacters;

var speed = 2;

var rows, columns, marginGlobal, marginHorizontal, marginVertical, lineArray = [], spectrogram, imageBuffer, pixelsArraySize;
var frame = 0, writingDuration, pauseDuration = 100, fadeDuration = 300;

function preload() {
	spectrogram = loadImage('files/spectrogram-5.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	pixelsArraySize = 4 * (width * pixelDensity()) * (height * pixelDensity());

	image(spectrogram, 0, 0, width, height);
	loadPixels();
	imageBuffer = pixels;

	background(0);

	marginGlobal     = 0;
	rows             = int((height - marginGlobal * 2) / rowHeight);
	columns          = int((width - marginGlobal * 2) / columnWidth);
	marginVertical   = 0;
	marginHorizontal = 0;

	writingDuration = rows * columns / speed;
}

function draw() {
	if (frame < writingDuration) {
		for (var j = 0; j < rows; j++) {
			for (var i = 0; i < columns; i++) {
				if (int((j * columns + i) / speed) == frame) {
					var x              = columnWidth * i + marginGlobal + marginHorizontal + spaceBetweenCharacters / 2;
					var y              = rowHeight   * j + marginGlobal + marginVertical   + spaceBetweenLines      / 2;
					var w              = letterWidth;
					var h              = letterHeight;
					var numberOfLayers = int(random(1, 6));
					var weight         = random(0.8, 1.5);

					drawCharacter(x, y, w, h, numberOfLayers, weight);
				}
			}
		}

		loadPixels();

		for (var i = 0; i < pixelsArraySize; i += 4) {
			var isWhite = pixels[i] != 0;

			if (isWhite) {
				pixels[i] = imageBuffer[i];
				pixels[i+1] = imageBuffer[i+1];
				pixels[i+2] = imageBuffer[i+2];
				pixels[i+3] = imageBuffer[i+3];
			}
		}

		updatePixels();

	} else {
		if (frame > writingDuration + pauseDuration) {
			tint(255, map(frame, writingDuration + pauseDuration, writingDuration + pauseDuration + fadeDuration, 0, 255));
			image(spectrogram, 0, 0, width, height);
		}
	}

	frame++;
}

function drawCharacter(x, y, w, h, numberOfLayers, weight) {

	strokeWeight(weight);
	stroke(255);
	noFill();

	for (var j = 0; j < numberOfLayers; j++) {
		var offset = j * 5;
		var corners = [ [x + offset, y + offset], [x + w - offset, y + offset], [x + w - offset, y + h - offset], [x + offset, y + h - offset] ];
		var numberOfSides = int(random(1, 5));
		var orientation = int(random(4));

		beginShape();

		for (var i = 0; i < numberOfSides + 1; i++) {
			var newX = corners[(i + orientation) % corners.length][0] + random(-1, 1);
			var newY = corners[(i + orientation) % corners.length][1] + random(-1, 1);

			vertex(newX, newY);
		}

		endShape();
	}
}