var letterHeight           = 50,
	letterWidth            = 50,
	spaceBetweenLines      = 10,
	spaceBetweenCharacters = 10,
	rowHeight              = letterHeight + spaceBetweenLines,
	columnWidth            = letterWidth + spaceBetweenCharacters;

var speed = 2;

var rows, columns, marginGlobal, marginHorizontal, marginVertical, spectrogram, imageBuffer, pixelsArraySize;
var frame = 0, writingDuration, pauseDuration = 100, fadeDuration = 300;

function preload() {
	spectrogram = loadImage('files/spectrogram-1.png');
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
					var numberOfArcs     = int(random(2, 3));
					var weight           = random(0.8, 1.5);
					var circleDistortion = 100;
					var arcDistortion    = 100;

					drawCharacter(x, y, w, h, numberOfArcs, weight, circleDistortion);
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

function drawCharacter(x, y, w, h, numberOfArcs, weight, circleDistortion, arcDistortion) {

	strokeWeight(weight);
	stroke(255);
	noFill();

	var ellipseX = x + w / 2;
	var ellipseY = y + w / 2;
	var ellipseW = letterWidth;
	var ellipseH = letterHeight;

	ellipse(ellipseX, ellipseY, ellipseW + int(random(-circleDistortion, circleDistortion)), ellipseH + int(random(-circleDistortion, circleDistortion)));

	for (var i = 0; i < numberOfArcs; i++) {
		var layer = int(random(1, 4));

		var a     = ellipseX;
		var b     = ellipseY;
		var c     = ellipseW - layer * 13 + int(random(-arcDistortion, arcDistortion));
		var d     = ellipseH - layer * 13 + int(random(-arcDistortion, arcDistortion));
		var start = random(TAU);
		var stop  = start + random(TAU * 0.5, TAU * 0.75);

		arc(a, b, c, d, start, stop);
	}
}