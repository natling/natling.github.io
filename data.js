function preload() {
	table = loadTable('files/DS_U.S._Port_Calls_2012.csv', 'csv');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background(0);
}