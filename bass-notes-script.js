function getRandomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

var backgroundColor = randomColor({luminosity: 'dark'});
document.body.style.backgroundColor = backgroundColor;

var width = window.innerWidth;
var height = window.innerHeight;
var box = document.getElementById("box");

var boxWidth = width * getRandomFloat(0.2, 0.3);

box.style.width = boxWidth + 'px';
box.style.left = getRandomFloat(0, width - boxWidth) + 'px';

var boxHeight = box.clientHeight;
box.style.top = getRandomFloat(0, height - boxHeight) + 'px';

var boxColor = randomColor({hue: 'monochrome', luminosity: 'dark'});
box.style.backgroundColor = boxColor;