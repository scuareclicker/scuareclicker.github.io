//UI Variables
var bgColor = '#EEEEEE';
var theme = 'light';
var currentScreen = 'game';
//Hitbox Variables
var hitScuare;
//Gameplay Variables
  // This will either get the save from localStorage or, if it is undefined, set scuares to 0
var scuares = parseInt(localStorage.getItem('scuareSave')) || 0;
var tier = 1;

function setup() {
	createCanvas(600, 690);
}

function draw() {
	textFont("Nova Mono");
	textSize(24);
	themeColors();
	hitboxes();
	saveGame();
	noStroke();
	// Choses what screen you're on
	if (currentScreen == 'game') {
		game();
	}
}

function themeColors() {
	// Changes color based on theme
	if (theme == 'light') {
		bgColor = '#EEEEEE';
	} else if (theme == "dark") {
		bgColor = '#222831';
	}
}

function hitboxes() {
  // All rectangles must be converted to corner coords
  // Uses p5.collide library to detect collision
	rectMode(CORNER);
	hitScuare = collidePointRect(mouseX, mouseY, 200, 200, 200, 200);
}

function saveGame() {
  // Saves variables as strings, converted to integers later
  localStorage.setItem('scuareSave', scuares);
}

function screenMenu() {
  // This is the UI for the menu that controls what screen you're on
	rectMode(CORNER);
	rect(70, 10, 100, 50, 10, 10, 0, 0);
	rect(190, 10, 100, 50, 10, 10, 0, 0);
	rect(310, 10, 100, 50, 10, 10, 0, 0);
	rect(430, 10, 100, 50, 10, 10, 0, 0);
	stroke(126);
	line(0, 60, 600, 60);
}

function game() {
	// Main Game Screen
	background(bgColor);
	screenMenu();
	// The Scuare
	rectMode(CENTER);
	noStroke();
	// Calls upon scuareTeirs() and makes scuare smaller to give feedback to clcick
	if (hitScuare && mouseIsPressed) {
		rect(300, 300, 190, 190, 10);
		scuareTiers();
	} else {
		rect(300, 300, 200, 200, 10);
	}
	//counter for scuares
	textSize(32);
	text(scuares + ' scuares', 10, 500);
	text('tier: ' + tier, 10, 532);
}

function scuareTiers() {
  // This controls how scuare gain is changes by tiers
	if (tier == 1) {
		scuares++;
	}
}
