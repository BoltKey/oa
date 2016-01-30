function click() {
	if (!player.started && (programState === play || programState === editPlay)) {
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