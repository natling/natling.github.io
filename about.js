var horizontalMargin = 100;
var verticalMargin = 30;

var strings = [
	'natalie braginsky',
	'music',
	'poetry',
	'art',
	'code',
	'\"an angry trans shit\"',
	'\"a markov chain\"',
	'\"road-side snapshots of robotic collisions\"',
	'\"sad-toned circuits failing in public\"',
	'\"these are the brief shards of digital noise you\'ve been looking for\"',
	'\"actual net art princess\"',
];

var positions = [], colors = [];

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

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background(solarized['base03']);

	textFont('Menlo');
	textAlign(CENTER, CENTER);

	for (var i = 0; i < strings.length; i++) {
		positions.push([random(), random()]);
		colors.push(solarized[randomItem(solarizedAccent)]);
	}	
}

function draw() {
	background(solarized['base03']);

	for (var i = 0; i < strings.length; i++) {
		fill(colors[i]);
		var x = map(positions[i][0], 0, 1, horizontalMargin, width - horizontalMargin);
		var y = map(positions[i][1], 0, 1, verticalMargin, height - verticalMargin);
		rectMode(CENTER);
		text(strings[i], x, y, 200, 50);
		// stroke(0);
		// noFill();
		// rect(x, y, 200, 50);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}