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
var theme = localStorage.getItem('themeSave') || "light";
//Research
var civilization = false;
var trade = false;
var colonialism = false;
var capitalism = false;
var industry = false;
var spaceShips = false;

var currentResearchLevel = 'None';
var nextResearchLevel = 'Civilization';

var techCostSC = 0;
var tectCost$ = 0;
var techCostLand = 0;

var techBonusMoney = 0;
var techBonusScuare = 0;
var techBonusLand = 0;
// Colors
var scuareColor;
var squareColor = localStorage.getItem('skinColor') || 'white';
var craftColor;
// Theme Colors
var bgColor;
var textColor;
var generalColor;
var pressColor;
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
var train = localStorage.getItem('trainSave') || "J";
// DOM Elements
//    Buttons
var settingsButton;
var tierButton;
var autoButton;
var workerButton;
// Images
var jTrain;
var aTrain;
var oneTrain;
var lTrain;
var sixTrain;
var fTrain;
var qTrain;
var sevenTrain;
// Sounds
var pop;
// CSS
var styles = document.createElement('style');

function preload() {
	jTrain = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/NYCS-bull-trans-J.svg/600px-NYCS-bull-trans-J.svg.png");
	jTrainSmall = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/NYCS-bull-trans-J.svg/240px-NYCS-bull-trans-J.svg.png");
	aTrain = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/NYCS-bull-trans-A.svg/600px-NYCS-bull-trans-A.svg.png");
	aTrainSmall = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/NYCS-bull-trans-A.svg/240px-NYCS-bull-trans-A.svg.png");
	gTrain = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/NYCS-bull-trans-G.svg/600px-NYCS-bull-trans-G.svg.png");
	gTrainSmall = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/NYCS-bull-trans-G.svg/240px-NYCS-bull-trans-G.svg.png");
	sixTrain = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/NYCS-bull-trans-6.svg/600px-NYCS-bull-trans-6.svg.png");
	sixTrainSmall = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/NYCS-bull-trans-6.svg/240px-NYCS-bull-trans-6.svg.png");
	fTrain = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/NYCS-bull-trans-F.svg/600px-NYCS-bull-trans-F.svg.png");
	fTrainSmall = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/NYCS-bull-trans-F.svg/240px-NYCS-bull-trans-F.svg.png");
	oneTrain = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/NYCS-bull-trans-1.svg/600px-NYCS-bull-trans-1.svg.png");
	oneTrainSmall = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/NYCS-bull-trans-1.svg/240px-NYCS-bull-trans-1.svg.png");
	qTrain = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/NYCS-bull-trans-Q.svg/600px-NYCS-bull-trans-Q.svg.png");
	qTrainSmall = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/NYCS-bull-trans-Q.svg/240px-NYCS-bull-trans-Q.svg.png");
	sevenTrain = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/NYCS-bull-trans-7.svg/600px-NYCS-bull-trans-7.svg.png");
	sevenTrainSmall = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/NYCS-bull-trans-7.svg/240px-NYCS-bull-trans-7.svg.png");
	pop = loadSound("assets/pop.wav");

}

function setup() {
	createCanvas(600, 1120);
	document.head.append(styles);
	// 	This Creates all the buttons.
	// Skins
	settingsButton = createButton('Settings');
	settingsButton.position(10, 1080);
	settingsButton.mousePressed(settings);
	settingsButton.id('button');
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
}

function font() {
	textFont("Ubuntu Mono");
}

function draw() {
	if (theme == "light" || theme == "MTA") {
		bgColor = 220;
		document.body.style.backgroundColor = "rgb(220, 220, 220)";
		styles.innerHTML = "button {" +
			"background-color: rgb(238, 238, 238);" +
			"color: black;" +
			"}" +
			"button:active {" +
			"background-color: lightgray;" +
			"}";
		textColor = 'black';
		generalColor = color(238, 238, 238);
		pressColor = 'lightgray';
	} else if (theme == "dark") {
		bgColor = '#222831';
		document.body.style.backgroundColor = "#222831";
		styles.innerHTML = "button {" +
			"background-color: #393e46;" +
			"color: #b55400;" +
			"}" +
			"button:active {" +
			"background-color: gray;" +
			"}";
		textColor = '#b55400';
		generalColor = '#393e46';
		pressColor = 'gray';
	}
	cheatCode = localStorage.getItem('cheatCodeSave');
	if (cheatCode == "FeatherLessBiped") {
		counter = -9999999
	}
	font();
	// Alets player if localStorage is unavailable
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
	fill(textColor);
	background(bgColor);
	textSize(32);
	// Money Counter
	if (autoNumber > 2 && tier > 1) {
		text('$' + str(int(money)), 10, 50);
		moneyGen = true;
	}
	// Scuare Counter
	if (theme == "light" || theme == "dark") {
		text(int(str(counter)) + ' scuares', 10, 25);
	} else if (theme == "MTA") {
		text(int(str(counter)) + ' delays', 10, 25);
	}
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
		if (theme == "light" || theme == "dark") {
			rect(300, 300, 190, 190, 10);
		}
	} else if (theme == "MTA") {
		imageMode(CENTER);
		if (train == "J") {
			image(jTrain, 300, 300, 300, 300);
		} else if (train == "A") {
			image(aTrain, 300, 300, 300, 300);
		} else if (train == "G") {
			image(gTrain, 300, 300, 300, 300);
		} else if (train == "6") {
			image(sixTrain, 300, 300, 300, 300);
		} else if (train == "F") {
			image(fTrain, 300, 300, 300, 300);
		} else if (train == "1") {
			image(oneTrain, 300, 300, 300, 300);
		} else if (train == "Q") {
			image(qTrain, 300, 300, 300, 300);
		} else if (train == "7") {
			image(sevenTrain, 300, 300, 300, 300);
		}
	} else {
		if (theme == "light" || theme == "dark") {
			rect(300, 300, 200, 200, 10);
		}
	}
	rectMode(CORNER);

	if (skins == "on" || skins == "full") {
		if (theme == "light" || theme == "dark") {
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
				https: //upload.wikimedia.org/wikipedia/commons/thumb/c/cb/NYCS-bull-trans-F.svg/600px-NYCS-bull-trans-F.svg.png
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
		} else if (theme == "MTA") {
			if (tier > 1)
				image(jTrainSmall, 35.5, 525, 75, 75); // +75
			if (tier > 2)
				image(aTrainSmall, 110.5, 525, 75, 75);
			if (tier > 3)
				image(gTrainSmall, 185.5, 525, 75, 75);
			if (tier > 4)
				image(sixTrainSmall, 260.5, 525, 75, 75);
			if (tier > 5)
				image(fTrainSmall, 335.5, 525, 75, 75);
			if (tier > 6)
				image(oneTrainSmall, 410.5, 525, 75, 75);
			if (tier > 7)
				image(qTrainSmall, 485.5, 525, 75, 75);
			if (tier > 8)
				image(sevenTrainSmall, 560.5, 525, 75, 75);
		}
	}
	shop();
}

function clicker() {
	// Tiers
	if (hitScuare && mouseIsPressed && tier == 1) {
		counter = counter + 1;
		scuareColor = 'lightgray';
		pop.play();
	} else if (hitScuare && mouseIsPressed && tier == 2) {
		counter = counter + 10;
		pop.play();
		scuareColor = 'lightgray';
	} else if (hitScuare && mouseIsPressed && tier == 3) {
		counter = counter + 25;
		pop.play();
		scuareColor = 'lightgray';
	} else if (hitScuare && mouseIsPressed && tier == 4) {
		counter = counter + 100;
		pop.play();
		scuareColor = 'lightgray';
	} else if (hitScuare && mouseIsPressed && tier == 5) {
		counter = counter + 400;
		pop.play();
		scuareColor = 'lightgray';
	} else if (hitScuare && mouseIsPressed && tier == 6) {
		counter = counter + 1000;
		pop.play();
		scuareColor = 'lightgray';
	} else if (hitScuare && mouseIsPressed && tier == 7) {
		counter = counter + 10000;
		pop.play();
		scuareColor = 'lightgray';
	} else if (hitScuare && mouseIsPressed && tier == 8) {
		counter = counter + 25000;
		pop.play();
		scuareColor = 'lightgray';
	} else if (hitScuare && mouseIsPressed && tier == 9) {
		counter = counter + 100000;
		pop.play();
		scuareColor = 'lightgray';
	} else {
		scuareColor = color(238, 238, 238);
	}
	if (hitCraft && mouseIsPressed) {
		craftColor = pressColor;
	} else {
		craftColor = generalColor;
	}
	//filler
	//filler
	//filler
	//filler
	//filler
	//filler
	if (money == 0) {
		//do nothing
	} else {
		//still do nothing
	}
	//Don't look at this chet pls
	// Cheat that makes debugging easier
	if (keyIsDown(27) && keyIsDown(16) && keyIsDown(18) && keyIsDown(18)) {
		console.log("hackz");
		counter = counter + 9999999999999999999;
	}
}

function settings() {
	window.open("settings/index.html", "_self")
}

function hitboxes() {
	if (theme == "light" || theme == "dark") {
		hitScuare = collidePointRect(mouseX, mouseY, 200, 200, 200, 200);
		hitWhite = collidePointRect(mouseX, mouseY, 10, 500, 50, 50);
		hitGray = collidePointRect(mouseX, mouseY, 85, 500, 50, 50);
		hitRed = collidePointRect(mouseX, mouseY, 160, 500, 50, 50);
		hitBlue = collidePointRect(mouseX, mouseY, 235, 500, 50, 50);
		hitPurple = collidePointRect(mouseX, mouseY, 310, 500, 50, 50);
		hitGreen = collidePointRect(mouseX, mouseY, 385, 500, 50, 50);
		hitYellow = collidePointRect(mouseX, mouseY, 460, 500, 50, 50);
		hitTeal = collidePointRect(mouseX, mouseY, 535, 500, 50, 50);
	} else if (theme == "MTA") {
		hitScuare = collidePointCircle(mouseX, mouseY, 300, 300, 230, 230);
		hitWhite = collidePointCircle(mouseX, mouseY, 35.5, 525, 59, 59);
		hitGray = collidePointCircle(mouseX, mouseY, 110.5, 525, 59, 59);
		hitRed = collidePointCircle(mouseX, mouseY, 185.5, 525, 59, 59);
		hitBlue = collidePointCircle(mouseX, mouseY, 260.5, 525, 59, 59);
		hitPurple = collidePointCircle(mouseX, mouseY, 335.5, 525, 59, 59);
		hitGreen = collidePointCircle(mouseX, mouseY, 410.5, 525, 59, 59);
		hitYellow = collidePointCircle(mouseX, mouseY, 485.5, 525, 59, 59);
		hitTeal = collidePointCircle(mouseX, mouseY, 560.5, 525, 59, 59);
	}
	hitTier = collidePointRect(mouseX, mouseY, 10, 640, 116, 30);
	hitAuto = collidePointRect(mouseX, mouseY, 10, 760, 116, 30);
	hitWorker = collidePointRect(mouseX, mouseY, 10, 880, 116, 30);
	hitCraft = collidePointRect(mouseX, mouseY, 10, 1000, 116, 30);

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
	if (hitWhite && tier > 1) {
		if (skins == "full") {
			squareColor = '#EEEEEE';
		} else {
			squareColor = 'white';
		}
		train = "J";
	} else if (hitGray && tier > 2) {
		squareColor = color(58, 61, 75);
		train = "A";
	} else if (hitRed && tier > 3) {
		squareColor = 'crimson';
		train = "G";
	} else if (hitBlue && tier > 4) {
		squareColor = color('#0277bd');
		train = "6";
	} else if (hitPurple && tier > 5) {
		squareColor = '#673ab7';
		train = "F";
	} else if (hitGreen && tier > 6) {
		squareColor = '#2e7d32';
		train = "1";
	} else if (hitYellow && tier > 7) {
		squareColor = 'gold';
		train = "Q";
	} else if (hitTeal && tier > 8) {
		squareColor = color('#00695c');
		train = "7";
	}
}

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
	localStorage.setItem('trainSave', train);
}

function shop() {
	fill(textColor);
	textSize(30);
	// Tiers
	text('Tier:' + tier, 10, 630);
	if (tier < 9) {
		text('Cost:' + tierCost + ' scuares', 10, 700);
	} else {
		text('Cost:' + 'Max Level', 10, 700);
	}
	// Autos
	text('AutoScuarers:' + autoNumber, 10, 750);
	text('Cost:' + autoCost + ' scuares', 10, 820);
	// Workers
	text('Workers:' + workerNumber, 10, 870);
	text('Cost:' + workerCost + ' scuares', 10, 940);
	// Craftsmen
	if (moneyGen === true) {
		text('Craftsmen:' + craftNumber, 10, 990);
		fill(craftColor);
		rect(10, 1000, 136, 30, 10);
		fill(textColor);
		text('Hire', 48, 1025);
		text('Cost:' + '$' + craftCost, 10, 1061);
	}
}
function autos() {
	counter = counter + autoOutput + workerOutput + craftOutput;
	if (moneyGen === true) {
		money = money + 0.01 + craftOutput / 20
	}
}
