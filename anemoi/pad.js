const pad = {
	colors : {
		none   :  0,
		red    :  5,
		orange :  9,
		yellow : 13,
		green  : 29,
		blue   : 45,
		purple : 53,
		gray   : 71,
	},
};

WebMidi.enable(err => {
	if (err) {
		console.log('WebMidi could not be enabled.', err);
	}

	pad.in  = WebMidi.getInputByName('Launchpad Pro Standalone Port');
	pad.out = WebMidi.getOutputByName('Launchpad Pro Standalone Port');

	if (pad.in && pad.out) {

		pad.numberToCoordinates = n => ({
			x : n % game.size,
			y : Math.floor(n / game.size),
		})

		pad.coordinatesToNumber = coordinates => {
			const {x, y} = coordinates;
			return y * game.size + x;
		}

		pad.midi = {
			light : data => {
				pad.out.sendSysex([0x00, 0x20, 0x29], [0x02, 0x10, 0x0A, ...data]);
			},

			flash : data => {
				pad.out.sendSysex([0x00, 0x20, 0x29], [0x02, 0x10, 0x23, ...data]);
			},

			pulse : data => {
				pad.out.sendSysex([0x00, 0x20, 0x29], [0x02, 0x10, 0x28, ...data]);
			},
		};

		f.merge = (a, b) => a.concat(b)

		pad.midi.clear = () => {
			const data = Array.from({length: game.size}, (_, y) => Array.from({length: game.size}, (_, x) => ({x, y})))
			.reduce(f.merge)
			.filter(coordinate => [coordinate.x, coordinate.y].some(n => ! [0, game.size - 1].includes(n)))
			.map(pad.coordinatesToNumber)
			.concat(99)
			.map(number => [number, 0])
			.reduce(f.merge);

			pad.midi.light(data);
		}

		pad.display = (coordinates, color, mode) => {
			pad.midi[mode]([pad.coordinatesToNumber(coordinates), pad.colors[color]]);
		}

		game.display = (() => {
			const cache = game.display || (() => {});

			return function() {
				const result = cache.apply(this, arguments);
				pad.display(...arguments);
				return result;
			}
		})();

		pad.in.addListener('noteon', 'all', e => {
			const coordinates = pad.numberToCoordinates(e.note.number);
			game.square(coordinates);
		});

		pad.in.addListener('controlchange', 'all', e => {
			const coordinates = pad.numberToCoordinates(e.controller.number);
			if (e.value) {game.button(coordinates)};
		});

		pad.midi.clear();
		game.createPieces();
	}
}, true);