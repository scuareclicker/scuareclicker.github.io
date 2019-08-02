
//UI Variables
var bgColor = '#EEEEEE';
var elementColor = 'white';
var textColor = 'black';
var scuareColor = 'white';
var clickedColor = 'lightgray';
var theme = 'light';
var currentScreen = 'game';
//Top Menu Variables
var screen1Color;
var screen2Color;
var screen3Color;
var screen4Color;
//Variables for color effects
var tierUpgradeColor = elementColor;
var workerBuyColor = elementColor;
var resetColor = elementColor;
//Hitbox Variables
var hitScuare;
var hitScreen1;
var hitScreen2;
var hitScreen4;
//Gameplay Variables
// This will either get the save from localStorage or, if it is undefined, set scuares to 0
var scuares = parseInt(localStorage.getItem('scuareSave')) || 0;
var tier = parseInt(localStorage.getItem('tierSave')) || 1;
var tierCost = 10000;
//Autos
var workers = parseInt(localStorage.getItem('workerSave')) || 0;
var workerCost = parseInt(localStorage.getItem('workerCostSave')) || 1000;
var workerEfficiency = 1;

function setup() {
  createCanvas(600, 645);
}

function draw() {
  //Font for the main game menu
  textFont("Nova Mono");
  textSize(24);
  //Loads Essential Functions
  themeColors();
  hitboxes();
  saveGame();
  selectedEffect();
  automatedGain();
  noStroke();
  // Choses what screen you're on
  if (currentScreen == 'game') {
    game();
  } else if (currentScreen == 'shop') {
    shop();
  } else if (currentScreen == 'settings') {
    settings();
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
  hitScreen4 = collidePointRect(mouseX, mouseY, 430, 10, 100, 50);
  hitUpgradeButton = collidePointRect(mouseX, mouseY, 10, 216, 200, 40);
  hitWorkerButton = collidePointRect(mouseX, mouseY, 10, 336, 200, 40);
  hitResetButton = collidePointRect(mouseX, mouseY, 10, 114, 200, 40)
}

function saveGame() {
  // Saves variables as strings, converted to integers later
  localStorage.setItem('scuareSave', scuares);
  localStorage.setItem('tierSave', tier);
  localStorage.setItem('workerSave', workers);
  localStorage.setItem('workerCostSave', workerCost);
}

function selectedEffect() {
  // Controls Selected Effect on Buttons
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

function automatedGain() {
  // This function controla how autos like workers and autoscuarers work
  scuares = scuares + (workers * 0.15);
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
  if (hitScreen4) {
    currentScreen = 'settings'
  }

  if (hitUpgradeButton && scuares >= tierCost) {
    scuares = scuares - tierCost;
    tier++;

  }
  if (hitWorkerButton && scuares >= workerCost) {
    workers++;
    scuares = scuares - workerCost;
    // This will be the base formula for cost increase
    // basecost * multiplier^#unit
    workerCost = workerCost * 1.15 ^ workers;
  }
  // Will Redirect itself to a different funcition bcuz I don't want the code getting cluttered
  if (hitResetButton) {
    reset()
  }
}

function keyPressed() {
  // Automatically called, just lke mousePressed();
  if (keyCode === 49 && scuares >= tierCost) {
    tier++;
    scuares = scuares - tierCost;
    alertify.notify('tier upgraded!', 'success', 1);
  } else if (keyCode == 49 && scuares < tierCost) {
    alertify.notify('not enough scuares!', 'error', 1);
  }
  if (keyCode === 50 && scuares >= workerCost) {
    workers++;
    scuares = scuares - workerCost;
    workerCost = workerCost * 1.15 ^ workers;
    alertify.notify('enslaved a worker!', 'success', 1);
  } else if (keyCode == 50 && scuares < workerCost) {
    alertify.notify('not enough scuares!', 'error', 1);
  }
  // Some of these are alerts for when items are bought or cost too much

}

function game() {
  // Main Game Screen
  background(bgColor);
  screenMenu();
  // Having shortcuts load here stops you from farming scuares in the shop
  keyboardShortcuts();
  tierCostIncrease();
  // The Scuare
  rectMode(CENTER);
  noStroke();
  fill(scuareColor);
  // Calls upon scuareTiers() and makes scuare smaller to give feedback to the clicks
  // If 32(spacebar) is pressed, scuareTiers is called, just like if how the scuare is clicked
  if (hitScuare && mouseIsPressed || keyIsDown(32)) {
    rect(300, 300, 190, 190, 10);
    scuareTiers();
  } else {
    rect(300, 300, 200, 200, 10);
  }
  //counter for how many scuares you have
  fill(textColor);
  textSize(32);
  textAlign(LEFT);
  text(int(str(scuares)) + ' scuares', 10, 100);
  text('tier:' + tier + '  cost:' + int(str(tierCost)), 10, 450);
  text('workers:' + workers + '  cost:' + int(str(workerCost)), 10, 482);
}

function keyboardShortcuts() {}

function tierCostIncrease() {
  if (tier == 1) {
    tierCost = 10000;
  } else if (tier == 2) {
    tierCost = 1000000
  } else if (tier == 3) {
    tierCost = 100000000
  }
}

function scuareTiers() {
  // This controls how scuare gain w/ click is changes by tiers
  if (tier == 1) {
    scuares++;
  } else if (tier == 2) {
    scuares = scuares + 12;
  } else if (tier == 3) {
    scuares = scuares + 25;
  }
}

function shop() {
  // Main UI for buying autos and upgrading tiers
  background(bgColor);
  screenMenu();
  clickedEffects();
  tierCostIncrease();
  fill(textColor);
  textSize(40);
  text('shop', 300, 100);
  textAlign(LEFT);
  textSize(30);
  text(int(str(scuares)) + ' scuares', 10, 130);
  // Tier Upgrades
  text('tier: ' + tier, 10, 170);
  text('cost: ' + int(str(tierCost)) + " scuares", 10, 200);
  fill(tierUpgradeColor);
  rect(10, 216, 200, 40, 10);
  textAlign(CENTER);
  fill(textColor);
  text('upgrade', 110, 248);
  // Workers
  textAlign(LEFT);
  text('workers: ' + workers, 10, 290);
  text('cost: ' + int(str(workerCost)) + " scuares", 10, 320);
  fill(workerBuyColor);
  rect(10, 336, 200, 40, 10);
  textAlign(CENTER);
  fill(textColor);
  text('enslave', 110, 368);
  if (workers >= 10 && tier >= 10) {
    // Autoscuarers
    textAlign(LEFT);
    text('workers: ' + workers, 10, 410);

  }
}

function clickedEffects() {
  if (hitUpgradeButton && mouseIsPressed) {
    tierUpgradeColor = clickedColor;
  } else {
    tierUpgradeColor = elementColor;
  }
  if (hitWorkerButton && mouseIsPressed) {
    workerBuyColor = clickedColor;
  } else {
    workerBuyColor = elementColor;
  }
  if (hitResetButton && mouseIsPressed) {
    resetColor = clickedColor;
  } else {
    resetColor = elementColor;
  }
}

function reset() {
  var resetConfirm = confirm("Really reset all your game data?");
  if (resetConfirm) {
    scuares = 0
    tier = 1;
    tierCost = 10000;
    workers = 0;
    workerCost = 1000;
    workerEfficiency = 0;
    localstorage.clear();
  }
}

function settings() {
  // Pretty Self-Explanitory
  background(bgColor);
  screenMenu();
  clickedEffects();
  fill(textColor);
  textSize(40);
  text('settings', 300, 100);
  // Reset Button
  fill(resetColor);
  rect(10, 114, 200, 40, 10);
  textAlign(CENTER);
  textSize(30);
  fill(textColor);
  text('reset', 105, 146);
}
