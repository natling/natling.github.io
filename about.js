class FloatingString {

	constructor(string) {
		this.string = string;
		this.initialize();
	}

	initialize() {
		this.createDiv();
		this.newCoordinates();
		this.newVector();
		this.setAnimationDelay();
		this.move();
	}

	createDiv() {
		this.div = document.createElement('div');
		this.newColor();
		this.div.innerHTML = this.string;
		document.body.appendChild(this.div);
		[this.width, this.height] = [this.div.clientWidth, this.div.clientHeight];
	}

	newCoordinates() {
		var x = randomIntegerInclusive(0, settings.width  - this.width);
		var y = randomIntegerInclusive(0, settings.height - this.height);

		this.coordinates = {x, y};
	}

	newVector() {
		this.vector = randomVector();
	}

	newColor() {
		var color = randomItem(['yellow', 'orange', 'red', 'magenta', 'violet', 'blue', 'cyan', 'green']);
		this.div.style.color = settings.solarized[color];
	}

	setAnimationDelay() {
		this.div.style.animationDelay = randomFloat(0, 3) + 's';
	}

	move() {
		if (settings.frame % this.vector.x == 0) {
			this.coordinates.x += Math.sign(this.vector.x);
		}

		if (settings.frame % this.vector.y == 0) {
			this.coordinates.y += Math.sign(this.vector.y);
		}

		if (! this.inBounds()) {
			this.coordinates.x = constrain(this.coordinates.x, 0, settings.width  - this.width);
			this.coordinates.y = constrain(this.coordinates.y, 0, settings.height - this.height);

			this.bounce();
		}

		this.updatePosition();

		setTimeout(this.move.bind(this), settings.frameDuration);
	}

	inBounds() {
		var x = this.coordinates.x > 0 && this.coordinates.x < settings.width  - this.width;
		var y = this.coordinates.y > 0 && this.coordinates.y < settings.height - this.height;

		return x && y;
	}

	bounce() {
		this.newColor();
		this.newVector();
	}

	updatePosition() {
		var {x, y} = this.coordinates;

		this.div.style.left = x + 'px';
		this.div.style.top  = y + 'px';
	}
}

var settings = {
	width          : window.innerWidth,
	height         : window.innerHeight,
	frame          :  0,
	frameDuration  : 20,
	stringSpeedMin :  3,

	solarized : {
		base03  : '#002b36',
		base02  : '#073642',
		base01  : '#586e75',
		base00  : '#657b83',
		base0   : '#839496',
		base1   : '#93a1a1',
		base2   : '#eee8d5',
		base3   : '#fdf6e3',
		yellow  : '#b58900',
		orange  : '#cb4b16',
		red     : '#dc322f',
		magenta : '#d33682',
		violet  : '#6c71c4',
		blue    : '#268bd2',
		cyan    : '#2aa198',
		green   : '#859900'
	},

	strings : [
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
		'\"a computer whose cooling fans weren\'t working\"',
		'\"truth coming out of her well to shame mankind\"',
		'«искусство требует жертв»',
		'\"your computer is very sad. i want to give your computer a hug.\"',
		'\"a beautiful alien language\"',
		'\"robot spiders swarming, fire and water, rushing in your ears, dense and sensual\"',
		'\"reverberant metallic clangs and scrapes, floating stretched harmonies, light glitching, filling up the space\"',
	],
};

initialize();

function initialize() {
	document.body.style.background = settings.solarized.base03;
	settings.floatingStrings = settings.strings.map(string => new FloatingString(string));
	advanceFrame();
}

function advanceFrame() {
	settings.frame++;
	setTimeout(advanceFrame, settings.frameDuration);
}

function randomVector() {
	var x = randomIntegerInclusive(-settings.stringSpeedMin, settings.stringSpeedMin);
	var y = randomIntegerInclusive(-settings.stringSpeedMin, settings.stringSpeedMin);

	if (! (x == 0 && y == 0)) {
		return {x, y};
	} else {
		return randomVector();
	}
}

function constrain(value, min, max) {
	return Math.min(max, Math.max(value, min));
}