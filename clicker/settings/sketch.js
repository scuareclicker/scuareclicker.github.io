var page;
var backButton;
var skinMenu;
var fullSkins;
var onSkins;
var skinDef = localStorage.getItem('skinsSaveDef') || "on";
var resetButton;
var themeMenu;
var themeDark;
var themeLight;
var themeMTA;
var themeDef = localStorage.getItem('themesSaveDef') || "light";
var cheat;
var cheatCode;
theme = localStorage.getItem('themeSave');

function setup() {
	createCanvas(600, 1200);
	styles = document.createElement('style');
	document.head.append(styles);

	backButton = createButton('Back');
	backButton.position(10, 10);
	backButton.mousePressed(back);
	backButton.addClass('button');
	// Skins Buttons
	fullSkins = createDiv('Full');
	fullSkins.position(10, 132);
	fullSkins.addClass('middleSkinsMenu');
	fullSkins.mousePressed(skinsFull);
	onSkins = createDiv('On');
	onSkins.position(10, 164);
	onSkins.addClass('middleSkinsMenu');
	onSkins.mousePressed(skinsOn);
	offSkins = createDiv('Off');
	offSkins.position(10, 200);
	offSkins.addClass('endSkinsMenu');
	offSkins.mousePressed(skinsOff);
	// Themes Buttons
	themeDark = createDiv('Dark');
	themeDark.position(175, 132);
	themeDark.addClass('middleSkinsMenu');
	themeDark.mousePressed(themesDark);
	themeLight = createDiv('Light');
	themeLight.position(175, 164);
	themeLight.addClass('middleSkinsMenu');
	themeLight.mousePressed(themesLight);
	themeMTA = createDiv('MTA');
	themeMTA.position(175, 200);
	themeMTA.addClass('endSkinsMenu');
	themeMTA.mousePressed(themesMTA);
	// Reset Button
	resetButton = createButton('Reset');
	resetButton.position(90, 10);
	resetButton.mousePressed(reset);
	resetButton.addClass('button');
	// Cheats
	cheat = createInput(cheatCode);
	cheat.position(10, 1100);
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
			"}" +
			".dropDownMenu {" +
			"background-color: lightgray" +
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
			"}" +
			".dropDownMenu {" +
			"background-color: gray" +
			"}";
		textColor = '#b55400';
		generalColor = '#393e46';
		pressColor = 'gray';
	}
	background(bgColor);
	cheatCode = cheat.value();
	// Skin Menu
	skinMenu = createDiv('Skins');
	skinMenu.position(10, 100);
	skinMenu.addClass('dropDownMenu');
	// Theme Menu
	themeMenu = createDiv('Themes');
	themeMenu.position(175, 100);
	themeMenu.addClass('dropDownMenu');
	changeSelect();
	saveDefs();
}

function back() {
	window.open("../index.html", "_self");
}

function skinsFull() {
	if (themeDef == "MTA") {
		var confirmationFullMTA = confirm("Having full body skins and the MTA theme at the same time leads to graphical errors, do you want to continue?");
		if (confirmationFullMTA) {
			skins = "full";
			skinDef = "full";
			localStorage.setItem('skinSave', skins);
		}
	} else {
		skins = "full";
		skinDef = "full";
		localStorage.setItem('skinSave', skins);
	}
}

function skinsOn() {
	skins = "on";
	skinDef = "on";
	localStorage.setItem('skinSave', skins);
}

function skinsOff() {
	skins = "off";
	skinDef = "off";
	localStorage.setItem('skinSave', skins);
}

function themesDark() {
	themeDef = "dark";
	theme = "dark";
	localStorage.setItem('themeSave', theme);
}

function themesLight() {
	themeDef = "light";
	theme = "light";
	localStorage.setItem('themeSave', theme);
}

function themesMTA() {
	themeDef = "MTA";
	theme = "MTA";
	localStorage.setItem('themeSave', theme);
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
		skins = "on";
		theme = "light";
		skinDef = "on";
		themeDef = "light";
		localStorage.clear();
	}
}

function changeSelect() {
	if (theme == "light" || theme == "MTA") {
		if (skinDef == "on") {
			onSkins.style('background-color: lightgray;');
		}
		if (skinDef == "off" || skinDef == "full") {
			onSkins.style('background-color: rgb(238, 238, 238);');
		}
		if (skinDef == "full") {
			fullSkins.style('background-color: lightgray');
		}
		if (skinDef == "off" || skinDef == "on") {
			fullSkins.style('background-color: rgb(238, 238, 238);');
		}
		if (skinDef == "off") {
			offSkins.style('background-color: lightgray;');
		}
		if (skinDef == "on" || skinDef == "full") {
			offSkins.style('background-color: rgb(238, 238, 238);');
		}
		if (themeDef == "light") {
			themeLight.style('background-color: lightgray;');
		} else if (themeDef == "dark" || themeDef == "MTA") {
			themeLight.style('background-color: rgb(238, 238, 238);');
		}
		if (themeDef == "dark") {
			themeDark.style('background-color: lightgray;');
		} else if (themeDef == "light" || themeDef == "MTA") {
			themeDark.style('background-color: rgb(238, 238, 238);');
		}
		if (themeDef == "MTA") {
			themeMTA.style('background-color: lightgray;');
		} else if (themeDef == "dark" || themeDef == "light") {
			themeMTA.style('background-color: rgb(238, 238, 238);');
		}
	} else if (theme == "dark") {
		if (skinDef == "on") {
			onSkins.style('background-color: gray;');
		}
		if (skinDef == "off" || skinDef == "full") {
			onSkins.style('background-color: #393e46');
		}
		if (skinDef == "full") {
			fullSkins.style('background-color: gray');
		}
		if (skinDef == "off" || skinDef == "on") {
			fullSkins.style('background-color: #393e46;');
		}
		if (skinDef == "off") {
			offSkins.style('background-color: gray;');
		}
		if (skinDef == "on" || skinDef == "full") {
			offSkins.style('background-color: #393e46;');
		}
		if (themeDef == "light") {
			themeLight.style('background-color: gray;');
		} else if (themeDef == "dark" || themeDef == "MTA") {
			themeLight.style('background-color: #393e46;');
		}
		if (themeDef == "dark") {
			themeDark.style('background-color: gray;');
		} else if (themeDef == "light" || themeDef == "MTA") {
			themeDark.style('background-color: #393e46;');
		}
		if (themeDef == "MTA") {
			themeMTA.style('background-color: gray;');
		} else if (themeDef == "dark" || themeDef == "light") {
			themeMTA.style('background-color: #393e46;');
		}
	}
}

function saveDefs() {
	localStorage.setItem('themesSaveDef', themeDef);
	localStorage.setItem('skinsSaveDef', skinDef);
	localStorage.setItem('cheatCodeSave', cheatCode);
}