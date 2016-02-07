function Player() {
	this.pos = [50, 50];
	this.speed = [0, 0];
	this.accel = [0, 0];
	this.fat = 3;
	this.maxAccel = 0.01;
	this.mouseSens = 10000;
	this.maxSpeed = 5;
	this.started = false;
	this.finished = false;
	this.airTime = 0;
	this.jumpLen = 0;
	this.pivot = [canvas.width / 2, canvas.height / 2];
	this.frame = function() {
		if (this.finished) {
			this.speed[0] *= 0.95;
			this.speed[1] *= 0.95;
			this.accel = [0, 0];
		}
		else if (this.started) {
			
			++time;
			this.pivot = this.pos;
			
			// calculate distance to nearest path
			var accelMod = [0, 0];
			var dist = 100000;
			for (var i = 0; i < m.map.pathPoints.length - 1; ++i) {
				var spec = $.grep(m.map.specials, function(a) {return a.pos === i + 2})[0];
				var spec2 = $.grep(m.map.specials, function(a) {return a.pos === i + 1})[0];
				// check if next tile is jump endy
				var ground = typeof($.grep(m.map.specials, function(a) {return a.pos === i + 1 && a.type === 'jump'})[0]) === 'undefined';
				var a = m.map.pathPoints[i];
				
				var b = m.map.pathPoints[i + 1];
				var x = a[0] - b[0];
				var y = a[1] - b[1];
				var c = Math.pow(x, 2) + Math.pow(y, 2);
				var p = ((- a[0] + this.pos[0]) * x + (- a[1] + this.pos[1]) * y) / c;
				if (p < 0) {
					if (p > -1) {
						if (ground) {
							var currDist = Math.distance(this.pos, [a[0] + p * x, a[1] + p * y]);
							dist = Math.min(dist, currDist);
							if (currDist < Math.max(m.map.pathWidth, m.map.grassWidth)) {
								if (typeof(spec2) !== 'undefined') {
									if (spec2.type === 'turbo') {
										// trust me, I'm a magician. Also, fuck you future me.
										var x = Math.sqrt(Math.pow(spec2.pow, 2) / (1 + (Math.pow(Math.tan(spec2.dir), 2)))) * Math.sign((spec2.dir + Math.PI * 1.5) % (Math.PI * 2) - Math.PI);
										var y = Math.sqrt(Math.pow(spec2.pow, 2) / (1 + (1 / (Math.pow(Math.tan(spec2.dir), 2))))) * Math.sign((spec2.dir + Math.PI) % (Math.PI * 2) - Math.PI);;
										accelMod = [x, y];
									}
								}
							}
						}
					}
					else {
						if (ground)
							dist = Math.min(dist, Math.distance(this.pos, b));
						if (Math.distance(this.pos, b) < m.map.pathWidth / 2) {
							if (typeof(spec) !== 'undefined') {
								if (spec.type === 'jump') {
									if (this.airTime === 0 && 
									Math.distance(this.pos, b) < m.map.pathWidth) {
										this.jumpLen = spec.pow * 10;
										this.airTime = 1;
									}
								}
							}
						}
					}
				
				}
				else {
					if (ground)
						dist = Math.min(dist, Math.distance(this.pos, a));
				}
				
			}
			//console.log("p: " + p);
			//console.log("dist: "+  dist);
			
			// update of accel based on mousepos
			var mouse = [divPos.x, divPos.y];
			var coef = Math.max(1, (Math.distance(mouse, this.pivot)) / (this.maxAccel * this.mouseSens));
			if (this.airTime === 0) {
				this.accel[0] = ((divPos.x - this.pivot[0]) / this.mouseSens) / coef + accelMod[0];
				this.accel[1] = ((divPos.y - this.pivot[1]) / this.mouseSens) / coef + accelMod[1];
			}
			else {
				this.accel = [0, 0];
			}
		}
		// basic variable update
		for (var i = 0; i < 2; ++i) {
			this.pos[i] += this.speed[i];
			this.speed[i] += this.accel[i];
			if (Math.abs(this.speed[i]) > this.maxSpeed)
				this.speed[i] = Math.sign(this.speed[0]) * this.maxSpeed;
			if (this.airTime === 0) {
				if (dist > m.map.pathWidth / 2)
					this.speed[i] *= m.map.grassSlow;
				if (dist > Math.max(m.map.grassWidth, m.map.pathWidth) / 2)
					this.die();
			}
			if (this.jumpLen > 0) {
				++this.airTime;
				if (this.airTime >= this.jumpLen) {
					this.airTime = 0;
					this.jumpLen = 0;
				}
			}
		}
		//replay
		if (!this.finished && this.started)
			replay.data.push([Math.floor(this.pos[0]), Math.floor(this.pos[1])]);
		
		//check for finish
		if (Math.distance(this.pos, m.map.pathPoints[m.map.pathPoints.length - 1]) < m.map.grassWidth / 2)
			this.win();
	}
	this.die = function() {
		replay.ghosts = [];
		if (m.bestTime.length > 0) {
			replay.ghosts.push(m.bestTime);
		}
		this.pos[0] = m.start[0];
		this.pos[1] = m.start[1];
		this.speed = [0, 0];
		this.accel = [0, 0];
		this.airTime = 0;
		this.jumpLen = 0;
		time = 0;
		replay.data = [];
		this.finished = false;
		this.started = false;
	}
	this.win = function() {
		if (!this.finished) {
			this.finished = true;
			if (time < m.bestTime.length || m.bestTime.length === 0) {
				m.bestTime = JSON.parse(JSON.stringify(replay.data));
				replay.save(currMap + "best");
			}
			submitTime(JSON.stringify(replay.data));
			replay.data = [];
		}
	}
	this.draw = function() {
		/*if (m.bestTime.length > 0) {
			ctx.beginPath();
			var r = m.bestTime[Math.min(time, m.bestTime.length - 2)];
			var add = 0;
			
			ctx.arc(r[0], r[1], this.fat + add, 0, Math.PI * 2);
			ctx.fillStyle = "#cccccc";
			ctx.fill();
		}*/
		replay.drawGhosts();
		
		var add = 0;
		if (this.jumpLen > 0) {
			add = - Math.pow(this.airTime - this.jumpLen / 2, 2) + Math.pow(this.jumpLen / 2, 2);
			add /= 1500;
			ctx.beginPath();
			var rem = (this.jumpLen - this.airTime) / 2;
			ctx.arc(this.pos[0] + this.speed[0] * rem, this.pos[1] + this.speed[1] * rem, this.fat, 0, Math.PI * 2);
			ctx.fillStyle = "#000000";
			ctx.globalAlpha = this.airTime / this.jumpLen;
			ctx.fill();
			ctx.globalAlpha = 1;
		}
		ctx.beginPath();
		ctx.arc(this.pos[0], this.pos[1], this.fat + add, 0, Math.PI * 2);
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
			if (time <= m.medals.author) {
				rank = 0;
			}
			else if (time <= m.medals.gold) {
				rank = 1;
			}
			else if (time <= m.medals.silver) {
				rank = 2;
			}
			else if (time <= m.medals.bronze) {
				rank = 3;
			}
			else {
				return;
			}
			drawMedal(canvas.width / 2, canvas.height / 2, 200, rank);
		}
	}
}