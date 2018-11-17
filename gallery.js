paths = paths.map(file => 'url(\"' + file + '\")');

const grid = document.createElement('div');
document.body.appendChild(grid);
grid.id = 'grid';

const modal = document.createElement('div');
document.body.appendChild(modal);
modal.id = 'modal';

const showModal = () => {
	modal.style.display = 'block';

	setTimeout(() => {
		modal.style.opacity = 1;
	}, 0);
}

const hideModal = () => {
	modal.style.opacity = 0;

	setTimeout(() => {
		modal.style.display = 'none';
	}, 500);
}

const scroll = direction => {
	const currentIndex = paths.indexOf(modal.style.backgroundImage);
	const newIndex = mod(currentIndex + (direction ? 1 : -1), paths.length);
	modal.style.backgroundImage = paths[newIndex];
}

paths.forEach(path => {
	const cell = document.createElement('div');
	grid.appendChild(cell);
	cell.className = 'cell';
	cell.style.backgroundImage = path;

	cell.onclick = () => {
		modal.style.backgroundImage = path;
		showModal();
	}
});

modal.onclick = hideModal;

document.onkeydown = event => {
	switch (event.keyCode) {
		case 27:
			hideModal();
			break;

		case 37:
			scroll(false);
			break;

		case 39:
			scroll(true);
			break;
	}
}