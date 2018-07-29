var n = 32;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
	for (var i = 0; i < n; i++) {
		var direction = i % 2 == 0 ? -1 : 1;

		rotateX(frameCount * 0.001 * direction);
		rotateY(frameCount * 0.002 * direction);
		rotateZ(frameCount * 0.003 * direction);

		torus(Math.min(width, height) * 0.4, 1, 64, 64);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}