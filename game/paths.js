var maps = [
	{start: [50, 50], pathPoints: [[50, 50], [200, 60], [50, 300], [280, 320], [400, 130], [520, 190], [560, 360], [420, 420]], pathWidth: 80, grassWidth: 100, grassSlow: 0.94, authorTime: 885, bestTime: []},
]

function Map(id) {
	this.map = maps[id];
	var t = this.map.authorTime;
	this.medals = {
		author: t, 
		gold: Math.floor((t * 1.1) / 50) * 50, 
		silver: Math.floor((t * 1.7) / 50) * 50, 
		bronze: Math.floor((t * 2.5) / 50) * 50
	};
	this.draw = function() {
		ctx.beginPath();
		var point;
		for (var i = 0; i < this.map.pathPoints.length; ++i) {
			point = this.map.pathPoints[i];
			ctx.lineTo(point[0], point[1]);
		}
		
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.lineWidth = this.map.grassWidth;
		ctx.strokeStyle = "#003b00";
		ctx.stroke();
		ctx.lineWidth = this.map.pathWidth;
		ctx.strokeStyle = "#bbbbbb";
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(point[0], point[1], this.map.grassWidth / 2, 0, Math.PI * 2);
		ctx.fillStyle = "#00ff00";
		ctx.fill();
		ctx.fillStyle = "white";
		ctx.fillRect(canvas.width, 0, -80, 150);
		var rank = 0;
		for (var i in m.medals) {
			ctx.font = "7px Arial";
			drawMedal(canvas.width - 60, 40 + rank * 30, 10, rank);
			ctx.font = "15px Arial";
			ctx.fillText(niceTime(m.medals[i]), canvas.width - 30, 40 + rank * 30);
			++rank;
		}
		/*ctx.lineWidth = 1;
		ctx.strokeStyle = "#000000";
		ctx.stroke();*/	
	}
}