var backButton;
var skinMenu;
var fullSkins;
var onSkins;
var page;

function setup() {
	createCanvas(600, 1200);
	backButton = createButton('Back');
	backButton.position(10, 10);
	backButton.mousePressed(back);
	backButton.id('button');
	// Full Body Skins button
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
}

function draw() {
	background(255);
	skinMenu = createDiv('Skins');
	skinMenu.position(10, 100);
	skinMenu.addClass('dropdownSkins');
	skinMenu.mouseOver(skinSettings);
	skinSettings();
}

function back() {
	window.open("../index.html", "_self");
}

function skinsFull() {
	skins = "full";
	localStorage.setItem('skinSave', skins);
}

function skinsOn() {
	skins = "on";
	localStorage.setItem('skinSave', skins);
}

function skinsOff() {
	skins = "off";
	localStorage.setItem('skinSave', skins);
}