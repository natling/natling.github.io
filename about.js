var margin = 50;
var strings = [ 'natalie braginsky', 'music', 'poetry', 'art', 'code', '\"an angry trans shit\"', '\"a markov chain\"' ];
var menlo;

var solarized = {
	'base03':  '#002b36',
	'base02':  '#073642',
	'base01':  '#586e75',
	'base00':  '#657b83',
	'base0':   '#839496',
	'base1':   '#93a1a1',
	'base2':   '#eee8d5',
	'base3':   '#fdf6e3',
	'yellow':  '#b58900',
	'orange':  '#cb4b16',
	'red':     '#dc322f',
	'magenta': '#d33682',
	'violet':  '#6c71c4',
	'blue':    '#268bd2',
	'cyan':    '#2aa198',
	'green':   '#859900'
};

var solarizedBase = [ 'base03', 'base02', 'base01', 'base00', 'base0', 'base1', 'base2', 'base3' ];
var solarizedAccent = [ 'yellow', 'orange', 'red', 'magenta', 'violet', 'blue', 'cyan', 'green' ];

function preload() {
	menlo = loadFont('fonts/Menlo.otf');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background(solarized['base03']);

	textFont(menlo);
	textAlign(CENTER, CENTER);

	for (var i = 0; i < strings.length; i++) {
		fill(solarized[randomItem(solarizedAccent)]);
		text(strings[i], random(margin, width - margin), random(margin, height - margin));
	}
}