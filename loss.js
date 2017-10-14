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

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	stroke(255);

	var levels = Math.min(Math.round(getBaseLog(loss[0].length, width)), Math.round(getBaseLog(loss.length, height))) - 1;

	var marginX = (width - loss[0].length ** (levels + 1)) / 2;
	var marginY = (height - loss.length ** (levels + 1)) / 2;

	translate(marginX, marginY);
	recursiveLoss(levels);
}

function recursiveLoss(level) {
	for (var j = 0; j < loss.length; j++) {
		for (var i = 0; i < loss[0].length; i++) {
			push();
			translate(loss[0].length ** level * i, loss.length ** level * j);

			if (loss[j][i]) {
				if (level > 0) {
					recursiveLoss(level - 1);
				} else {
					point(0, 0);
				}
			}

			pop();
		}
	}
}