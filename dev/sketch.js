//UI Variables
var bgColor = '#EEEEEE';
var theme = 'light';
var currentScreen = 'game';
//Top Meny Variables
var screen1Color;
var screen2Color;
var screen3Color;
var screen4Color;
//Hitbox Variables
var hitScuare;
var hitScreen1;
var hitScreen2;
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
	else if(currentScreen == 'shop') {
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
    localStorage.clear();
}

function screenMenu() {
  // This is the UI for the menu that controls what screen you're on
	rectMode(CORNER);
	rect(70, 10, 100, 50, 10, 10, 0, 0);
	rect(190, 10, 100, 50, 10, 10, 0, 0);
	rect(310, 10, 100, 50, 10, 10, 0, 0);
	rect(430, 10, 100, 50, 10, 10, 0, 0);
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
  if(hitScreen1) {
    currentScreen = 'game';
  }
  if(hitScreen2) {
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
	// Calls upon scuareTeirs() and makes scuare smaller to give feedback to the clicks
	// If 32(spacebar) is pressed, scuareTiers is called, just like if how the scuare is clicked
	if (hitScuare && mouseIsPressed || keyIsDown(32)) {
		rect(300, 300, 190, 190, 10);
		scuareTiers();
	} else {
		rect(300, 300, 200, 200, 10);
	}
	//counter for scuares
	textSize(32);
	textAlign(LEFT);
	text('tier: ' + tier, 10, 500);
	text(int(str(scuares)) + ' scuares', 10, 532);
}

function keyboardShortcuts() {
}

function scuareTiers() {
  // This controls how scuare gain is changes by tiers
	if (tier == 1) {
		scuares++;
	}
}

function shop() {
  background(bgColor);
  screenMenu();
}