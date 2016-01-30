function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	m.draw();
	player.draw();
	ctx.fillStyle = "white";
	ctx.fillText(time, 300, 30);
}

function drawMedal(x, y, r, rank) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2);
	switch(rank) {
		case 0:
			ctx.fillStyle = "yellow";
			ctx.strokeStyle = "green";
			break;
		case 1:
			ctx.fillStyle = "yellow";
			ctx.strokeStyle = "#bbbb00";
			break;
		case 2:
			ctx.fillStyle = "#eeeeee";
			ctx.strokeStyle = "#999999";
			break;
		case 3:
			ctx.fillStyle = "#cd7f32"
			ctx.strokeStyle = "#ab6c22";
			break;
	}
	ctx.fill();
	ctx.lineWidth = r / 12;
	ctx.textAlign = "center";
	ctx.stroke();
	ctx.fillStyle = ctx.strokeStyle;
	ctx.fillText("YAY!", x, y + 3);
}