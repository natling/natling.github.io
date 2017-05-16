function randomItem(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function coin(p) {
	if (random() < p) {
		return true
	} else {
		return false
	}
}

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}