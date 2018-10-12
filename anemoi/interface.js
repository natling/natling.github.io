const interface = {
	colors : {
		none   : 'hsl(   0,   0%,  50% )',
		red    : 'hsl(   0, 100%,  50% )',
		orange : 'hsl(  30, 100%,  50% )',
		yellow : 'hsl(  60, 100%,  50% )',
		green  : 'hsl( 120, 100%,  50% )',
		blue   : 'hsl( 240, 100%,  50% )',
		purple : 'hsl( 300, 100%,  50% )',
		gray   : 'hsl(   0,   0%, 100% )',
	},

	cell : {
		rounding : 1 / 8,
	}
};

interface.fit = () => {
	interface.size = Math.min(window.innerWidth, window.innerHeight) * 0.9;
	interface.board.style.width  = interface.size + 'px';
	interface.board.style.height = interface.size + 'px';
}

document.body.onresize = interface.fit;

interface.createBoard = () => {
	interface.board = document.createElement('div');
	document.body.appendChild(interface.board);

	interface.fit();

	interface.cells = Array.from({length: game.size}, (_, y) => Array.from({length: game.size}, (_, x) => {
		const edges = [x, y].filter(n => [0, game.size - 1].includes(n)).length;

		if (edges < 2) {
			const cell = document.createElement('div');
			interface.board.appendChild(cell);

			cell.style.width  = 100 / game.size * (1 - interface.cell.rounding)     + '%';
			cell.style.height = 100 / game.size * (1 - interface.cell.rounding)     + '%';
			cell.style.left   = 100 / game.size * (x + interface.cell.rounding / 2) + '%';
			cell.style.top    = 100 / game.size * (y + interface.cell.rounding / 2) + '%';

			cell.style.backgroundColor = interface.colors.none;

			if (edges == 0) {
				cell.style.borderRadius = interface.cell.rounding * 100 + '%';
				cell.onclick = () => game.square({x, y});
			} else {
				cell.style.borderRadius = '50%';
				cell.onclick = () => game.button({x, y});
			}

			return cell;
		}
	}));
}

game.display = (coordinates, color, mode) => {
	const {x, y} = coordinates;
	interface.cells[y][x].className = mode;
	interface.cells[y][x].style.backgroundColor = interface.colors[color];
}

interface.createBoard();
game.createPieces();