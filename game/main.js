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
var menuid = 0;
var graphics = {};
var e;
var programState = menu;
var medals = [];

function navigateMenu(id) {
	menuid = id;
	programState = "menu";
	makeMenu();
}
function toEditor() {
	e = new Editor();
	makeMenu();
}
function main() {
	// mouse
	var names = ["bronze", "gold", "levelbutton", "platinum", "silver", "bronzesmall", "silversmall", "goldsmall", "platinumsmall"];
	for (var i in names) {
		var name = names[i];
		graphics[name] = new Image();
		graphics[name].src = "graphics/" + name + ".png";
	}
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
	
	//m = new Map(0);
	replay = new Replay();
	player = new Player();
	updateMedals();
	makeMenu();
	mainloop();
	
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
		replay.load(i + "best");
		var time = replay.data.length;
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
	if (programState === play) {
		navigateMenu(1);
		return;
	}
	navigateMenu(0);
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