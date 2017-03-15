var margin = 50;
var globalScale = 60;
var staffSpace = globalScale * 0.25;

var notation = {
	'staff5Lines'         : '\uE014',
	'gClef'               : '\uE050',
	'noteheadSquareBlack' : '\uE0B9',
};

function drawStaff(verticalPosition = 100) {
	text(notation['staff5Lines'].repeat(Math.round(width / textWidth(notation['staff5Lines']))), width / 2, verticalPosition);
	text(notation['gClef'], margin, verticalPosition - staffSpace * 1);

	notesFrom = margin + textWidth(notation['staff5Lines']) + 30;
	notesTo = width - margin;

	var numberOfNotes = Math.floor((notesTo - notesFrom) / textWidth(notation['noteheadSquareBlack']));

	for (var i = 0; i < numberOfNotes; i++) {
		var positionOnStaff = int(random(9)) * 0.5;
		text(notation['noteheadSquareBlack'], notesFrom + textWidth(notation['noteheadSquareBlack']) * i, verticalPosition - staffSpace * positionOnStaff);
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background(0);
	frameRate(10);

	fill(255);
	noStroke();
	textSize(globalScale);
	textFont('Bravura');
	textAlign(CENTER, CENTER);
}

function draw() {
	background(0);

	for (var i = 0; i < 5; i++) {
		drawStaff((i + 1) * 130);
	}
}