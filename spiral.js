const settings = {
	n : 30000,

	e : 2.71828,

	resolution : 128,

	a : {
		min :  0.01,
		max : 10,

		direction : true,
	},

	b : {
		min : 0.0004,
		max : 0.001,

		direction : true,
	},
};

setup = () => {
	createCanvas(windowWidth, windowHeight);
	background('#000000');
	frameRate(10);

	textFont('Menlo');
	textAlign(CENTER, CENTER);

	settings.a.step = (settings.a.max - settings.a.min) / settings.resolution;
	settings.b.step = (settings.b.max - settings.b.min) / settings.resolution;

	settings.a.value = map(0.5, 0, 1, settings.a.min, settings.a.max);
	settings.b.value = map(0.5, 0, 1, settings.b.min, settings.b.max);
}

draw = () => {
	background('#000000');

	for (let i = 0; i < settings.n; i += 3) {
		const x = settings.a.value * settings.e ** (settings.b.value * i) * cos(i);
		const y = settings.a.value * settings.e ** (settings.b.value * i) * sin(i);

		fill(color(random(255), random(255), random(255)));
		text(String.fromCharCode(random(32, 127)), width / 2 + x, height / 2 + y);
	}

	if (settings.a.direction) {
		if (settings.a.value < settings.a.max) {
			settings.a.value += settings.a.step;
		} else {
			settings.a.direction = ! settings.a.direction;
		}
	} else {
		if (settings.a.value > settings.a.min) {
			settings.a.value -= settings.a.step;
		} else {
			settings.a.direction = ! settings.a.direction;
		}
	}

	if (settings.b.direction) {
		if (settings.b.value < settings.b.max) {
			settings.b.value += settings.b.step;
		} else {
			settings.b.direction = ! settings.b.direction;
		}
	} else {
		if (settings.b.value > settings.a.min) {
			settings.b.value -= settings.b.step;
		} else {
			settings.b.direction = ! settings.b.direction;
		}
	}
}