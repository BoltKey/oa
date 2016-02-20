var divPos = {x: 0, y: 0};
var lastDivPos;
var keysDown;
var lastkd;
var time = 0;
var m;
var currMap = 0;
var editor = "editor";
var play = "play";
var menu = "menu";
var editPlay = "editPlay";
var menuid = 1;
var userid = -1;
var userName = "";
var version = "0.1";
var wipeSave = true;
var graphics = {};
var settings = {};
var sounds = {};
var e;
var programState = menu;
var medals = [];
var scores = [];
var playerBests = [];
var totalPlayers = 0;

function navigateMenu(id) {
	menuid = id;
	programState = "menu";
	makeMenu();
}
function toEditor() {
	e = new Editor();
	makeMenu();
}

function changeSetting(name, value) {
	if (typeof(value) === 'undefined') {
		settings[name] = !settings[name];
		var a = $("#s" + name);
		a.removeClass('button-primary button-highlight button-caution');
		a.addClass(settings[name] ? 'button-highlight' : 'button-caution');
	}
}
function settingsColors() {
	for (var i in settings) {
		var s = settings[i];
		var a = $("#s" + i);
		a.removeClass('button-primary button-highlight button-caution');
		a.addClass(s ? 'button-highlight' : 'button-caution');
	}
}
function main() {
	// graphics
	var names = ["bronze", "gold", "levelbutton", "platinum", "silver", "bronzesmall", "silversmall", "goldsmall", "platinumsmall", 'kongregate_white'];
	for (var i in names) {
		var name = names[i];
		graphics[name] = new Image();
		graphics[name].src = "graphics/" + name + ".png";
	}
	
	//settings
	settings.gho = true;
	settings.plgho = true;
	settings.muted = false;
	
	//sounds
	var names = ["bronze", "gold", "platinum", "silver", "grass", "jump"];
	for (var i in names) {
		var name = names[i];
		sounds[name] = new Audio();
		sounds[name].src = "sounds/" + name + ".wav";
	}
	
	// mouse
	var offset = $("#game").offset();
	$(document).mousemove(function(e){
    divPos = {
        x: e.pageX - offset.top,
        y: e.pageY - offset.left
		}
	})
	lastDivPos = {x: 0, y: 0};
	lastmd = 0;
	mouseDown = 0;
	document.body.onmousedown = function() { 
		mouseDown = 1;
	}
	document.body.onmouseup = function() { 
		mouseDown = 0;
	}
	
	replay = new Replay();
	
	// local save stuff
	var a = localStorage.getItem("oaversion");
	if ((a != version && wipeSave) || a == null) {
		localStorage.clear();
	}
	localStorage.setItem("oaversion", version);
	loadUserBests();
	//m = new Map(0);
	initProton();
	
	player = new Player();
	updateMedals();
	countPlayers();
	makeMenu();
	mainloop();
	ctx.textAlign = 'enter';
}

function newLevel(a) {
	m = new Map(a);
	currMap = a;
	replay.load(a + "best");
	m.bestTime = replay.data;
	programState = play;
	player.die();
	makeMenu();
}

function updateMedals() {
	for (var i = 0; i < maps.length; ++i) {
		var m = new Map(i);
		/*replay.load(i + "best");
		var time = replay.data.length;*/
		//if (userid > -1) {
			var t = playerBests[i];
		//}
		var time;
		if (typeof(t) == 'undefined')
			time = 0;
		else
			time = t[0];
		if (time === 0) time = 1000000;
		if (time <= m.medals.author) {
			rank = 0;
		}
		else if (time <= m.medals.gold) {
			rank = 1;
		}
		else if (time <= m.medals.silver) {
			rank = 2;
		}
		else if (time <= m.medals.bronze) {
			rank = 3;
		}
		else {
			rank = 4;
		}
		medals[i] = rank;
	}
}

function escBack() {
	navigateMenu(1);
}
function mainloop() {
	requestAnimationFrame(mainloop);
	switch(programState) {
		case play: case editPlay:
			player.frame();
			break;
		case editor:
			// something
			break;
	}
	if (mouseDown) {
		if  (lastmd) 
			drag();
		else 
			click();
	}
	
	lastDivPos.x = divPos.x;
	lastDivPos.y = divPos.y;
	lastmd = mouseDown;
	
	checkKeys();
	draw();
	
}

Math.distance = function(a, b) {
	return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}