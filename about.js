var strings = [ "natalie braginsky", "music", "poetry", "art", "\"an angry trans shit\"", "\"a markov chain\"" ];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);

	fill(255);
	textFont("Menlo");
	textAlign(CENTER, CENTER);

	for (var i = 0; i < strings.length; i++) {
		text(strings[i], random(width), random(height));
	}
}