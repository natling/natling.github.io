var text = '';

for (var i = 0; i < 10000; i++) {
	text += randomCharacter();
}

document.getElementById("text").innerHTML = text;

function randomCharacter() {
	return String.fromCharCode(getRandomIntInclusive(32, 127));
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}