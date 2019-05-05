//UI Variables
var bgColor = '#EEEEEE';
var elementColor = 'white';
var textColor = 'black';
var scuareColor = 'white';
var theme = 'light';
var currentScreen = 'game';
//Top Menu Variables
var screen1Color;
var screen2Color;
var screen3Color;
var screen4Color;
//Variables for color effects
var tierUpgradeColor = elementColor;
//Hitbox Variables
var hitScuare;
var hitScreen1;
var hitScreen2;
//Gameplay Variables
// This will either get the save from localStorage or, if it is undefined, set scuares to 0
var scuares = parseInt(localStorage.getItem('scuareSave')) || 0;
var tier = parseInt(localStorage.getItem('tierSave')) || 1;
var tierCost = 10000;

function setup() {
	createCanvas(600, 645);
}

function draw() {
	textFont("Nova Mono");
	textSize(24);
	themeColors();
	hitboxes();
	saveGame();
	selectedEffect();
	noStroke();
	// Choses what screen you're on
	if (currentScreen == 'game') {
		game();
	} else if (currentScreen == 'shop') {
		shop();
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
	hitScreen1 = collidePointRect(mouseX, mouseY, 70, 10, 100, 50);
	hitScreen2 = collidePointRect(mouseX, mouseY, 190, 10, 100, 50);
}

function saveGame() {
	// Saves variables as strings, converted to integers later
	localStorage.setItem('scuareSave', scuares);
	localStorage.setItem('tierSave', tier);
	localStorage.clear();
}

function selectedEffect() {
	// Controls Selected Effect
	if (currentScreen == 'game') {
		screen1Color = 'lightgray';
	} else {
		screen1Color = elementColor;
	}
	if (currentScreen == 'shop') {
		screen2Color = 'lightgray';
	} else {
		screen2Color = elementColor;
	}
	if (currentScreen == 'research') {
		screen3Color = 'lightgray';
	} else {
		screen3Color = elementColor;
	}
	if (currentScreen == 'settings') {
		screen4Color = 'lightgray';
	} else {
		screen4Color = elementColor;
	}

}

function screenMenu() {
	// This is the UI for the menu that controls what screen you're on
	rectMode(CORNER);
	fill(screen1Color);
	rect(70, 10, 100, 50, 10, 10, 0, 0);
	fill(screen2Color);
	rect(190, 10, 100, 50, 10, 10, 0, 0);
	fill(screen3Color);
	rect(310, 10, 100, 50, 10, 10, 0, 0);
	fill(screen4Color);
	rect(430, 10, 100, 50, 10, 10, 0, 0);
	fill(textColor);
	stroke(126);
	// A line is just a stroke so we must temporarily disable noStroke();
	line(0, 60, 600, 60);
	noStroke();
	textSize(22);
	textAlign(CENTER);
	text('I', 120, 45);
	text('II', 240, 45);
	text('III', 360, 45);
	text('IV', 480, 45);
}

function mousePressed() {
	// This function is called by default on a mousepress so we do not need to call it
	if (hitScreen1) {
		currentScreen = 'game';
	}
	if (hitScreen2) {
		currentScreen = 'shop';
	}
}

function game() {
	// Main Game Screen
	background(bgColor);
	screenMenu();
	// Having shortcuts load here stops you from farming scuares in the shop
	keyboardShortcuts();
	// The Scuare
	rectMode(CENTER);
	noStroke();
	fill(scuareColor);
	// Calls upon scuareTeirs() and makes scuare smaller to give feedback to the clicks
	// If 32(spacebar) is pressed, scuareTiers is called, just like if how the scuare is clicked
	if (hitScuare && mouseIsPressed || keyIsDown(32)) {
		rect(300, 300, 190, 190, 10);
		scuareTiers();
	} else {
		rect(300, 300, 200, 200, 10);
	}
	//counter for scuares
	fill(textColor);
	textSize(40);
	text('scuare clicker reloaded', 300, 100);
	textSize(32);
	textAlign(LEFT);
	text('tier: ' + tier, 10, 450);
	text('cost: ' + int(str(tierCost)), 165, 450);
	text(int(str(scuares)) + ' scuares', 10, 482);
}

function keyboardShortcuts() {}

function scuareTiers() {
	// This controls how scuare gain is changes by tiers
	if (tier == 1) {
		scuares++;
	}
	else if (tier == 2) {
	  scuares = scuares + 12
	}
}

function shop() {
  // Main UI for buying autos and upgrading tiers
	background(bgColor);
	screenMenu();
	fill(textColor);
	textSize(40);
	text('shop', 300, 100);
	textAlign(LEFT);
	textSize(30);
	text(int(str(scuares)) + ' scuares', 10, 130);
	text('tier: ' + tier, 10, 170);
	text('cost: ' + int(str(tierCost)) + " scuares", 10, 200);
	fill(tierUpgradeColor);
	rect(10, 216, 100, 40, 10);
	
}
