var letterHeight           = 15,
	letterWidth            = 70,
	spaceBetweenLines      =  0,
	spaceBetweenCharacters = 15,
	rowHeight              = letterHeight + spaceBetweenLines,
	columnWidth            = letterWidth + spaceBetweenCharacters;

var speed = 2;

var rows, columns, marginGlobal, marginHorizontal, marginVertical, spectrogram, imageBuffer, pixelsArraySize;
var frame = 0, writingDuration, pauseDuration = 100, fadeDuration = 300;

function preload() {
	spectrogram = loadImage('files/spectrogram-2.png');
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
					var numberOfPoints = int(random(5, 10));
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

	var corners = [ [x, y], [x + w, y], [x + w, y + h], [x, y + h] ];

	for (var i = 0; i < numberOfPoints; i++) {
		var randomCorner = int(random(4));

		var cx = random(x, x + w);
		var cy = random(y, y + h);
		var x3 = corners[randomCorner][0] + random(-3, 3);
		var y3 = corners[randomCorner][1] + random(-3, 3);

		pointsArray.push([cx, cy, x3, y3]);
	}

	strokeWeight(weight);
	stroke(255);
	noFill();

	beginShape();
	vertex(random(x, x + w), random(y, y + h))

	for (var i = 0; i < pointsArray.length; i++) {
		var cx = pointsArray[i][0];
		var cy = pointsArray[i][1];
		var x3 = pointsArray[i][2];
		var y3 = pointsArray[i][3];

		quadraticVertex(cx, cy, x3, y3);
	}

	endShape();
}