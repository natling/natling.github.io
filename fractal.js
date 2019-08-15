const grid = {
	depth  : randomIntegerInclusive(3, 6),
	square : false,
	on     : true,
};

[grid.width, grid.height] = [window.innerWidth, window.innerHeight].map(n => Math.floor(Math.pow(n, 1 / grid.depth)));

if (grid.square) {
	grid.width = grid.height = Math.min(grid.width, grid.height);
}

grid.state = Array.from({length: grid.height}, () => Array.from({length: grid.width}, () => false));

setup = () => {
	createCanvas(grid.width ** grid.depth, grid.height ** grid.depth);
	background(0);
	stroke(255);
}

draw = () => {
	background(0);
	if (grid.on) {evolve()};
	fractal(grid.depth);
}

const fractal = depth => {
	depth--;

	for (let j = 0; j < grid.height; j++) {
		for (let i = 0; i < grid.width; i++) {
			if (grid.state[j][i]) {
				push();

				const x = grid.width  ** depth * i;
				const y = grid.height ** depth * j;

				translate(x, y);

				if (depth > 0) {
					fractal(depth);
				} else {
					point(0, 0);
				}

				pop();
			}
		}
	}
}

const evolve = () => {
	const {x, y} = frameCount == 1
		? randomCell(false)
		: frameRate() < 15
		? randomCell(true)
		: randomCellWithNeighbors(false);

	grid.state[y][x] = ! grid.state[y][x];
}

const randomCell = state => {
	if (flatten(grid.state).some(cell => cell == state)) {
		const [x, y] = [grid.width, grid.height].map(n => randomIntegerInclusive(0, n - 1));
		return grid.state[y][x] == state ? {x, y} : randomCell(state);
	}
}

const randomCellWithNeighbors = state => {
	if (flatten(grid.state).some(Boolean)) {
		const {x, y} = randomCell(state);

		const hasNeighbors = flatten(
			Array.from({length: 3}, (_, b) => Array.from({length: 3}, (_, a) => {
				const [i, j] = [a + x, b + y].map(n => n - 1);
				return {i, j};
			}))
		)
		.filter(({i, j}) => i >= 0 && i <= grid.width  - 1)
		.filter(({i, j}) => j >= 0 && j <= grid.height - 1)
		.some(({i, j}) => grid.state[j][i]);

		return hasNeighbors ? {x, y} : randomCellWithNeighbors(state);
	}
}

keyPressed = () => {
	switch (keyCode) {
		case 32:
			grid.on = ! grid.on;
			break;

		case RIGHT_ARROW:
			evolve();
			break;

		case DOWN_ARROW:
			save();
			break;
	}
}