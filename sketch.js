let grid_space = 5;
let grid = [];

let cols, rows;

let xPos, yPos;

let dir;
const antUP = 0;
const antRIGHT = 1;
const antDOWN = 2;
const antLEFT = 3;
let offColor;
let onColor;


function setup() {
	createCanvas(1000,700);
	offColor = color(255);
	onColor = color(0);
	background(offColor);
	grid = drawGrid();
	xPos = floor(cols/2);
	yPos = floor(rows/2);
	dir = antUP;
	frameRate(20);
}

function draw() {
	for (let n =0; n < 100; n++) {
		checkEdges();
		let state = grid[xPos][yPos];

		if (state == 0) {
			dir++;
			grid[xPos][yPos] = 1;
			fill(onColor);
			if (dir > antLEFT) {
				dir = antUP;
			}

		}
		else {
			dir--;
			grid[xPos][yPos] = 0;
			fill(offColor);
			if (dir < antUP) {
				dir = antLEFT;
			}
		}
		rect(xPos*grid_space, yPos*grid_space, grid_space, grid_space);
		nextMode();
	}
}

function drawGrid() {
	cols = width/grid_space;
	rows = height/grid_space;
	let arr = new Array(cols);
	for (let i = 0; i < cols; i++) {
		arr[i] = new Array(rows);
		for (let j =0; j < rows; j++){
			let x = i * grid_space;
			let y = j * grid_space;
			stroke(0);
			strokeWeight(1);
			noFill();
			rect(x,y,grid_space,grid_space);
			arr[i][j] = 0;
		}
	}
	return arr;
}

function nextMode() {
	if (dir == antUP) {
		yPos--;
	}
	else if (dir == antRIGHT) {
		xPos++;
	}
	else if (dir == antDOWN) {
		yPos++;
	}
	else if (dir == antLEFT) {
		xPos--;
	}
}

function checkEdges() {
	if (xPos > cols-1) {
		xPos = 0;
	}
	else if (xPos < 0) {
		xPos = cols-1;
	}
	
	if (yPos > rows-1) {
		yPos = 0;
	}
	else if (yPos < 0) {
		yPos = rows-1;
	}
}
