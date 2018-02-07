class Snowflake {

	constructor(aboveScreen) {
		this.aboveScreen = aboveScreen;
		this.belowScreen = false;

		this.createDiv();
		this.addGlyph();
		this.setColor();
		this.setCoordinates(this.aboveScreen);
		this.update();
	}

	createDiv() {
		this.div = document.createElement('div');
		document.body.appendChild(this.div);
	}

	addGlyph() {
		this.glyph  = randomItem(settings.glyphs);
		this.width  = settings.glyphsDimensions[this.glyph].width;
		this.height = settings.glyphsDimensions[this.glyph].height;
		this.div.innerHTML = this.glyph;
	}

	setColor() {
		var shade = randomIntegerInclusive(100, 255);
		var rgb = 'rgb(' + shade + ', ' + shade + ', ' + shade + ')';
		this.div.style.color = rgb;
	}

	setCoordinates(aboveScreen) {
		this.z = randomIntegerInclusive(0, -settings.depth);

		this.xRange = 0 - this.z * settings.width  / (settings.perspective * 2);
		this.yRange = 0 - this.z * settings.height / (settings.perspective * 2);

		this.x = randomIntegerInclusive(0 - this.xRange, settings.width + this.xRange - this.width);

		if (aboveScreen) {
			this.y = Math.floor(0 - this.yRange - this.height);
		} else {
			this.y = randomIntegerInclusive(0 - this.yRange, settings.height + this.yRange - this.height);
		}
	}

	update() {
		if (! this.belowScreen) {
			this.div.style.transform = 'translate3d(' + this.x + 'px, ' + this.y + 'px, ' + this.z + 'px)';
			this.fall();
			this.checkIfBelowScreen();
			setTimeout(this.update.bind(this), settings.frameDuration);
		} else {
			document.body.removeChild(this.div);
		}
	}

	fall() {
		this.y++;

		if (coin(settings.jitter)) {
			if (coin(0.5)) {
				this.x++;
			} else {
				this.x--;
			}
		}
	}

	checkIfBelowScreen() {
		if (this.y > settings.height + this.yRange) {
			this.belowScreen = true;
		}
	}
}

var settings = {
	width         : window.innerWidth,
	height        : window.innerHeight,
	depth         : 100,
	perspective   : 100,
	density       : 200,
	jitter        :   0.1,
	frameDuration :  10,
};

var snowflakes = [];

snowstorm();

function snowstorm() {
	initialize();
	startSnowing();
	continueSnowing();
}

function initialize() {
	settings.glyphs = ['2744', '2745', '2746'].map(x => String.fromCharCode(parseInt(x, 16)));

	settings.glyphsDimensions = {};

	for (var i = 0; i < settings.glyphs.length; i++) {
		var [width, height] = getCharacterDimensions(settings.glyphs[i]);
		settings.glyphsDimensions[settings.glyphs[i]] = {
			width  : width,
			height : height
		};
	}

	document.body.style.perspective = settings.perspective + 'px';
}

function startSnowing() {
	for (var i = 0; i < settings.density; i++) {
		snowflakes.push(new Snowflake(false));
	}
}

function continueSnowing() {
	for (var i = 0; i < settings.density - snowflakes.length; i++) {
		snowflakes.push(new Snowflake(true));
	}

	snowflakes = snowflakes.filter(x => ! x.belowScreen);

	setTimeout(continueSnowing, settings.frameDuration);
}