function randomIntegerInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function getBaseLog(x, y) {
	return Math.log(y) / Math.log(x);
}

function roundTo(n, digits) {
	if (digits === undefined) {
		digits = 0;
	}

	var multiplicator = Math.pow(10, digits);
	n = parseFloat((n * multiplicator).toFixed(11));
	return Math.round(n) / multiplicator;
}

function linlin(value, inMin, inMax, outMin, outMax) {
	return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

function coin(p) {
	return Math.random() < p;
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

function pairwiseDo(array, func) {
	for (var i = 0; i < array.length - 1; i++) {
		func(array[i], array[i + 1], i);
	}
}

function separateArray(array, func = function() {return true}) {
	var separatedArray = [];
	var subArray = [];

	pairwiseDo(array, function(a, b, i) {
		subArray.push(a);

		if (func(a, b, i)) {
			separatedArray.push(subArray);
			subArray = [];
		}
	})

	subArray.push(last(array));
	separatedArray.push(subArray);

	return separatedArray;
}

function create2DArray(rows, columns) {
	var x = new Array(rows);

	for (var i = 0; i < rows; i++) {
		x[i] = new Array(columns);
	}

	return x;
}

function last(array) {
	return array[array.length - 1];
}

function flatten(ary, ret) {
	ret = ret === undefined ? [] : ret;
	for (var i = 0; i < ary.length; i++) {
		if (Array.isArray(ary[i])) {
			flatten(ary[i], ret);
		} else {
			ret.push(ary[i]);
		}
	}
	return ret;
}

function interleave () {
	var arrs = [].slice.call(arguments);
	var maxLength = Math.max.apply(Math, arrs.map(function (arr) {
		return arr.length;
	}))

	var result = [];

	for (var i = 0; i < maxLength; ++i) {
		arrs.forEach(function (arr) {
			if (arr.length > i) {
				result.push(arr[i]);
			}
		})
	}

	return result;
}

function combinations(array, k) {
	if (k == 0) {
		return [[]];
	}

	if (k == array.length) {
		return [array];
	}

	var output = [];
	var subset = combinations(array.slice(1), k - 1);

	for (var i = 0; i < subset.length; i++) {
		output.push([array[0]].concat(subset[i]));
	}

	output.push(...combinations(array.slice(1), k));

	return output;
}

function permutations(array) {
	if (array.length == 1) {
		return array;
	}

	var output = [];

	for (var i = 0; i < array.length; i++) {
		var first = array[i];
		var rest  = array.slice(0, i).concat(array.slice(i + 1));

		var innerPermutations = permutations(rest);

		for (var j = 0; j < innerPermutations.length; j++) {
			output.push(([first].concat(innerPermutations[j])));
		}
	}

	return output;
}

function randomWalkInteger(start, low, high, step) {
	while (true) {
		var newStart = start + randomIntegerInclusive(-step, step);
		if (newStart >= low && newStart <= high) {
			return newStart;
		}
	}
}

function randomWalkFloat(start, low, high, step) {
	while (true) {
		var newStart = start + randomFloat(-step, step);
		if (newStart >= low && newStart <= high) {
			return newStart;
		}
	}
}

function getCharacterDimensions(character) {
	var p = document.createElement('p');
	p.appendChild(document.createTextNode(character));
	document.body.appendChild(p);
	p.style.position = 'absolute';
	var characterWidth  = p.clientWidth;
	var characterHeight = p.clientHeight;
	document.body.removeChild(p);
	return [characterWidth, characterHeight];
}