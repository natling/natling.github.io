function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background(0);
}

function draw() {
	background(0);

	for (var i = 0; i < 3; i++) {

		var unit = 0;
		var div = 0;

		switch(i) {
			case 0:
				unit = hour();
				div = 24;
				break;

			case 1:
				unit = minute();
				div = 60;
				break;

			case 2:
				unit = second();
				div = 60;
				break;
		}

		fill(255);
		noStroke();
		rect(0, Math.round(height / 3) * i, unit * width / div, Math.round(height / 3));

		if (unit == 0) {
			fill(0);
			rect(0, Math.round(height / 3) * i, width, Math.round(height / 3));
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}