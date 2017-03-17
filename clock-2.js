var gridSize = 13;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background(0);
	noStroke();
}

function draw() {
	var unitsOfTime = [
		{ unitValue: hour(),          unitDivision:   24 },
		{ unitValue: minute(),        unitDivision:   60 },
		{ unitValue: second(),        unitDivision:   60 },
		{ unitValue: millis() % 1000, unitDivision: 1000 }
	];

	for (var i = 0; i < unitsOfTime.length; i++) {

		var unitValue = unitsOfTime[i]['unitValue'];
		var unitDivision = unitsOfTime[i]['unitDivision'];

		for (var j = 0; j < width / unitsOfTime.length / gridSize; j++) {
			for (var k = 0; k < height / gridSize; k++) {

				if (random(1) > unitValue / unitDivision) {
					fill(255);
				} else {
					fill(0);
				}

				rect(Math.round(j * gridSize + i * width / unitsOfTime.length), Math.round(k * gridSize), gridSize, gridSize);
			}
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}