var letterHeight           =  35,
	letterWidth            =  25,
	spaceBetweenLines      = -20,
	spaceBetweenCharacters =  15,
	rowHeight              = letterHeight + spaceBetweenLines,
	columnWidth            = letterWidth + spaceBetweenCharacters;

var speed = 5;

var rows, columns, marginGlobal, marginHorizontal, marginVertical, lineArray = [], spectrogram, imageBuffer, pixelsArraySize;
var frame = 0, writingDuration, pauseDuration = 100, fadeDuration = 300;

function preload() {
	spectrogram = loadImage('files/spectrogram-3.png');
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
				if (int((i * rows + j) / speed) == frame) {
					var x              = columnWidth * i + marginGlobal + marginHorizontal + spaceBetweenCharacters / 2;
					var y              = rowHeight   * j + marginGlobal + marginVertical   + spaceBetweenLines      / 2;
					var w              = letterWidth;
					var h              = letterHeight;
					var numberOfPoints = int(random(7, 10));
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
		var x2 = x;
		var y2 = random(y, y + h);
		var x3 = x;
		var y3 = random(y, y + h);
		var x4 = x;
		var y4 = random(y, y + h);

		pointsArray.push([x2, y2, x3, y3, x4, y4]);
	}

	strokeWeight(weight);
	stroke(255);
	noFill();

	beginShape();
	vertex(random(x, x + w), random(y, y + h))

	for (var i = 0; i < pointsArray.length; i++) {
		var x2 = pointsArray[i][0];
		var y2 = pointsArray[i][1];
		var x3 = pointsArray[i][2];
		var y3 = pointsArray[i][3];
		var x4 = pointsArray[i][4];
		var y4 = pointsArray[i][5];

		bezierVertex(x2, y2, x3, y3, x4, y4);
	}

	endShape();

	pointsArray = [];

	for (var i = 0; i < numberOfPoints; i++) {
		var x2 = x + w;
		var y2 = random(y, y + h);
		var x3 = x + w;
		var y3 = random(y, y + h);
		var x4 = x + w;
		var y4 = random(y, y + h);

		pointsArray.push([x2, y2, x3, y3, x4, y4]);
	}

	beginShape();
	vertex(random(x, x + w), random(y, y + h))

	for (var i = 0; i < pointsArray.length; i++) {
		var x2 = pointsArray[i][0];
		var y2 = pointsArray[i][1];
		var x3 = pointsArray[i][2];
		var y3 = pointsArray[i][3];
		var x4 = pointsArray[i][4];
		var y4 = pointsArray[i][5];

		bezierVertex(x2, y2, x3, y3, x4, y4);
	}

	endShape();
}