var hoursInDay           = 24;
var minutesInHour        = 60;
var secondsInMinute      = 60;
var millisecondsInSecond = 1000;

var secondsBarHeight;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background(0);

	secondsBarHeight = width / hoursInDay;

	strokeWeight(1);
}

function draw() {
	background(0);

	var currentMinutes = hour() * 60 + minute();

	for (var h = 0; h < hoursInDay; h++) {
		for (var m = 0; m < minutesInHour; m++) {

			if (h * minutesInHour + m < currentMinutes) {
				fill('#00f72c');
				stroke(0);
			} else {
				fill(0);
				stroke('#00f72c');
			}

			var x = h * width / hoursInDay;
			var y = m * (height - secondsBarHeight) / minutesInHour + secondsBarHeight;
			var rectWidth = width / hoursInDay;
			var rectHeight = (height - secondsBarHeight) / minutesInHour;

			rect(x, y, rectWidth, rectHeight);
		}
	}

	for (var s = 0; s < secondsInMinute; s++) {

		var x = s * width / secondsInMinute;
		var y = 0;
		var rectWidth = width / secondsInMinute;
		var rectHeight = secondsBarHeight;

		if (s < second()) {
			fill('#00f72c');
			stroke(0);
		} else {
			fill(0);
			stroke('#00f72c');
		}

		rect(x, y, rectWidth, rectHeight);		
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}