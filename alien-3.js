var letterHeight           =  30,
	letterWidth            =  50,
	spaceBetweenLines      =  20,
	spaceBetweenCharacters = -25,
	rowHeight              = letterHeight + spaceBetweenLines,
	columnWidth            = letterWidth + spaceBetweenCharacters;

var speed = 5;

var rows, columns, marginGlobal, marginHorizontal, marginVertical, lineArray = [], spectrogram, imageBuffer, pixelsArraySize;
var frame = 0, writingDuration, pauseDuration = 100, fadeDuration = 300;

function preload() {
	spectrogram = loadImage('files/spectrogram-6.png');
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
					var numberOfPoints = int(random(10, 12));
					var weight         = 1;
					// var weight         = random(0.5, 1.0);

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
		if (frame > writingDuration + pauseDuration) {
			tint(255, map(frame, writingDuration + pauseDuration, writingDuration + pauseDuration + fadeDuration, 0, 255));
			image(spectrogram, 0, 0, width, height);
		}
	}

	frame++;
}

function drawCharacter(x, y, w, h, numberOfPoints, weight) {
	pointsArray = [];

	for (var i = 0; i < numberOfPoints; i++) {
		var newX, newY;

		if (i == 0) {
			newX = random(x, x + w);
			newY = random(y, y + h);
		} else {
			if (i % 2 == 0) {
				newX = random(x, x + w);
				newY = pointsArray[i - 1][1]
			} else {
				newX = pointsArray[i - 1][0]
				newY = random(y, y + h);
			}
		}

		pointsArray.push([newX, newY]);
	}

	strokeWeight(weight);
	stroke(255);
	noFill();

	beginShape();

	for (var i = 0; i < pointsArray.length - 1; i++) {
		var x = pointsArray[i][0];
		var y = pointsArray[i][1];

		if (random() < 0.5) {
			x += int(random(-2, 2));
			y += int(random(-2, 2));
		}

		vertex(x, y);
	}

	endShape();
}