var maps = [
	{"pathPoints":[[50,50],[91,286],[325,253],[508,390],[745,410]],"pathWidth":"200","grassWidth":"220","grassSlow":0.94,"authorTime":386},
	{pathPoints: [[50, 50], [200, 60], [50, 300], [280, 320], [400, 130], [520, 190], [560, 360], [420, 420]], pathWidth: 80, grassWidth: 100, grassSlow: 0.94, authorTime: 880},
	
	{"pathPoints":[[104,79],[458,121],[189,381],[627,295],[792,423],[324,536]],"pathWidth":"38","grassWidth":"143","grassSlow":"0.94","authorTime":1393},
	{"pathPoints":[[406,153],[319,122],[206,124],[143,204],[153,289],[223,357],[333,356],[425,407],[449,465],[442,527],[363,578],[270,579],[186,535],[137,463]],"pathWidth":"65","grassWidth":"84","grassSlow":0.94,"authorTime":973}
]

function Map(id) {
	if (typeof(id) === 'undefined') {
		this.map = {pathPoints: [[50, 50]], pathWidth: 80, grassWidth: 100, grassSlow: 0.94, authorTime: 0}
	}
	else 
		this.map = maps[id];
	this.start = this.map.pathPoints[0];
	this.bestTime = [];
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
		var green = 60 + Math.floor(120 * (this.map.grassSlow - 0.8) * 5);
		var others = Math.floor(180 * (this.map.grassSlow - 0.8) * 5);
		ctx.strokeStyle = "rgb(" + others + "," + green + "," + others + ")";
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