var table;

function preload() {
	table = loadTable("files/HDI.csv", "csv", "header");
}

function setup() {
	console.log(table);
}

function draw() {
}