// UI
var counter = parseInt(localStorage.getItem('counterSave')) || 0;
var money = parseInt(localStorage.getItem('moneySave')) || 0;
var counterText;
// Upgrades
var tier = parseInt(localStorage.getItem('tierSave')) || 1;
var tierCost = 1000;
// Autos
var autoNumber = parseInt(localStorage.getItem('autoSaveNum')) || 0;
var autoOutput = parseInt(localStorage.getItem('autSaveOut')) || autoNumber * 1.50;
var autoCost = parseInt(localStorage.getItem('autoSaveCost')) || 1000;
// Workers
var workerNumber = parseInt(localStorage.getItem('workerSaveNum')) || 0;
var workerCost = parseInt(localStorage.getItem('workerSaveCost')) || 100;
var workerOutput = parseInt(localStorage.getItem('workerSaveOut')) || workerNumber * 1.26;
// Craftsmen
var craftNumber = parseInt(localStorage.getItem('craftSaveNum')) || 0;
var craftOutput = parseInt(localStorage.getItem('craftSaveOut')) || craftNumber * 2.25;
var craftCost = parseInt(localStorage.getItem('craftSaveCost')) || 10;
// Gameplay
var roundPocalypse = false;
var decrease = 0;
var moneyGen = false;
var skins = localStorage.getItem('skinSave') || "on";
//Research
var civilization = false;
var trade = false;
var colonialism = false;
var capitalism = false;
var industry = false;
var spaceShips = false;
var currentLevel = 'None';
var nextLevel = 'Civilization';
var techCostSC = 0;
var tectCost$ = 0;
var techCostLand = 0;
// Colors
var scuareColor;
var squareColor = localStorage.getItem('skinColor') || 'white';
var craftColor;
// Hitboxes
var hitScuare = false;
// Color Hitboxes
var hitWhite = false;
var hitGray = false;
var hitRed = false;
var hitBlue = false;
var hitPurple = false;
var hitGreen = false;
var hitYellow = false;
var hitTeal = false;
// Others
var alerted;
// DOM Elements
//    Buttons
var settingsButton;
var resetButton;
var tierButton;
var autoButton;
var workerButton;

function setup() {
	createCanvas(600, 1200);
	// 	This Creates all the buttons.
	// Skins
	settingsButton = createButton('Settings');
	settingsButton.position(10, 1160);
	settingsButton.mousePressed(settings);
	// Reset
	resetButton = createButton('Reset');
	resetButton.position(210, 1160);
	resetButton.mousePressed(reset);
	// Tier
	tierButton = createButton('Upgrade');
	tierButton.position(10, 640);
	tierButton.mousePressed(upgradeTier);
	// Autos
	autoButton = createButton('\xa0\xa0Buy\xa0\xa0');
	autoButton.position(10, 760);
	autoButton.mousePressed(buyAutos);
	// Workers
	workerButton = createButton('\xa0\xa0Hire\xa0\xa0');
	workerButton.position(10, 880);
	workerButton.mousePressed(buyWorkers);
	// Craftsmen

}

function draw() {
	// Alets player if localStorage is unavailable
	textFont("Ubuntu Mono");
	if (typeof Storage !== "undefined") {
		game();

	} else if (typeof Storage !== "undefined" && alerted != 'yes') {
		window.alert("Your browser or your browser's version does not support localStorage, which is used to save game data. As soon as you close the tab, all of your progress will deleted. It is recommended to use a browser that does support localStorage, like the latest versions of Chrome, Firefox, or Opera for desktop and mobile. NONE OF YOUR DATA WILL BE SAVED IF YOU CONTINUE");
		game();
		alerted = 'yes';
	}
}

function game() {
	// Calls all other functions
	hitboxes();
	clicker();
	tierCosts();
	autos();
	saveGame();
	// loss();
	fill('black');
	background(220);
	textSize(32);
	// Money Counter
	if (autoNumber > 2 && tier > 1) {
		text('$' + str(int(money)), 10, 50);
		moneyGen = true;
	}
	// Scuare Counter
	text(int(str(counter)) + ' scuares', 10, 25);
	// Full Skin Themes
	if (skins == "full") {
		fill(squareColor);
	} else {
		fill(scuareColor);
	}
	noStroke();
	rectMode(CENTER);
	// Circle Easter Egg
	if (keyIsDown(192)) {
		ellipse(300, 300, 200, 200);
	} else if (hitScuare && mouseIsPressed && skins == "full") {
		rect(300, 300, 190, 190, 10);
	} else {
		rect(300, 300, 200, 200, 10);
	}
	rectMode(CORNER);

	if (skins == "on" || skins == "full") {
		fill(squareColor);
		rect(275, 275, 50, 50, 10);
		if (tier > 2) {
			if (skins == 'full') {
				fill(238, 238, 238);
			} else {
				fill('white');
			}
			rect(10, 500, 50, 50, 10);
			fill(58, 61, 75);
			rect(85, 500, 50, 50, 10);
		}
		if (tier > 3) {
			fill('crimson');
			rect(160, 500, 50, 50, 10);
		}
		if (tier > 4) {
			fill('#0277bd');
			rect(235, 500, 50, 50, 10);
		}
		if (tier > 5) {
			fill('#673ab7');
			rect(310, 500, 50, 50, 10);
		}
		if (tier > 6) {
			fill('#2e7d32');
			rect(385, 500, 50, 50, 10);
		}
		if (tier > 7) {
			fill('gold');
			rect(460, 500, 50, 50, 10);
		}
		if (tier > 8) {
			fill('#00695c');
			rect(535, 500, 50, 50, 10);
		}
	}
	shop();
}

function clicker() {
	// Tiers
	if (hitScuare && mouseIsPressed && tier == 1) {
		counter = counter + 1;
		scuareColor = 'lightgray';
	} else if (hitScuare && mouseIsPressed && tier == 2) {
		counter = counter + 10;
		scuareColor = 'lightgray';
	} else if (hitScuare && mouseIsPressed && tier == 3) {
		counter = counter + 25;
		scuareColor = 'lightgray';
	} else if (hitScuare && mouseIsPressed && tier == 4) {
		counter = counter + 100;
		scuareColor = 'lightgray';
	} else if (hitScuare && mouseIsPressed && tier == 5) {
		counter = counter + 400;
		scuareColor = 'lightgray';
	} else if (hitScuare && mouseIsPressed && tier == 6) {
		counter = counter + 1000;
		scuareColor = 'lightgray';
	} else if (hitScuare && mouseIsPressed && tier == 7) {
		counter = counter + 10000;
		scuareColor = 'lightgray';
	} else if (hitScuare && mouseIsPressed && tier == 8) {
		counter = counter + 25000;
		scuareColor = 'lightgray';
	} else if (hitScuare && mouseIsPressed && tier == 9) {
		counter = counter + 100000;
		scuareColor = 'lightgray';
	} else {
		scuareColor = color(238, 238, 238);
	}
	if (hitCraft && mouseIsPressed) {
		craftColor = 'lightgray';
	} else {
		craftColor = color(238, 238, 238);
	}
	// Cheat that makes debugging easier
	if (keyIsDown(27) && keyIsDown(16) && keyIsDown(18) && keyIsDown(18)) {
		console.log("hackz");
		counter = counter + 9999999999999999999;
	}
}

function settings() {
	window.open("settings/index.html", "_self")
}

function research() {

}

function hitboxes() {
	hitScuare = collidePointRect(mouseX, mouseY, 200, 200, 200, 200);
	hitTier = collidePointRect(mouseX, mouseY, 10, 640, 116, 30);
	hitAuto = collidePointRect(mouseX, mouseY, 10, 760, 116, 30);
	hitWorker = collidePointRect(mouseX, mouseY, 10, 880, 116, 30);
	hitCraft = collidePointRect(mouseX, mouseY, 10, 1000, 116, 30);
	hitWhite = collidePointRect(mouseX, mouseY, 10, 500, 50, 50);
	hitGray = collidePointRect(mouseX, mouseY, 85, 500, 50, 50);
	hitRed = collidePointRect(mouseX, mouseY, 160, 500, 50, 50);
	hitBlue = collidePointRect(mouseX, mouseY, 235, 500, 50, 50);
	hitPurple = collidePointRect(mouseX, mouseY, 310, 500, 50, 50);
	hitGreen = collidePointRect(mouseX, mouseY, 385, 500, 50, 50);
	hitYellow = collidePointRect(mouseX, mouseY, 460, 500, 50, 50);
	hitTeal = collidePointRect(mouseX, mouseY, 535, 500, 50, 50);

}

function tierCosts() {
	if (tier == 2) {
		tierCost = 100000;
	} else if (tier == 3) {
		tierCost = 1000000;
	} else if (tier == 4) {
		tierCost = 9999999;
	} else if (tier == 5) {
		tierCost = 100000000;
	} else if (tier == 6) {
		tierCost = 10000000000;
	} else if (tier == 7) {
		tierCost = 999999999999999;
	} else if (tier == 8) {
		tierCost = 9999999999999999999;
	}
}

function upgradeTier() {
	if (counter >= tierCost && tier < 9) {
		tier++;
		counter = counter - tierCost;
	}
}

function buyAutos() {
	if (hitAuto && counter >= autoCost && tier < 9) {
		autoNumber++;
		autoOutput = autoNumber * 1.50;
		counter = counter - autoCost;
		autoCost = autoCost + autoNumber * 10000;
	}
}

function buyWorkers() {
	if (counter >= workerCost) {
		workerNumber++;
		workerOutput = workerNumber * 1.26;
		counter = counter - workerCost;
		workerCost = workerCost + workerNumber * 1000;
	}
}

function mousePressed() {
	if (hitCraft && money >= craftCost) {
		craftNumber++;
		craftOutput = craftNumber * 2.25;
		money = money - craftCost;
		craftCost = craftCost + craftNumber * 10;
	}
	if (hitGray && tier > 2) {
		squareColor = color(58, 61, 75);
	} else if (hitWhite && tier > 1) {
		if (skins == "full") {
			squareColor = '#EEEEEE';
		} else {
			squareColor = 'white';
		}
	} else if (hitRed && tier > 3) {
		squareColor = 'crimson';
	} else if (hitBlue && tier > 4) {
		squareColor = color('#0277bd');
	} else if (hitPurple && tier > 5) {
		squareColor = '#673ab7';
	} else if (hitGreen && tier > 6) {
		squareColor = '#2e7d32';
	} else if (hitYellow && tier > 7) {
		squareColor = 'gold'
	} else if (hitTeal && tier > 8) {
		squareColor = color('#00695c');
	}
}

function reset() {
	var confirmation = confirm("Really reset all your game data?");
	if (confirmation) {
		console.log('game reset');
		squareColor = 'white';
		tier = 1;
		tierCost = 1000;
		counter = 0;
		autoNumber = 0;
		autoOutput = 0;
		autoCost = 1000;
		workerNumber = 0;
		workerOutput = 0;
		workerCost = 100;
		craftNumber = 0;
		craftOutput = 0;
		craftCost = 10;
		moneygen = false;
		money = 0;
		localStorage.clear();
	}
}

//function loss() {
//  if(counter < 0) {
//window.open("index.html", "_self");
//}
//}

function saveGame() {
	localStorage.setItem('counterSave', counter);
	localStorage.setItem('tierSave', tier);
	localStorage.setItem('moneySave', money);
	//autos
	localStorage.setItem('autoSaveNum', autoNumber);
	localStorage.setItem('autoSaveOut', autoOutput);
	localStorage.setItem('autoSaveCost', autoCost);
	//workers
	localStorage.setItem('workerSaveNum', workerNumber);
	localStorage.setItem('workerSaveOut', workerOutput);
	localStorage.setItem('workerSaveCost', workerCost);
	//craftsmen
	localStorage.setItem('craftSaveNum', craftNumber);
	localStorage.setItem('craftSaveOut', craftOutput);
	localStorage.setItem('craftSaveCost', craftCost);
	//skins
	localStorage.setItem('skinColor', squareColor);
}

function shop() {
	fill('black');
	textSize(30);
	// Tiers
	text('Tier:' + tier, 10, 630);
	if (tier < 9) {
		fill('black');
		text('Cost:' + tierCost + ' scuares', 10, 700);
	} else {
		fill('black');
		text('Cost:' + 'Max Level', 10, 700);
	}
	// Autos
	text('AutoScuarers:' + autoNumber, 10, 750);
	fill('black');
	fill('black');
	text('Cost:' + autoCost + ' scuares', 10, 820);
	// Workers
	text('Workers:' + workerNumber, 10, 870);
	fill('black');
	text('Cost:' + workerCost + ' scuares', 10, 940);
	// Craftsmen
	if (moneyGen === true) {
		text('Craftsmen:' + craftNumber, 10, 990);
		fill(craftColor);
		rect(10, 1000, 136, 30, 10);
		fill('black');
		text('Hire', 48, 1025);
		fill('black');
		text('Cost:' + '$' + craftCost, 10, 1061);
	}
}

function autos() {
	counter = counter + autoOutput + workerOutput + craftOutput;
	if (moneyGen === true) {
		money = money + 0.01 + craftOutput / 20
	}
}