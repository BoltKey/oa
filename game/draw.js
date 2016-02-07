function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (programState === play || programState === editPlay || programState === editor)
	{
		m.draw();
		player.draw();
		ctx.fillStyle = "white";
		ctx.fillText(niceTime(time), canvas.width - 45, 180);
	}
	if (programState === menu && menuid === 1) {
		for (var i = 0; i < medals.length; ++i) {
			var rank = medals[i];
			for (var j = 3; j >= rank; --j) {
				drawMedal(levelParams.x + (levelParams.padding[0] + levelParams.w) * (Math.floor(i / levelParams.rows)) + 90 - 10 * j, 
				levelParams.y + (levelParams.padding[1] + 40) * (i % levelParams.rows) + 15, 
				30,
				j)
			}
		}
	}
}

function drawMedal(x, y, w, rank) {
	var img;
	var small = w <= 30 ? "small" : "";
	switch(rank) {
		case 3:
			img = graphics["bronze" + small];
			break;
		case 2:
			img = graphics["silver" + small];
			break;
		case 1:
			img = graphics["gold" + small];
			break;
		case 0:
			img = graphics["platinum" + small];
			break;
		default:
			return;
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

function getColorScale(scale) {
	t = Math.floor(scale * 255);
	green = (t >= 128 ? 255 : t * 2);
	red = (t < 128 ? 255 : 2 * (255 - t));
	if (red < 0) red = 0;
	if (red > 255) red = 255;
	return "rgb(" + red + "," + green + ",0)";
}