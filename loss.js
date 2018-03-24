var loss = [
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
	[ 0, 1, 0, 0, 0, 1, 0, 0, 0 ],
	[ 0, 1, 0, 0, 0, 1, 0, 1, 0 ],
	[ 0, 1, 0, 0, 0, 1, 0, 1, 0 ],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
	[ 0, 1, 0, 1, 0, 1, 0, 0, 0 ],
	[ 0, 1, 0, 1, 0, 1, 0, 0, 0 ],
	[ 0, 1, 0, 1, 0, 1, 1, 1, 0 ],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
];

var [lossWidth, lossHeight] = [loss[0], loss].map(x => x.length);

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	stroke(255);

	var levels = Math.min(...[getBaseLog(lossWidth, width), getBaseLog(lossHeight, height)].map(Math.floor));

	var marginX = (width  - lossWidth  ** levels) / 2;
	var marginY = (height - lossHeight ** levels) / 2;

	translate(marginX, marginY);
	recursiveLoss(levels);
}

function recursiveLoss(level) {
	level--;

	for (var j = 0; j < lossHeight; j++) {
		for (var i = 0; i < lossWidth; i++) {
			push();

			var x = lossWidth  ** level * i;
			var y = lossHeight ** level * j;

			translate(x, y);

			if (loss[j][i]) {
				if (level > 0) {
					recursiveLoss(level);
				} else {
					point(0, 0);
				}
			}

			pop();
		}
	}
}