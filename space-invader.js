const settings = {
	resolution : {
		x : 180,
		y : 120,
	},

	margin : 5,

	color : {
		foreground : [0, 255, 0],
		background : [0,   0, 0],
	},

	wave : {
		dimensions : {
			x : 11,
			y :  5,
		},

		spacing : {
			x : 2,
			y : 3,
		},

		movement : {
			speed     : 10,
			direction : false,
		},

		whichSprite : {
			speed : 30,
			state : false,
		},
	},

	sprites : {
		alienUp : {
			bitmap : [
				[ 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0 ],
				[ 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1 ],
				[ 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1 ],
				[ 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1 ],
				[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
				[ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
				[ 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0 ],
				[ 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0 ],
			],
		},

		alienDown : {
			bitmap : [
				[ 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0 ],
				[ 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0 ],
				[ 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
				[ 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0 ],
				[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
				[ 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1 ],
				[ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1 ],
				[ 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0 ],
			],
		},

		cannon : {
			bitmap : [
				[ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0 ],
				[ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
				[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
				[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
				[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
				[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
			],
		},

		laser : {
			bitmap : [
				[ 1 ],
				[ 1 ],
				[ 1 ],
				[ 1 ],
			],
		},
	},
};

class Sprite {

	constructor(sprite, coordinates) {
		this.sprite      = sprite;
		this.coordinates = coordinates;
	}

	display() {
		stroke(settings.color.foreground);

		push();
		translate(this.coordinates.x, this.coordinates.y);

		for (let y = 0; y < this.sprite.dimensions.y; y++) {
			for (let x = 0; x < this.sprite.dimensions.x; x++) {
				if (this.sprite.bitmap[y][x]) {
					point(x, y);
				}
			}
		}

		pop();
	}
}

setup = () => {
	createCanvas();
	setScale();
	background(settings.color.background);
	createSprites();
}

draw = () => {
	if (frameCount > 0) {
		scale(settings.scale);
		background(settings.color.background);
		renderSprites();
		moveAliens();
		setCurrentAlienSprite();
		moveLasers();
		detectHits();
		listen();
	}
}

const setScale = () => {
	settings.scale = Math.floor(Math.min(window.innerWidth / settings.resolution.x, window.innerHeight / settings.resolution.y));
	resizeCanvas(...[settings.resolution.x, settings.resolution.y].map(n => n * settings.scale));
}

const createSprites = () => {
	Object.keys(settings.sprites).forEach(name => {
		const sprite = settings.sprites[name];

		sprite.dimensions = {
			x : sprite.bitmap[0].length,
			y : sprite.bitmap.length,
		};
	});

	settings.aliens = [];
	setCurrentAlienSprite();

	for (let y = 0; y < settings.wave.dimensions.y; y++) {
		for (let x = 0; x < settings.wave.dimensions.x; x++) {
			const coordinates = {
				x : x * (settings.currentAlienSprite.dimensions.x + settings.wave.spacing.x) + settings.margin,
				y : y * (settings.currentAlienSprite.dimensions.y + settings.wave.spacing.y) + settings.margin,
			};

			settings.aliens.push(new Sprite(settings.currentAlienSprite, coordinates));
		}
	}

	const coordinates = {
		x : Math.round(settings.resolution.x / 2),
		y : settings.resolution.y - settings.sprites.cannon.dimensions.y,
	};

	settings.cannon = new Sprite(settings.sprites.cannon, coordinates);

	settings.lasers = [];
}

const renderSprites = () => {
	settings.aliens.forEach(alien => {
		alien.display();
	});

	settings.cannon.display();

	settings.lasers.forEach(laser => {
		laser.display();
	});
}

const moveAliens = () => {
	if (frameCount % settings.wave.movement.speed == 0) {
		const locations = [];

		settings.aliens.forEach(alien => {
			locations.push(alien.coordinates.x);
		});

		const edgeOfWave  = settings.wave.movement.direction ? Math.min(...locations) : Math.max(...locations) + settings.currentAlienSprite.dimensions.x;
		const edgeOfSpace = settings.wave.movement.direction ? settings.margin        : settings.resolution.x - settings.margin;

		const waveHasRoomToMove = Math.abs(edgeOfSpace - edgeOfWave) > 0;

		if (waveHasRoomToMove) {
			settings.aliens.forEach(alien => {
				alien.coordinates.x += settings.wave.movement.direction ? -1 : 1;
			});
		} else {
			settings.wave.movement.direction = ! settings.wave.movement.direction;
		}
	}
}

const setCurrentAlienSprite = () => {
	if (frameCount % settings.wave.whichSprite.speed == 0) {
		settings.currentAlienSprite = settings.wave.whichSprite.state ? settings.sprites.alienUp : settings.sprites.alienDown;
		settings.wave.whichSprite.state = ! settings.wave.whichSprite.state;

		settings.aliens.forEach(alien => {
			alien.sprite = settings.currentAlienSprite;
		});
	}
}

const fire = () => {
	const coordinates = {
		x : settings.cannon.coordinates.x + Math.floor(settings.sprites.cannon.dimensions.x / 2),
		y : settings.resolution.y - (settings.sprites.cannon.dimensions.y + settings.sprites.laser.dimensions.y),
	};

	settings.lasers.push(new Sprite(settings.sprites.laser, coordinates));
}

const moveLasers = () => {
	settings.lasers.forEach(laser => {
		laser.coordinates.y--;
	});

	settings.lasers = settings.lasers.filter(laser => laser.coordinates.y > -settings.sprites.laser.dimensions.y);
}

const detectHits = () => {
	for (let j = 0; j < settings.lasers.length; j++) {
		const laser = settings.lasers[j];

		for (let i = 0; i < settings.aliens.length; i++) {
			const alien = settings.aliens[i];

			if (
				laser.coordinates.x < alien.coordinates.x + alien.sprite.dimensions.x &&
				laser.coordinates.x + laser.sprite.dimensions.x > alien.coordinates.x &&
				laser.coordinates.y < alien.coordinates.y + alien.sprite.dimensions.y &&
				laser.coordinates.y + laser.sprite.dimensions.y > alien.coordinates.y
			) {
				settings.lasers.splice(j, 1);
				settings.aliens.splice(i, 1);
			}
		}
	}
}

const listen = () => {
	if (keyIsDown(LEFT_ARROW)) {
		if (settings.cannon.coordinates.x > 0) {
			settings.cannon.coordinates.x--;
		}
	}

	if (keyIsDown(RIGHT_ARROW)) {
		if (settings.cannon.coordinates.x < settings.resolution.x - settings.sprites.cannon.dimensions.x) {
			settings.cannon.coordinates.x++;
		}
	}
}

keyTyped = () => {
	if (key == ' ') {
		fire();
	}
}

windowResized = () => {
	setScale();
}