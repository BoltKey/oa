function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	m.draw();
	player.draw();
	ctx.fillStyle = "white";
	ctx.fillText(niceTime(time), 300, 30);
}

function drawMedal(x, y, w, rank) {
	var img = new Image();
	
	switch(rank) {
		case 3:
			img.src = "graphics/bronze.png";
			break;
		case 2:
			img.src = "graphics/silver.png";
			break;
		case 1:
			img.src = "graphics/gold.png";
			break;
		case 0:
			img.src = "graphics/platinum.png";
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