var a = 10;
var b = 0.0005;

var n = 10000;

var e = 2.71828;

var density = 1.0;
var characterArray = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background('#000000');
	frameRate(10);

	textFont('Menlo');
	textAlign(CENTER, CENTER);
	fill('#00f72c');

	WebMidi.enable(function (err) {
		if (err) {
			console.log("WebMidi could not be enabled.", err);
		}

		console.log(WebMidi.inputs);
		console.log(WebMidi.outputs);

		input = WebMidi.getInputByName("nanoKONTROL2 SLIDER/KNOB");

		input.addListener('controlchange', "all", function(e) {
			// console.log(e.controller.number + ': ' + e.value);

			var value;
			switch(e.controller.number) {
				case 16:
					value = map(e.value, 0, 127, 0.01, 4);
					a = value;
					break;
				case 17:
					value = map(e.value, 0, 127, 0.0004, 0.001);
					b = value;
					break;
				case 18:
					value = map(e.value, 0, 127, 0, 30000);
					n = value;
					break;
			}
			console.log(value);
		})
	});

	for (var i = 0; i < 30000; i++) {
		if (random() < density) {
			characterArray.push(String.fromCharCode(random(32, 127)));
		} else {
			characterArray.push(' ');
		}
	}
}

function draw() {
	background('#000000');

	for (var i = 0; i < n; i += 3) {
		var x = a * e ** (b * i) * cos(i);
		var y = a * e ** (b * i) * sin(i);

		text(characterArray[i], width / 2 + x, height / 2 + y);
		// text(String.fromCharCode(random(32, 127)), width / 2 + x, height / 2 + y);
	}

	characterArray = rotateArray(characterArray, 1, true);
}