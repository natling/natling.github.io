var n = 16;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
	background(0);

	for (var i = 0; i < n; i++) {
		rotateX(frameCount * 0.001 * 0.5);
		rotateY(frameCount * 0.002 * 0.5);
		rotateZ(frameCount * 0.003 * 0.5);

		box(Math.min(width, height) * 0.4);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}