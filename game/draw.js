function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (programState === play || programState === editPlay || programState === editor)
	{
		m.draw();
		player.draw();
		
	}
	if (programState === menu && menuid === 1) {
		// medal menu
		ctx.fillStyle = "white";
		ctx.font = '16px Arial';
		ctx.textAlign = 'center';
		ctx.fillText("Total players: " + totalPlayers, 70, 20)
		for (var i = 0; i < medals.length; ++i) {
			var rank = medals[i];
			for (var j = 3; j >= rank; --j) {
				drawMedal(levelParams.x + (levelParams.padding[0] + levelParams.w) * (Math.floor(i / levelParams.rows)) + 90 - 10 * j, 
				levelParams.y + (levelParams.padding[1] + 40) * (i % levelParams.rows) + 15, 
				30,
				j)
			}
		}
		for (var i in playerBests) {
			i = - -i;  // I know what am I doing
			ctx.fillText(
				niceTime(playerBests[i][0]) + (userid > -1 ? ("; " + playerBests[i][1] + "/" + playerBests[i][2]) : ""), 
				levelParams.x + (levelParams.padding[0] + levelParams.w) * (Math.floor(i / levelParams.rows)) + 160, 
				levelParams.y + (levelParams.padding[1] + 40) * (i % levelParams.rows) + 20
			); 
			
		}
		if (userid === -1) {
			ctx.fillText("Log in to ", 50, canvas.height - 20);
			ctx.drawImage(graphics.kongregate_white, 85, canvas.height - 45, 214, 32);
			ctx.fillText("to compare with other players and submit your times (you will not lose progress)", 595, canvas.height - 20);
		}
		else {
			ctx.fillText("Your times will be submitted under your Kongregate username '" + userName + "'", 300, canvas.height - 20);
		}
		ctx.drawImage(graphics.orlogo, 500, 30, 350, 300);
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