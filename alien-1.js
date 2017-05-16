var letterHeight           = 45,
	letterWidth            = 15,
	spaceBetweenLines      = 10,
	spaceBetweenCharacters =  0,
	rowHeight              = letterHeight + spaceBetweenLines,
	columnWidth            = letterWidth + spaceBetweenCharacters;

var speed = 5;

var rows, columns, marginGlobal, marginHorizontal, marginVertical, lineArray = [], spectrogram, imageBuffer, pixelsArraySize, frame = 0;

function preload() {
	spectrogram = loadImage('files/spectrogram-8.png');
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
}

function draw() {
	if (frame < rows * columns / speed) {
		for (var j = 0; j < rows; j++) {
			for (var i = 0; i < columns; i++) {
				if (int((j * columns + i) / speed) == frame) {
					var x              = columnWidth * i + marginGlobal + marginHorizontal + spaceBetweenCharacters / 2;
					var y              = rowHeight   * j + marginGlobal + marginVertical   + spaceBetweenLines      / 2;
					var w              = letterWidth;
					var h              = letterHeight;
					var numberOfPoints = int(random(6, 15));
					var weight         = random(0.5, 1.0);

					drawCharacter(x, y, w, h, numberOfPoints, weight);
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
		tint(255, frame - rows * columns / speed);
		image(spectrogram, 0, 0, width, height);
	}

	frame++;
}

function drawCharacter(x, y, w, h, numberOfPoints, weight) {
	pointsArray = [];

	for (var i = 0; i < numberOfPoints; i++) {
		newX = random(x, x + w);
		newY = random(y, y + h);

		pointsArray.push([newX, newY]);
	}

	strokeWeight(weight);
	stroke(255);
	noFill();

	beginShape();

	for (var i = 0; i < pointsArray.length; i++) {
		var x = pointsArray[i][0];
		var y = pointsArray[i][1];
		curveVertex(x, y);
	}

	endShape();
}