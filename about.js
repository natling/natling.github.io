var margin = 50;
var strings = [ 'natalie braginsky', 'music', 'poetry', 'art', 'code', '\"an angry trans shit\"', '\"a markov chain\"' ];

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background('#002b36');

	fill('#b58900');
	textFont('Menlo');
	textAlign(CENTER, CENTER);

	for (var i = 0; i < strings.length; i++) {
		text(strings[i], random(margin, width - margin), random(margin, height - margin));
	}
}