var margin = 50;

function preload() {
	table = loadTable('files/DS_U.S._Port_Calls_2012.csv', 'csv');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background(0);
}

function drawAxes() {
	line(150,height-50,width-50,height-50);
	line(150,50,150,height-50);
}