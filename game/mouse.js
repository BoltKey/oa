function click() {
	if ((programState === play || programState === editPlay)) {
		if (player.finished && player.effect < 250)
			player.effect = 250;
		else if (player.started)
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