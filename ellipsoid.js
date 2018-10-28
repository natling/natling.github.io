const n = 64;

setup = () => {
	createCanvas(windowWidth, windowHeight, WEBGL);
}

draw = () => {
	for (let i = 0; i < n; i++) {
		const direction = i % 2 == 0 ? -1 : 1;

		rotateX(frameCount * 0.001 * direction);
		rotateY(frameCount * 0.002 * direction);
		rotateZ(frameCount * 0.003 * direction);

		ellipsoid(Math.min(width, height) * 0.35);
	}
}

windowResized = () => {
	resizeCanvas(windowWidth, windowHeight);
}