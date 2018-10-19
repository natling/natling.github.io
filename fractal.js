const grid = {
	square : false,
	on     : true,
};

grid.depth = randomIntegerInclusive(3, 6);

[grid.width, grid.height] = [window.innerWidth, window.innerHeight].map(x => Math.floor(Math.pow(x, 1 / grid.depth)));

if (grid.square) {
	grid.width = grid.height = Math.min(...[grid.width, grid.height]);
}

[grid.columnWidth, grid.rowHeight] = [grid.width, grid.height].map(x => x ** (grid.depth - 1));

grid.data = Array.from({length: grid.height}, () => Array.from({length: grid.width}, () => false));

setup = () => {
	createCanvas(grid.width ** grid.depth, grid.height ** grid.depth);
	background(0);
	stroke(255);
}

draw = () => {
	background(0);

	if (grid.on) {
		evolve();
	}

	fractal(grid.depth);
}

const fractal = level => {
	level--;

	for (let j = 0; j < grid.height; j++) {
		for (let i = 0; i < grid.width; i++) {
			if (grid.data[j][i]) {
				push();

				const x = grid.width  ** level * i;
				const y = grid.height ** level * j;

				translate(x, y);

				if (level > 0) {
					fractal(level);
				} else {
					point(0, 0);
				}

				pop();
			}
		}
	}
}

const evolve = () => {
	if (gridEmpty()) {
		toggleCell(randomCell(false));
	} else {
		if (frameRate() > 20) {
			toggleCell(randomCellWithNeighbors(false));
		} else {
			toggleCell(randomCell(true));
		}
	}
}

const toggleCell = cell => {
	const {x, y} = cell;
	grid.data[y][x] = ! grid.data[y][x];
}

const randomCell = status => {
	const exists = status ? ! gridEmpty() : ! gridFull();

	if (exists) {
		const x = randomIntegerInclusive(0, grid.width  - 1);
		const y = randomIntegerInclusive(0, grid.height - 1);

		if (grid.data[y][x] == status) {
			return {x, y};
		} else {
			return randomCell(status);
		}
	}
}

const randomCellWithNeighbors = status => {
	const cell = randomCell(status);

	if (hasNeighbors(cell)) {
		return cell;
	} else {
		return randomCellWithNeighbors(status);
	}
}

const hasNeighbors = cell => {
	const {x, y} = cell;

	const neighbors = [];

	for (let j = y - 1; j < y + 2; j++) {
		for (let i = x - 1; i < x + 2; i++) {
			if (! (i == x && j == y)) {
				if (i >= 0 && i <= grid.width - 1) {
					if (j >= 0 && j <= grid.height - 1) {
						neighbors.push(grid.data[j][i]);
					}
				}
			}
		}
	}

	return neighbors.some(x => x);
}

const gridEmpty = () => flatten(grid.data).every(x => ! x)
const gridFull  = () => flatten(grid.data).every(x =>   x)

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