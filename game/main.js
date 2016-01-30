var divPos = {x: 0, y: 0};
var lastDivPos;
var keysDown;
var time = 0;
var m;
var currMap = 0;

function main() {
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
		++mouseDown; 
		if (mouseDown === -1 || mouseDown === 2) mouseDown = 1; 
	}
	document.body.onmouseup = function() { 
		--mouseDown;
	}
	m = new Map(0);
	replay = new Replay();
	player = new Player();
	mainloop();
}
function mainloop() {
	requestAnimationFrame(mainloop);
	player.frame();
	
	lastDivPos.x = divPos.x;
	lastDivPos.y = divPos.y;
	lastmd = mouseDown;
	checkKeys();
	draw();
}

Math.distance = function(a, b) {
	return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}