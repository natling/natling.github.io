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