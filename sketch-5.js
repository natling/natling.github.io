class Graph {

	constructor(speed, color) {
		this.speed = speed;
		this.color = color;
		this.nodes = [];

		for (var i = 0; i < 2; i++) {
			for (var j = 0; j < 2; j++) {
				var x = i ? 0 : width  - 1;
				var y = j ? 0 : height - 1;

				this.nodes.push({x, y});
			}
		}
	}

	render() {
		edges.forEach(edge => {
			var [
				{x: x1, y: y1},
				{x: x2, y: y2},
				{x: x3, y: y3},
				{x: x4, y: y4},
			] = edge.map(index => this.nodes[index]);

			stroke(this.color);
			strokeWeight(0.5);
			noFill();
			bezier(x1, y1, x2, y2, x3, y3, x4, y4);
		});
	}

	move() {
		this.nodes.forEach(node => {
			var atLeft   = node.x <= 0;
			var atRight  = node.x >= width  - 1;
			var atTop    = node.y <= 0;
			var atBottom = node.y >= height - 1;

			if (atTop    && ! atRight)  {node.x += this.speed}
			if (atBottom && ! atLeft)   {node.x -= this.speed}
			if (atRight  && ! atBottom) {node.y += this.speed}
			if (atLeft   && ! atTop)    {node.y -= this.speed}

			node.x = constrain(node.x, 0, width  - 1);
			node.y = constrain(node.y, 0, height - 1);
		});
	}
}

var edges = permutations([0, 1, 2, 3]);

var colors = [
	[   0, 255, 255 ],
	[ 255,   0, 255 ],
	[ 255, 255,   0 ],
];

var graphs;

function setup() {
	var size = Math.min(windowWidth, windowHeight) * 0.9;

	createCanvas(size, size);
	background(0);

	graphs = colors.map((color, i) => new Graph((i + 1) * 3, color));
}

function draw() {
	background(0, 5);

	graphs.forEach(graph => {
		graph.render();
		graph.move();
	});
}