function randomIntegerInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(random() * (max - min + 1)) + min;
}

function coin(p) {
	if (random() < p) {
		return true
	} else {
		return false
	}
}

function weightedAverage(values, weights) {
	var weightedValuesSum = 0;
	var weightsSum = 0;

	for (var i = 0; i < values.length; i++) {
		weightedValuesSum += values[i] * weights[i];
		weightsSum += weights[i];
	}

	return weightedValuesSum / weightsSum;
}

function randomItem(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function rotateArray(array, distance, direction) {
	for (var i = 0; i < distance; i++) {
		if (direction) {
			array.unshift(array.pop());
		} else {
			array.push(array.shift());
		}
	}
	return array;
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

function create2DArray(rows, columns) {
	var x = new Array(rows);

	for (var i = 0; i < rows; i++) {
		x[i] = new Array(columns);
	}

	return x;
}