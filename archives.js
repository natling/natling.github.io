const settings = {
	corpus : [
		poems.iliad,
		poems.odyssey,
		poems.ramayana,
		poems.deRerumNatura,
		poems.aeneid,
		poems.metamorphoses,
		poems.beowulf,
		poems.theSongOfRoland,
		poems.nibelungenlied,
		poems.divineComedy,
		poems.paradiseLost,
		poems.kalevala,
		poems.idyllsOfTheKing,
	].reduce((x, y) => x.concat(y)),

	splitCorpusByWords : true,

	lineDuration       :  2000,
	paragraphDuration  :  1000,
	cycleDuration      : 10000,
	delayBetweenCycles :  1000,

	variableFontSize : true,

	typeDirection   : true,
	untypeDirection : false,

	width  : window.innerWidth,
	height : window.innerHeight,

	margin : 30,
};

if (settings.splitCorpusByWords) {
	settings.corpus = settings.corpus.join(' ').split(' ');
}

const cycle = () => {
	const columns = randomIntegerInclusive(2, 7);
	const rows    = randomIntegerInclusive(2, 5);

	settings.columnWidth = (settings.width  - settings.margin * (columns + 1)) / columns;
	settings.rowHeight   = (settings.height - settings.margin * (rows    + 1)) / rows;

	const merged = Math.floor(randomFloat(0.4, 1.0) * columns * rows);

	createGrid(columns, rows);
	mergeSomeCells(merged);

	fillAllCells(true);

	setTimeout(clearGrid, settings.cycleDuration);
	checkIfEmpty();
}

const checkIfEmpty = () => {
	setTimeout(() => {
		settings.cells = document.getElementsByClassName('cell');
		if (settings.cells.length == 0) {
			setTimeout(cycle, settings.delayBetweenCycles);
		} else {
			checkIfEmpty();
		}
	}, 100);
}

const createGrid = (columns, rows) => {
	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < columns; i++) {
			const cell = document.createElement('div');
			cell.className = 'cell';

			cell.style.width  = settings.columnWidth + 'px';
			cell.style.height = settings.rowHeight   + 'px';
			cell.style.margin = settings.margin / 2  + 'px';

			if (settings.variableFontSize) {
				cell.style.fontSize = randomIntegerInclusive(8, 13) + 'px';
			}

			let cellLeft = i * settings.columnWidth;
			let cellTop  = j * settings.rowHeight;

			if (i == 0) {
				cell.style.marginLeft   = settings.margin + 'px';
			} else {
				cellLeft += settings.margin * (i + 0.5);
			}

			if (i == columns - 1) {
				cell.style.marginRight  = settings.margin + 'px';
			}

			if (j == 0) {
				cell.style.marginTop    = settings.margin + 'px';
			} else {
				cellTop += settings.margin * (j + 0.5);
			}

			if (j == rows - 1) {
				cell.style.marginBottom = settings.margin + 'px';
			}

			cell.style.left = cellLeft + 'px';
			cell.style.top  = cellTop  + 'px';

			document.body.appendChild(cell);
		}
	}
}

const adjacentHorizontal = (cell1, cell2) => {
	const rect1 = cell1.getBoundingClientRect();
	const rect2 = cell2.getBoundingClientRect();

	const nextColumn = rect2.left - rect1.right == settings.margin;
	const sameRow    = rect1.top == rect2.top && rect1.bottom == rect2.bottom;

	return nextColumn && sameRow;
}

const adjacentVertical = (cell1, cell2) => {
	const rect1 = cell1.getBoundingClientRect();
	const rect2 = cell2.getBoundingClientRect();

	const nextRow    = rect2.top - rect1.bottom == settings.margin;
	const sameColumn = rect1.left == rect2.left && rect1.right == rect2.right;

	return nextRow && sameColumn;
}

const merge = (cell1, cell2, direction) => {
	const rect1 = cell1.getBoundingClientRect();
	const rect2 = cell2.getBoundingClientRect();

	const marginLeft   = cell1.style.marginLeft;
	const marginRight  = cell2.style.marginRight;
	const marginTop    = cell1.style.marginTop;
	const marginBottom = cell2.style.marginBottom;

	const left = rect1.left - parseFloat(marginLeft);
	const top  = rect1.top  - parseFloat(marginTop);

	const width  = direction ? rect1.width + settings.margin + rect2.width : rect1.width;
	const height = direction ? rect1.height : rect1.height + settings.margin + rect2.height;

	const newCell = document.createElement('div');
	newCell.className = 'cell';

	newCell.style.left   = left   + 'px';
	newCell.style.top    = top    + 'px';
	newCell.style.width  = width  + 'px';
	newCell.style.height = height + 'px';

	newCell.style.marginLeft   = marginLeft;
	newCell.style.marginRight  = marginRight;
	newCell.style.marginTop    = marginTop;
	newCell.style.marginBottom = marginBottom;

	if (settings.variableFontSize) {
		newCell.style.fontSize = randomIntegerInclusive(8, 13) + 'px';
	}

	deleteNode(cell1);
	deleteNode(cell2);
	document.body.appendChild(newCell);
}

const mergeIfAdjacent = (cell1, cell2) => {
	if (adjacentHorizontal(cell1, cell2)) {
		merge(cell1, cell2, true);
	} else if (adjacentVertical(cell1, cell2)) {
		merge(cell1, cell2, false);
	}
}

const mergeRandomCells = tries => {
	settings.cells = document.getElementsByClassName('cell');

	let cell1 = randomItem(settings.cells);
	let cell2 = randomItem(settings.cells);

	let counter = 0;

	while (! adjacentHorizontal(cell1, cell2) && ! adjacentVertical(cell1, cell2) && counter < tries) {
		cell1 = randomItem(settings.cells);
		cell2 = randomItem(settings.cells);

		counter++;
	}

	mergeIfAdjacent(cell1, cell2);
}

const mergeSomeCells = n => {
	for (let i = 0; i < n; i++) {
		mergeRandomCells(100);
	}
}

const fillCell = (cell, typed) => {
	const p = document.createElement('p');
	p.className = 'block';
	cell.appendChild(p);

	const offset = randomIntegerInclusive(0, settings.corpus.length - 1);

	let counter = 0;

	while (! (p.scrollHeight > p.clientHeight)) {
		counter++;
		p.innerHTML = Array.from({length: counter}, (_, i) => settings.corpus[(i + offset) % settings.corpus.length]).join(' ');
	}

	p.innerHTML = Array.from({length: counter - 1}, (_, i) => settings.corpus[(i + offset) % settings.corpus.length]).join(' ');

	const typeBlock = () => {
		let blockWithSpans = p.innerHTML.replace(/ /g, '</span> <span>').replace(/-/g, '</span><span>-</span><span>');
		blockWithSpans = '<span>' + blockWithSpans + '</span>';
		p.innerHTML = blockWithSpans;

		const spans = p.getElementsByTagName('span');

		const layout = separateArray(spans, (a, b) => {
			return a.getBoundingClientRect().y != b.getBoundingClientRect().y;
		});

		const lines = layout.map(line => {
			return line.map(span => span.innerHTML).join(' ').replace(/ *- */g, '-');
		});

		deleteNode(p);

		for (let i = 0; i < lines.length; i++) {
			(i => {
				setTimeout(() => {
					const line = document.createElement('div');
					line.className = 'line';
					line.innerHTML = '';
					cell.appendChild(line);
					const lineLength = lines[i].length;

					if (! settings.splitCorpusByWords) {
						if (i == lines.length - 1) {
							line.style.textAlignLast = 'right';
						}
					}

					const typeLine = () => {
						if (line.innerHTML.length < lineLength) {
							line.innerHTML = settings.typeDirection
								? lines[i].slice(0, line.innerHTML.length + 1)
								: lines[i].slice(-(line.innerHTML.length + 1));
							setTimeout(typeLine, settings.lineDuration / lineLength);
						}
					}

					typeLine();
				}, settings.paragraphDuration / lines.length * i);
			})(i);
		}
	}

	if (typed) {
		typeBlock();
	}
}

const fillAllCells = typed => {
	settings.cells = document.getElementsByClassName('cell');

	for (let i = 0; i < settings.cells.length; i++) {
		fillCell(settings.cells[i], typed);
	}
}

const clearCell = cell => {
	const lines = cell.getElementsByClassName('line');

	for (let i = 0; i < lines.length; i++) {
		(i => {
			setTimeout(() => {

				const lineLength = lines[i].length;

				const untypeLine = () => {
					if (lines[i].innerHTML.length > 0) {
						lines[i].innerHTML = settings.untypeDirection
							? lines[i].innerHTML = lines[i].innerHTML.slice(0, -1)
							: lines[i].innerHTML = lines[i].innerHTML.slice(1);
						setTimeout(untypeLine, settings.lineDuration / lineLength);
					}
				}

				untypeLine();
			}, settings.paragraphDuration / lines.length * (lines.length - i));
		})(i);
	}

	const deleteWhenDone = () => {
		setTimeout(() => {
			if (cell.textContent.length == 0) {
				deleteNode(cell);
			} else {
				deleteWhenDone();
			}
		}, 100);
	}

	deleteWhenDone();
}

const clearGrid = () => {
	settings.cells = document.getElementsByClassName('cell');

	for (let i = 0; i < settings.cells.length; i++) {
		clearCell(settings.cells[i]);
	}
}

const deleteNode = node => node.parentNode.removeChild(node)

cycle();