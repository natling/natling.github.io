var letterHeight           = 50,
	letterWidth            = 50,
	spaceBetweenLines      = 10,
	spaceBetweenCharacters = 10,
	rowHeight              = letterHeight + spaceBetweenLines,
	columnWidth            = letterWidth + spaceBetweenCharacters;

var rows, columns, marginGlobal, marginHorizontal, marginVertical;
var globalArcsArray = [], characterDuration = 100, distortion = 4;

var t = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);

	marginGlobal     = 60;
	rows             = int((height - marginGlobal * 2) / rowHeight);
	columns          = int((width - marginGlobal * 2) / columnWidth);
	marginVertical   = ((height - marginGlobal * 2) - rows * rowHeight) / 2;
	marginHorizontal = ((width - marginGlobal * 2) - columns * columnWidth) / 2;

	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < columns; i++) {
			var characterNumber = j * columns + i;

			var x                = columnWidth * i + marginGlobal + marginHorizontal + spaceBetweenCharacters / 2;
			var y                = rowHeight   * j + marginGlobal + marginVertical   + spaceBetweenLines      / 2;
			var w                = letterWidth;
			var h                = letterHeight;
			var numberOfArcSlots = int(random(3, 5));
			var t1Character      = characterNumber * characterDuration;
			var t2Character      = (characterNumber + 1) * characterDuration;

			drawCharacter(x, y, w, h, numberOfArcSlots, t1Character, t2Character);
		}
	}
}

function draw() {
	background(0);

	for (var i = 0; i < globalArcsArray.length; i++) {
		for (var j = 0; j < globalArcsArray[i].length; j++) {
			globalArcsArray[i][j].draw();
		}
	}

	t++;
}

function drawCharacter(x, y, w, h, numberOfArcSlots, t1Character, t2Character) {
	arcsArray = [];
	layersArray = [0];

	for (var i = 1; i < numberOfArcSlots; i++) {
		if (random() < 0.8) {
			layersArray.push(i);
		}
	}

	var arcDuration = int((t2Character - t1Character) / layersArray.length);

	for (var i = 0; i < layersArray.length; i++) {
		var a         = x + w / 2;
		var b         = y + h / 2;
		var c         = letterWidth - layersArray[i] * 13 + int(random(-distortion, distortion));
		var d         = letterHeight - layersArray[i] * 13 + int(random(-distortion, distortion));
		var start     = random(TAU);
		if (i == 0) {
			var stop  = start + TAU * 0.999;
		} else {
			var stop  = start + TAU * random(0.5, 0.75);
		}
		var direction = random() < 0.5;
		var t1Arc     = t1Character + arcDuration * i;
		var t2Arc     = t1Character + arcDuration * (i + 1);
		var weight    = random(0.8, 1.5);
		var col       = color(255, 255, 255);

		arcsArray.push(new AnimatedArc(a, b, c, d, start, stop, direction, t1Arc, t2Arc, weight, col))
	}

	globalArcsArray.push(arcsArray);
}