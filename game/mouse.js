function click() {
	if ((programState === play || programState === editPlay)) {
		if (player.started)
			player.die();
		else 
			player.started = true;
	}
	else if (programState === editor && divPos.y < canvas.height) {
		e.click([divPos.x, divPos.y]);
	}
}

function drag() {
	if (programState === editor && divPos.y < canvas.height) {
		e.drag();
	}
}