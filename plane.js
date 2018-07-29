var n = 64;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
	for (var i = 0; i < n; i++) {
		var direction = i % 2 == 0 ? -1 : 1;

		rotateX(linlin(sin(frameCount * 0.001), -1, 1, 0, TAU) * 0.5 * direction);
		rotateY(linlin(sin(frameCount * 0.002), -1, 1, 0, TAU) * 0.5 * direction);
		rotateZ(linlin(sin(frameCount * 0.003), -1, 1, 0, TAU) * 0.5 * direction);

		plane(Math.min(width, height) * 0.5);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}