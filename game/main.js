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
var graphics = {}
var e;
var programState = play;

function toEditor() {
	e = new Editor();
	makeMenu();
}
function main() {
	// mouse
	var names = ["bronze", "gold", "levelbutton", "platinum", "silver"];
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
	makeMenu();
	m = new Map(0);
	replay = new Replay();
	player = new Player();
	mainloop();
}
function newLevel(a) {
	m = new Map(a);
	player.die();
}
function makeMenu() {
	$('.button').remove();
	var a;
	switch(programState) {
		case play: 
			for (var i = 0; i < maps.length; ++i) {
				a = $("<div class='button button-level' onclick='newLevel(" + i + ")'>" + i + "</div>");
				a.css("position", "fixed");
				a.css("left", 70 + 35 * i);
				a.css("top", 530);
				a.css("width", 30);
				a.css("height", 25);
				$("body").append(a);
			}
		case menu:
			a = $("<button type='button' class='button button-primary button-box' onclick='toEditor()'>Editor</button>");
			a.css("position", "fixed");
			a.css("left", 40);
			a.css("top", 580);
			a.css("width", 60);
			$("body").append(a);
			break;
		case editor:
			a = $("<button type='button' class='button button-primary button-box' onclick='e.play()'>Play</button>");
			a.css("position", "fixed");
			a.css("left", 250);
			a.css("top", 680);
			a.css("width", 60);
			$("body").append(a);
			break;
		case editPlay:
			a = $("<button type='button' class='button-primary button-box' onclick='e.back()'>Edit</button>");
			a.css("position", "fixed");
			a.css("left", 250);
			a.css("top", 680);
			a.css("width", 60);
			$("body").append(a);
			break;
	}
	
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