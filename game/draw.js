function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	m.draw();
	player.draw();
	ctx.fillStyle = "white";
	ctx.fillText(niceTime(time), 300, 30);
}

function drawMedal(x, y, w, rank) {
	var img;
	switch(rank) {
		case 3:
			img = graphics.bronze;
			break;
		case 2:
			img = graphics.silver;
			break;
		case 1:
			img = graphics.gold;
			break;
		case 0:
			img = graphics.platinum;
			break;
	}
	ctx.drawImage(img, x - w/2, y - w/2, w, w);
}

function niceTime(t) {
	var sec = Math.floor(t / 50);
	if (sec < 10)
		sec = "0" + sec;
	var mil = Math.floor(t % 50 * 2);
	if (mil < 10)
		mil = "0" + mil;
	return sec + "." + mil;
}