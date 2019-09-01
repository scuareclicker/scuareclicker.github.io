//UI Variables
var bgColor = '#eeeeee';
var elementColor = '#fafafa';
var textColor = 'black';
var scuareColor = localStorage.getItem('scuareColorSave') || '#fafafa';
var clickedColor = 'lightgray';
var theme = 'light';
var currentScreen = 'game';
var wikiLink;
//Screen Menu Variables
var screen1Color;
var screen2Color;
var screen3Color;
var screen4Color;
//Variables for color effects
var tierUpgradeColor = elementColor;
var workerBuyColor = elementColor;
var craftsmenBuyColor = elementColor;
var resetColor = elementColor;
//Research Color Cariables
var lockedResearchColor = '#90a4ae'
var unlockedResearchColor = '#bdbdbd';
//Hitbox Variables
var hitScuare;
var hitScreen1;
var hitScreen2;
var hitScreen3;
var hitScreen4;
var hitUpgradeButton;
var hitWorkerButton;
var hitCraftsmenButton;
var hitResetButton;
//Skins
var hitGraySkin;
var hitBlueSkin;
var hitRedSkin;
//Gameplay Variables
// This will either get the save from localStorage or, if it is undefined, set scuares to 0
var scuares = parseInt(localStorage.getItem('scuareSave')) || 0;
var tier = parseInt(localStorage.getItem('tierSave')) || 1;
var tierCost = 10000;
//Population/Research
var population = 0;
//Workers
var workers = parseInt(localStorage.getItem('workerSave')) || 0;
var workerCost = parseInt(localStorage.getItem('workerCostSave')) || 1000;
//Craftsmen
var craftsmen = parseInt(localStorage.getItem('craftsmenSave')) || 0;
var craftsmenCost = parseInt(localStorage.getItem('craftsmenCostSave')) || 5000;
//Research Variables
var majorResearchLevel = 0;
var currentMajorProject;
var minorResearchLevel = 0;
var currentMinorProject;
//Requirements
var majorScuareRequirement = 0;
var majorTierRequirement = 0;
var majorWorkerRequirement = 0;
var majorCraftsmenRequirement = 0;

function setup() {
  frameRate(55);
  var canvas = createCanvas(600, windowHeight);
  canvas.parent('sketch');

  //Link to the wiki
  wikiLink = createA('https://github.com/scuareclicker/scuareclicker.github.io/wiki', 'Visit the wiki!');
  wikiLink.position(10, 700);
}

// Stops Spacebar from scrolling the page
window.onkeydown = function(e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
};

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
  populationGain();
  noStroke();
  // Choses what screen you're on
  if (currentScreen == 'game') {
    game();
  } else if (currentScreen == 'shop') {
    shop();
  } else if (currentScreen == 'research') {
    research();
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
  hitScreen3 = collidePointRect(mouseX, mouseY, 310, 10, 100, 50);
  hitScreen4 = collidePointRect(mouseX, mouseY, 430, 10, 100, 50);
  if (currentScreen == 'shop') {
    //Shop elements
    hitUpgradeButton = collidePointRect(mouseX, mouseY, 10, 216, 200, 40);
    hitWorkerButton = collidePointRect(mouseX, mouseY, 10, 336, 200, 40);
    if (workers >= 3) {
      hitCraftsmenButton = collidePointRect(mouseX, mouseY, 10, 488, 200, 40);
    }
  } else if (currentScreen == 'settings') {
    //Reset button
    hitResetButton = collidePointRect(mouseX, mouseY, 10, 114, 200, 40);
    //Skins
    hitGraySkin = collidePointRect(mouseX, mouseY, 10, 220, 50, 50);
    if (tier >= 2) {
      hitBlueSkin = collidePointRect(mouseX, mouseY, 70, 220, 50, 50);
      if (tier >= 3) {
        hitRedSkin = collidePointRect(mouseX, mouseY, 130, 220, 50, 50);
      }
    }
  }
}

function saveGame() {
  // Saves variables as strings, converted to integers later
  localStorage.setItem('scuareSave', scuares);
  localStorage.setItem('tierSave', tier);
  localStorage.setItem('workerSave', workers);
  localStorage.setItem('workerCostSave', workerCost);
  localStorage.setItem('craftsmenSave', craftsmen);
  localStorage.setItem('craftsmenCostSave', craftsmenCost);
  localStorage.setItem('scuareColorSave', scuareColor);
}

function selectedEffect() {
  // Controls Selected Effect
  // Only applies to buttons on screen menu
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
  // This function controls how autos like workers and autoscuarers work
  scuares = scuares + (workers * 0.15) + (craftsmen * 1);
}

function populationGain() {
  // Controls your population value
  // Could've increased population upon buying something but that makes saves before population update have 0 population
  population = workers + craftsmen;
}

function screenMenu() {
  // This is the UI for the menu that controls what screen you're on
  rectMode(CORNER);
  //1
  fill(screen1Color);
  rect(70, 10, 100, 50, 10, 10, 0, 0);
  //2
  fill(screen2Color);
  rect(190, 10, 100, 50, 10, 10, 0, 0);
  //3
  fill(screen3Color);
  rect(310, 10, 100, 50, 10, 10, 0, 0);
  //4
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
  if (hitScreen3) {
    currentScreen = 'research';
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
  if (hitCraftsmenButton && scuares >= craftsmenCost) {
    craftsmen++;
    scuares = scuares - craftsmenCost;
    craftsmenCost = craftsmenCost * 1.15 ^ craftsmen;
  }
  // Will Redirect itself to a different funcition bcuz I don't want the code getting cluttered
  if (hitResetButton) {
    reset();
  }
  // Skins
  if (hitGraySkin) {
    scuareColor = '#fafafa';
    alertify.notify('changed skin to gray!', 'success', 1)
  }
  if (hitBlueSkin) {
    scuareColor = '#3f51b5';
    alertify.notify('changed skin to blue!', 'success', 1);
  }
  if (hitRedSkin) {
    scuareColor = '##c62828';
    alertify.notify('changed skin to red!', 'success', 1)
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

  if (workers >= 3) {
    if (keyCode === 51 && scuares >= craftsmenCost) {
      craftsmen++;
      scuares = scuares - craftsmenCost;
      craftsmenCost = craftsmenCost * 1.15 ^ craftsmen;
      alertify.notify('hired a craftsman!', 'success', 1);
    } else if (keyCode == 51 && scuares < craftsmenCost) {
      alertify.notify('not enough scuares!', 'error', 1);
    }
  }

}

function game() {
  // Main Game Screen
  background(bgColor);
  screenMenu();
  tierCostIncrease();
  // The Scuare
  rectMode(CENTER);
  noStroke();
  // Skins functionality is stored in mousePressed()
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
  //Population counter
  text(int(str(population)) + ' population', 10, 132);
  // Stats displays
  // Worker counter
  text('tier:' + tier + '  cost:' + int(str(tierCost)), 10, 450);
  text('workers:' + workers + '  cost:' + int(str(workerCost)), 10, 482);
  //Craftsmen counter
  if (workers >= 3) {
    text('craftsmen:' + craftsmen + '  cost:' + int(str(craftsmenCost)), 10, 514);
  }
}

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
  // This controls how scuare gain per click is changed by tier value
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
  if (workers >= 3) {
    // Craftsmen
    textAlign(LEFT);
    text('craftsmen: ' + craftsmen, 10, 410);
    text('cost: ' + int(str(craftsmenCost)) + " scuares", 10, 440);
    fill(craftsmenBuyColor);
    rect(10, 456, 200, 40, 10);
    textAlign(CENTER);
    fill(textColor);
    text('hire', 110, 488);
  }
}

function clickedEffects() {
  // This controls color change in buttons when clicked
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
  if (hitCraftsmenButton && mouseIsPressed) {
    craftsmenBuyColor = clickedColor;
  } else {
    craftsmenBuyColor = elementColor;
  }
  if (hitResetButton && mouseIsPressed) {
    resetColor = clickedColor;
  } else {
    resetColor = elementColor;
  }
}

function research() {
  // That one thing I've been working on for so long
  background(bgColor);
  screenMenu();
  fill(textColor);
  textAlign(CENTER);
  textSize(40);
  text('research', 300, 100);
  textAlign(LEFT);
  textSize(30);
  text('major tech:', 10, 150);
  // Re-enabling a stroke for the box
  fill(lockedResearchColor);
  rectMode(CENTER);

  rect(300, 225, 580, 100, 10);
}

function reset() {
  // Controls the reseting of game data
  var resetConfirm = confirm("Really reset all your game data?");
  if (resetConfirm) {
    scuares = 0
    tier = 1;
    tierCost = 10000;
    workers = 0;
    workerCost = 1000;
    craftsmen = 0;
    craftsmenCost = 5000;
    scuareColor = '#fafafa';
    localStorage.clear();
  }
}

function settings() {
  // Pretty Self-Explanitory
  background(bgColor);
  screenMenu();
  clickedEffects();
  fill(textColor);
  textAlign(CENTER)
  textSize(40);
  text('settings', 300, 100);
  // Reset Button
  fill(resetColor);
  rect(10, 114, 200, 40, 10);
  textAlign(CENTER);
  textSize(30);
  fill(textColor);
  text('reset', 105, 146);
  // Skins
  textAlign(LEFT);
  text('skin color:', 10, 200);
  // Default/Tier 1/Gray
  fill('#fafafa');
  rect(10, 220, 50, 50, 10);
  if (tier >= 2) {
    // Blue/Tier 2
    fill('#3f51b5');
    rect(70, 220, 50, 50, 10);
    if (tier >= 3) {
      // Red/Tier 3
      fill('#c62828');
      rect(130, 220, 50, 50, 10);
    }
  }
}
