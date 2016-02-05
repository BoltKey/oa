var keysDown = [];
var lastkd = [];
$(document).keydown(function(ev) { 
	if (keysDown.indexOf(ev.keyCode) === -1) {
		keysDown.push(ev.keyCode); 
		console.log("currently pressed keys are " + keysDown + " last keys are: " + lastkd);
	}
	if ([8, 37, 38, 39, 40].indexOf(ev.keyCode) !== -1) {
		ev.preventDefault();
	}
});
$(document).keyup(function(ev) { keysDown.splice(keysDown.indexOf(ev.keyCode), 1) } );

function checkKeys() {
	for (k of keysDown) {
		if (lastkd.indexOf(k) > -1) {
			keyHold(k);
		}
		else {
			keyPress(k);
		}
	}
	lastkd = JSON.parse(JSON.stringify(keysDown));
}

function keyPress(k) {
	switch(k) {
		case 46: e.del(); break;
		case 82: player.die(); break;
		case 8: e.undo(); break;
		case 74: e.special("jump"); break;
		case 27: escBack(); break;
	}
}
function keyHold(k) {
	
}