const grid = document.createElement('div');
document.body.appendChild(grid);
grid.id = 'grid';

const modal = document.createElement('div');
document.body.appendChild(modal);
modal.id = 'modal';

const showModal = () => {
	modal.setAttribute('display', '');
	setTimeout(() => modal.setAttribute('opacity', ''), 0);
}

const hideModal = () => {
	modal.removeAttribute('opacity');
	setTimeout(() => modal.removeAttribute('display'), 1000);
}

const scroll = direction => {
	const currentIndex = paths.indexOf(modal.style.backgroundImage.split('"')[1]);
	const newIndex = mod(currentIndex + (direction ? 1 : -1), paths.length);
	modal.style.backgroundImage = 'url(' + paths[newIndex] + ')';
}

paths.forEach(path => {
	const image = document.createElement('img');
	grid.appendChild(image);
	image.src = path;

	image.onclick = () => {
		modal.style.backgroundImage = 'url(' + path + ')';
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