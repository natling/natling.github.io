const n = 16;

setup = () => {
	createCanvas(windowWidth, windowHeight, WEBGL);
}

draw = () => {
	for (let i = 0; i < n; i++) {
		rotateX(frameCount * 0.001 * 0.5);
		rotateY(frameCount * 0.002 * 0.5);
		rotateZ(frameCount * 0.003 * 0.5);

		box(Math.min(width, height) * 0.4);
	}
}

windowResized = () => {
	resizeCanvas(windowWidth, windowHeight);
}