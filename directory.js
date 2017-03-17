var strings = ['evaluation', 'okc', 'pronouns', 'things we say around love', 'why', 'you']

var canvas;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);

	for (var i = 0; i < strings.length; i++) {
		var text = createDiv("<a href=" + strings[i] + ">" + strings[i] + "</a>");
		text.position(100, (i + 1) * 100);
	}
}