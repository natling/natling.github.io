var interleave = require('loose-interleave');
var Chance     = require('chance');
var chance     = new Chance();

var words = [
	[ 30, [ 'ah', 'hey', 'hm', 'huh', 'oh', 'ok', 'uh', 'um', 'yeah'                                                         ] ],
	[ 20, [ 'dammit', 'eh', 'err', 'goddammit', 'ha', 'heh', 'hi', 'okay', 'ooh', 'sorry', 'ugh', 'whoa', 'wow', 'yes', 'no' ] ],
	[ 10, [ 'drat', 'gosh', 'hello', 'jeez', 'mm-hmm', 'oops', 'ow', 'phew', 'please', 'psst', 'shh', 'well', 'whoops'       ] ],
	[  1, [ 'crap', 'damn', 'fuck', 'heck', 'hell', 'jesus', 'motherfucker', 'shit'                                          ] ],
]

var punctuation = {
	values   : [ '', '.', ',', '?', '!', ':', ';', '...', ' --' ],
	internal : [  7,   9,   9,   5,   5,   1,   1,     7,     6 ],
	end      : [  3,   3,   0,   2,   2,   0,   0,     3,     2 ],
}

var layout = {
	values  : [ ' ', '\n', '\n\n' ],
	weights : [   7,    5,      1 ],
}

function word() {
	var tiers = words.map(x => x[1]);
	var weights = words.map(x => x[0]);
	var tierChoice = chance.weighted(tiers, weights);
	var wordChoice = chance.pickone(tierChoice);

	return wordChoice;
}

function poem() {
	numberOfWords = chance.integer({min: 1, max: 8});
	wordStream = Array.from({length: numberOfWords}, v => word());
	punctuationStream = Array.from({length: numberOfWords - 1}, v => chance.weighted(punctuation.values, punctuation.internal));
	punctuationStream.push(chance.weighted(punctuation.values, punctuation.end));
	layoutStream = Array.from({length: numberOfWords - 1}, v => chance.weighted(layout.values, layout.weights));

	var poem = interleave(wordStream, punctuationStream, layoutStream).join('');
	return poem;
}

console.log(poem());
document.getElementById("poem").innerHTML = poem();