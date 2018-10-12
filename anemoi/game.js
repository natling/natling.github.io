class Piece {

	constructor(player, rank, coordinates) {
		this.player      = player;
		this.rank        = rank;
		this.coordinates = coordinates;
		this.captured    = false;
	}

	color() {
		return game.colors[this.player][this.rank];
	}

	display() {
		game.display(this.coordinates, this.color(), 'light');
	}

	select() {
		game.selectedPiece = this;
		game.display(this.coordinates, this.color(), 'pulse');
		this.showLegalMoves(true);
		this.showLegalChanges(true);
	}

	deselect() {
		game.selectedPiece = undefined;
		this.display();
		this.showLegalMoves(false);
		this.showLegalChanges(false);
	}

	move(destination) {
		const pieceAtDestination = game.pieceAt(destination);

		if (pieceAtDestination) {
			pieceAtDestination.die();
		}

		this.deselect();
		game.display(this.coordinates, 'none', 'light');
		this.coordinates = destination;
		this.display();
		game.endTurn();
	}

	die() {
		this.captured = true;
		this.showCapturedPieces();
	}

	showCapturedPieces() {
		game.pieces.filter(piece => piece.player == this.player && piece.captured)
		.sort((a, b) => a.rank - b.rank)
		.forEach((piece, i) => {
			const coordinates = {
				x : this.player ? 0 : 9,
				y : f.mod((i + 1) * (this.player ? 1 : -1), game.size - 1),
			};

			piece.coordinates = coordinates;
			piece.display();
		});
	}

	legalMoves() {
		let moves = [];

		for (let y = -1; y <= 1; y++) {
			for (let x = -1; x <= 1; x++) {
				if ([x, y].some(n => n != 0)) {
					moves.push({
						x : x * (this.rank + 1) + this.coordinates.x,
						y : y * (this.rank + 1) + this.coordinates.y,
					});
				}
			}
		}

		moves = moves.filter(move => {
			return [move.x, move.y].every(n => n >= 1 && n <= game.size - 2);
		});

		return moves;
	}

	showLegalMoves(direction) {
		this.legalMoves().forEach(move => {
			if (! game.pieceAt(move)) {
				game.display(move, direction ? 'gray' : 'none', 'light');
			}
		});
	}

	change(rank) {
		this.deselect();
		this.rank = rank;
		this.display();
		game.endTurn();
	}

	legalChanges() {
		return [0, 1, 2].filter(n => Math.abs(this.rank - n) == 1);
	}

	showLegalChanges(direction) {
		this.legalChanges().forEach(rank => {
			const button = game.rankToCoordinates(rank);
			const color = direction ? game.colors[this.player][rank] : 'none';
			game.display(button, color, 'light');
		});
	}
}

const game = {
	size : 10,

	colors : [
		[ 'yellow', 'orange', 'red' ],
		[ 'purple', 'blue', 'green' ],
	],

	turn : 0,
};

const f = {
	mod : (x, n) => (x % n + n) % n,
};

game.createPieces = () => {
	game.pieces = Array.from({length: 16}, (_, i) => {
		const player = i % 2;
		const rank = 0;
		const coordinates = {
			x : Math.floor(i / 2) + 1,
			y : player ? 8 : 1,
		};

		return new Piece(player, rank, coordinates);
	});

	game.pieces.forEach(piece => piece.display());
}

game.endTurn = () => {
	game.turn = Number(! Boolean(game.turn));
}

game.pieceAt = coordinates => {
	return game.pieces.find(piece => {
		return coordinates.x == piece.coordinates.x && coordinates.y == piece.coordinates.y;
	});
}

game.rankToCoordinates = rank => {
	return {
		x : f.mod((3 - rank) * (game.turn ? 1 : -1), game.size - 1),
		y : game.turn ? 9 : 0,
	};
}

game.buttonAt = coordinates => {
	return [0, 1, 2].find(rank => {
		const button = game.rankToCoordinates(rank);
		return coordinates.x == button.x && coordinates.y == button.y;
	});
}

game.square = coordinates => {
	const pieceAtSquare = game.pieceAt(coordinates);

	if (game.selectedPiece) {
		const isLegalMove = game.selectedPiece.legalMoves().find(move => {
			return coordinates.x == move.x && coordinates.y == move.y;
		});

		if (pieceAtSquare) {
			if (game.selectedPiece.player == pieceAtSquare.player) {
				const pieceAtSquareIsSelected = pieceAtSquare == game.selectedPiece;

				game.selectedPiece.deselect();

				if (! pieceAtSquareIsSelected) {
					pieceAtSquare.select();
				}
			} else {
				if (isLegalMove) {
					game.selectedPiece.move(coordinates);
				}
			}
		} else {
			if (isLegalMove) {
				game.selectedPiece.move(coordinates);
			}
		}
	} else {
		if (pieceAtSquare) {
			if (pieceAtSquare.player == game.turn) {
				pieceAtSquare.select();
			}
		}
	}
}

game.button = coordinates => {
	const newRank = game.buttonAt(coordinates);

	if (game.selectedPiece) {
		const isLegalChange = game.selectedPiece.legalChanges().find(rank => rank == newRank) != undefined;

		if (isLegalChange) {
			game.selectedPiece.change(newRank);
		}
	}
}