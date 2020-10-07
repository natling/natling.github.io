const loss = [
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
	[ 0, 1, 0, 0, 0, 1, 0, 0, 0 ],
	[ 0, 1, 0, 0, 0, 1, 0, 1, 0 ],
	[ 0, 1, 0, 0, 0, 1, 0, 1, 0 ],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
	[ 0, 1, 0, 1, 0, 1, 0, 0, 0 ],
	[ 0, 1, 0, 1, 0, 1, 0, 0, 0 ],
	[ 0, 1, 0, 1, 0, 1, 1, 1, 0 ],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
];

const axes = ['x', 'y'];

const matrixSize = {x: loss[0].length,    y: loss.length};
const canvasSize = {x: window.innerWidth, y: window.innerHeight};

setup = () => {
	const depth = min(...axes.map(axis => floor(log(canvasSize[axis]) / log(matrixSize[axis]))));

	createCanvas(...axes.map(axis => canvasSize[axis]));
	background(0);
	stroke(255);
	translate(...axes.map(axis => (canvasSize[axis] - matrixSize[axis] ** depth) / 2));
	fractal(loss, depth);
}

const fractal = (matrix, depth) => {
	depth--;

	matrix.forEach((row, y) => row.forEach((bit, x) => {
		push();
		translate(...axes.map(axis => matrixSize[axis] ** depth * {x, y}[axis]));

		if (bit) {
			if (depth > 0) {
				fractal(matrix, depth);
			} else {
				point(0, 0);
			}
		}

		pop();
	}));
}