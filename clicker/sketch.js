//UI Variables
var bgColor = '#EEEEEE';
var elementColor = 'white';
//Variables for color effects
var tierUpgradeColor = elementColor;
var workerBuyColor = elementColor;
var craftsmenBuyColor = elementColor;
var resetColor = elementColor;
//Hitbox Variables
var hitScuare;
//Autos
var workers = parseInt(localStorage.getItem('workerSave')) || 0;
var workerCost = parseInt(localStorage.getItem('workerCostSave')) || 1000;
var workerEfficiency = 1;
//
var craftsmen = parseInt(localStorage.getItem('craftsmenSave')) || 0;
var craftsmenCost = parseInt(localStorage.getItem('craftsmenCostSave')) || 5000;

function setup() {
  createCanvas(600, 645);

  //Link to the wiki
  wikiLink = createA('https://github.com/scuareclicker/scuareclicker.github.io/wiki', 'Visit the wiki');
  wikiLink = createA('https://github.com/scuareclicker/scuareclicker.github.io/wiki', 'Visit the wiki!');
  wikiLink.position(10, 645);
}

function hitboxes() {
  hitScreen4 = collidePointRect(mouseX, mouseY, 430, 10, 100, 50);
  hitUpgradeButton = collidePointRect(mouseX, mouseY, 10, 216, 200, 40);
  hitWorkerButton = collidePointRect(mouseX, mouseY, 10, 336, 200, 40);
  hitResetButton = collidePointRect(mouseX, mouseY, 10, 114, 200, 40)
  hitCraftsmenButton = collidePointRect(mouseX, mouseY, 10, 488, 200, 40)
  hitResetButton = collidePointRect(mouseX, mouseY, 10, 114, 200, 40);
}

function saveGame() {
  localStorage.setItem('tierSave', tier);
  localStorage.setItem('workerSave', workers);
  localStorage.setItem('workerCostSave', workerCost);
  localStorage.setItem('craftsmenSave', craftsmen);
  localStorage.setItem('craftsmenCostSave', craftsmenCost);
}

function selectedEffect() {
  // Controls Selected Effect on Buttons
  // Controls Selected Effect on Screen Buttons
  if (currentScreen == 'game') {
    screen1Color = 'lightgray';
  } else {}

  function automatedGain() {
    // This function controla how autos like workers and autoscuarers work
    scuares = scuares + (workers * 0.15);
    // This function controla how autos like workers and craftsmen work
    scuares = scuares + (workers * 0.15) + (craftsmen * 1);
  }

  function screenMenu() {
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
    reset()
  } else if (keyCode == 49 && scuares < tierCost) {
    alertify.notify('not enough scuares!', 'error', 1);
  }

  if (keyCode === 50 && scuares >= workerCost) {
    workers++;
    scuares = scuares - workerCost;
  } else if (keyCode == 50 && scuares < workerCost) {
    alertify.notify('not enough scuares!', 'error', 1);
  }

  if (workers >= 3) {
    if (keyCode === 51 && scuares >= craftsmenCost) {
      craftsmen++;
      scuares = scuares - craftsmenCost;
      craftsmenCost = craftsmenCost * 1.15 ^ craftsmen;
      alertify.notify('hired a craftsmen!', 'success', 1);
    } else if (keyCode == 51 && scuares < craftsmenCost) {
      alertify.notify('not enough scuares!', 'error', 1);
    }
  }
  // Some of these are alerts for when items are bought or cost too much

}
text(int(str(scuares)) + ' scuares', 10, 100);
text('tier:' + tier + '  cost:' + int(str(tierCost)), 10, 450);
text('workers:' + workers + '  cost:' + int(str(workerCost)), 10, 482);
if (workers >= 3) {
  text('craftsmen:' + craftsmen + '  cost:' + int(str(craftsmenCost)), 10, 514);
}

}

function keyboardShortcuts() {}
textAlign(CENTER);
fill(textColor);
text('enslave', 110, 368);
if (workers >= 10 && tier >= 10) {
  // Autoscuarers
  textAlign(LEFT);
  text('workers: ' + workers, 10, 410);
  if (workers >= 3) {
    // Craftsmen
    text('craftsmen: ' + craftsmen, 10, 410);
    text('cost: ' + int(str(craftsmenCost)) + " scuares", 10, 440);
    fill(craftsmenBuyColor);
    rect(10, 488, 200, 40, 10);
    textAlign(CENTER);
    fill(textColor);
    text('hire', 110, 368);

  }
}
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
  tierCost = 10000;
  workers = 0;
  workerCost = 1000;
  workerEfficiency = 0;
  craftsmen = 0;
  craftsmenCost = 5000;
  localstorage.clear();
}
}
