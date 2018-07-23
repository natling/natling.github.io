class Graph {

	constructor(order, speed, color) {
		this.order = order;
		this.speed = speed;
		this.color = color;

		this.nodes = Array.from({length: this.order}, () => ({x: 0, y: 0}));
		this.edges = combinations(Array.from({length: this.order}, (v, i) => i), 4).map(combination => permutations(combination)).reduce((a, c) => a.concat(c));

		this.nodes.forEach((node, i) => {
			var distance = (size * 4 - 4) / this.order * i;
			this.move(node, distance);
		});
	}

	render() {
		this.edges.forEach(edge => {
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

	move(node, distance) {
		for (var i = 0; i < distance; i++) {
			var atLeft   = node.x <= 0;
			var atRight  = node.x >= size - 1;
			var atTop    = node.y <= 0;
			var atBottom = node.y >= size - 1;

			if (atTop    && ! atRight)  {node.x++}
			if (atBottom && ! atLeft)   {node.x--}
			if (atRight  && ! atBottom) {node.y++}
			if (atLeft   && ! atTop)    {node.y--}
		}
	}

	rotate() {
		this.nodes.forEach(node => this.move(node, this.speed));
	}
}

var colors = [
	[   0, 255, 255 ],
	// [ 255,   0, 255 ],
	// [ 255, 255,   0 ],
];

var graphs, size;

function setup() {
	size = Math.min(windowWidth, windowHeight) * 0.9;

	createCanvas(size, size);
	background(0);

	graphs = colors.map((color, i) => {
		var order = 8;
		var speed = (i + 1) * 3;

		return new Graph(order, speed, color);
	});
}

function draw() {
	background(0);

	graphs.forEach(graph => {
		graph.render();
		graph.rotate();
	});
}