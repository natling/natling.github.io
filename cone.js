var n = 64;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
	for (var i = 0; i < n; i++) {
		var direction = i % 2 == 0 ? -1 : 1;

		rotateX(linlin(sin(frameCount * 0.0001), -1, 1, 0, TAU) * 0.5 * direction);
		rotateY(linlin(sin(frameCount * 0.0002), -1, 1, 0, TAU) * 0.5 * direction);
		rotateZ(linlin(sin(frameCount * 0.0003), -1, 1, 0, TAU) * 0.5 * direction);

		cone(Math.min(width, height) * 0.3);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}