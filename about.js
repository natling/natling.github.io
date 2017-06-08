class FloatingString {

	constructor(string, x, y, col, horizontalDirection, verticalDirection, speed) {
		this.string              = string;
		this.x                   = x;
		this.y                   = y;
		this.col                 = col;
		this.horizontalDirection = horizontalDirection;
		this.verticalDirection   = verticalDirection;
		this.speed               = speed;
	}

	display() {
		var xLiteral = map(this.x, 0, 1, horizontalMargin, width - horizontalMargin);
		var yLiteral = map(this.y, 0, 1, verticalMargin, height - verticalMargin);
		fill(this.col);
		text(this.string, xLiteral, yLiteral, 200, 90);
	}

	move() {
		switch(this.horizontalDirection) {
			case 'left':
				this.x -= step * this.speed;
				break;
			case 'right':
				this.x += step * this.speed;
				break;
		}

		switch(this.verticalDirection) {
			case 'up':
				this.y -= step * this.speed;
				break;
			case 'down':
				this.y += step * this.speed;
				break;
		}

		if (this.x <= 0 || this.x >= 1) {
			this.col = randomDifferentItem(solarizedAccent, this.col);
			this.speed = random(speedLow, speedHigh);

			if (this.horizontalDirection == 'left') {
				this.horizontalDirection = 'right';
				this.x += step * speedHigh;
			} else {
				this.horizontalDirection = 'left';
				this.x -= step * speedHigh;
			}
		}

		if (this.y <= 0 || this.y >= 1) {
			this.col = randomDifferentItem(solarizedAccent, this.col);
			this.speed = random(speedLow, speedHigh);

			if (this.verticalDirection == 'up') {
				this.verticalDirection = 'down';
				this.y += step * speedHigh;
			} else {
				this.verticalDirection = 'up';
				this.y -= step * speedHigh;
			}
		}
	}
}

var horizontalMargin = 100;
var verticalMargin = 30;

var speedLow = 0.3;
var speedHigh = 1.0;

var step = 0.001;

var strings = [
	// 'natalie braginsky',
	// 'music',
	// 'poetry',
	// 'art',
	// 'code',
	'\"an angry trans shit\"',
	'\"a markov chain\"',
	'\"road-side snapshots of robotic collisions\"',
	'\"sad-toned circuits failing in public\"',
	'\"these are the brief shards of digital noise you\'ve been looking for\"',
	'\"actual net art princess\"',
	'\"noise music reminiscent of that time it was 1983 and you got sucked into your vectrex and the only way to escape was beating level 13 in mine storm\"',
	'\"nice mix of pleasure and slight unpleasantness\"',
	'\"strange short bursts of electrifying trash\"',
	'\"leaves a frustrating impression\"',
	'\"strange flashy sounds, liquid bits\"',
	'\"a computer whose cooling fans aren\'t working\"',
];

var floatingStrings = [];

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

var solarizedBase = [ 'base03', 'base02', 'base01', 'base00', 'base0', 'base1', 'base2', 'base3' ].map(function(key) {return solarized[key]});
var solarizedAccent = [ 'yellow', 'orange', 'red', 'magenta', 'violet', 'blue', 'cyan', 'green' ].map(function(key) {return solarized[key]});

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background(solarized['base03']);

	textFont('Menlo');
	textAlign(CENTER, CENTER);
	rectMode(CENTER);

	for (var i = 0; i < strings.length; i++) {
		var string              = strings[i];
		var x                   = random();
		var y                   = random();
		var col                 = randomItem(solarizedAccent);
		var horizontalDirection = randomItem(['left', 'right']);
		var verticalDirection   = randomItem(['up', 'down']);
		var speed               = random(speedLow, speedHigh);

		floatingStrings.push(new FloatingString(string, x, y, col, horizontalDirection, verticalDirection, speed));
	}
}

function draw() {
	background(solarized['base03']);

	for (var i = 0; i < floatingStrings.length; i++) {
		floatingStrings[i].display();
		floatingStrings[i].move();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function randomDifferentItem(array, item) {
	while (true) {
		var candidate = randomItem(array);
		if (candidate != item) {
			return candidate;
		}
	}
}