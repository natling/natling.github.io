var minFontSize =  6;
var maxFontSize = 80;

var breeds;
var images = {};

getBreedsList();

function main() {
	var breedSizes = breeds.map(x => images[x].length);
	var minBreedSize = Math.min(...breedSizes);
	var maxBreedSize = Math.max(...breedSizes);

	var list = document.getElementById('list');
	var display = document.getElementById('display');

	for (var i = 0; i < breeds.length; i++) {
		(function(i) {
			var span = document.createElement('span');
			list.appendChild(span);

			span.innerHTML = breeds[i];
			span.style.fontSize = linlin(images[breeds[i]].length, minBreedSize, maxBreedSize, minFontSize, maxFontSize) + 'pt';

			span.onmouseover = function() {
				displayRandomImage(breeds[i]);
			}
		})(i);
	}
}

function getBreedsList() {
	var breedListURL = 'https://dog.ceo/api/breeds/list';
	$.getJSON(breedListURL, function(result) {
		breeds = result.message;
		getImageLists(breeds);
	});
}

function getImageLists(breeds) {
	for (var i = 0; i < breeds.length; i++) {
		(function(i) {
			var breed = breeds[i].toString();
			var breedURL = 'https://dog.ceo/api/breed/' + breed + '/images';
			$.getJSON(breedURL, function(result) {
				images[breed] = result.message;
			});
		})(i);
	}

	waitForImages();

	function waitForImages() {
		if (Object.keys(images).length == breeds.length) {
			main();
		} else {
			setTimeout(waitForImages, 100);
		}
	}
}

function displayRandomImage(breed) {
	var randomImageURL = 'https://dog.ceo/api/breed/' + breed + '/images/random';
	$.getJSON(randomImageURL, function(result) {
		chosenURL = result.message;
		display.style.backgroundImage = 'url(' + chosenURL + ')';
	});
}