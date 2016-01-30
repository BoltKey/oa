function Player() {
	this.pos = [50, 50];
	this.speed = [0, 0];
	this.accel = [0, 0];
	this.fat = 3;
	this.maxAccel = 0.01;
	this.mouseSens = 10000;
	this.grassSlow = 0.94;
	this.maxSpeed = 5;
	this.finished = false;
	this.pivot = [canvas.width / 2, canvas.height / 2];
	this.frame = function() {
		if (this.finished) {
			this.speed[0] *= 0.95;
			this.speed[1] *= 0.95;
			this.accel = [0, 0];
		}
		else {
			
			++time;
			this.pivot = this.pos;
			
			// calculate distance to nearest path
			var dist = 100000;
			for (var i = 0; i < m.map.pathPoints.length - 1; ++i) {
				var a = m.map.pathPoints[i];
				var b = m.map.pathPoints[i + 1];
				var x = a[0] - b[0];
				var y = a[1] - b[1];
				var c = Math.pow(x, 2) + Math.pow(y, 2);
				var p = ((- a[0] + this.pos[0]) * x + (- a[1] + this.pos[1]) * y) / c;
				if (p < 0) {
					if (p > -1)
						dist = Math.min(dist, Math.distance(this.pos, [a[0] + p * x, a[1] + p * y]));
					else
						dist = Math.min(dist, Math.distance(this.pos, b));
				}
				else 
					dist = Math.min(dist, Math.distance(this.pos, a));
				
			}
			//console.log("p: " + p);
			//console.log("dist: "+  dist);
			
			// update of accel based on mousepos
			var mouse = [divPos.x, divPos.y];
			var coef = Math.max(1, (Math.distance(mouse, this.pivot)) / (this.maxAccel * this.mouseSens));
			this.accel[0] = ((divPos.x - this.pivot[0]) / this.mouseSens) / coef;
			this.accel[1] = ((divPos.y - this.pivot[1]) / this.mouseSens) / coef;
		}
		// basic variable update
		for (var i = 0; i < 2; ++i) {
			this.pos[i] += this.speed[i];
			this.speed[i] += this.accel[i];
			if (Math.abs(this.speed[i]) > this.maxSpeed)
				this.speed[i] = Math.sign(this.speed[0]) * this.maxSpeed;
			if (dist > m.map.pathWidth / 2)
				this.speed[i] *= this.grassSlow;
			if (dist > m.map.grassWidth / 2)
				this.die();
		}
		//replay
		if (!this.finished)
			replay.data.push([this.pos[0], this.pos[1]]);
		
		//check for finish
		if (Math.distance(this.pos, m.map.pathPoints[m.map.pathPoints.length - 1]) < m.map.grassWidth / 2)
			this.win();
	}
	this.die = function() {
		this.pos[0] = m.map.start[0];
		this.pos[1] = m.map.start[1];
		this.speed = [0, 0];
		time = 0;
		replay.data = [];
		this.finished = false;
	}
	this.win = function() {
		this.finished = true;
		if (time < m.map.bestTime.length || m.map.bestTime.length === 0) {
			m.map.bestTime = JSON.parse(JSON.stringify(replay.data));
			replay.save(currMap + "best");
		}
		replay.data = [];
	}
	this.draw = function() {
		if (m.map.bestTime.length > 0) {
			ctx.beginPath();
			var r = m.map.bestTime[Math.min(time, m.map.bestTime.length - 2)];
			ctx.arc(r[0], r[1], this.fat, 0, Math.PI * 2);
			ctx.fillStyle = "#cccccc";
			ctx.fill();
		}
		ctx.fillRect(this.pivot[0] - 3, this.pivot[1] - 3, 6, 6);
		ctx.beginPath();
		ctx.arc(this.pos[0], this.pos[1], this.fat, 0, Math.PI * 2);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(this.pos[0], this.pos[1]);
		ctx.lineTo(this.pos[0] + this.accel[0] * this.mouseSens, this.pos[1] + this.accel[1] * this.mouseSens);
		ctx.strokeStyle = "red";
		ctx.lineWidth = 1;
		ctx.stroke();
		if (this.finished) {
			var rank;
			if (time < m.medals.author) {
				rank = 0;
			}
			else if (time < m.medals.gold) {
				rank = 1;
			}
			else if (time < m.medals.silver) {
				rank = 2;
			}
			else if (time < m.medals.bronze) {
				rank = 3;
			}
			drawMedal(canvas.width / 2, canvas.height / 2, 60, rank);
		}
	}
}