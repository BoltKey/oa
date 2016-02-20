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
	this.effect = 0;
	this.rank = -1;
	this.lastState = "road";
	this.pivot = [canvas.width / 2, canvas.height / 2];
	this.frame = function() {
		if (this.finished) {
			this.speed[0] *= 0.95;
			this.speed[1] *= 0.95;
			this.accel = [0, 0];
			++this.effect;
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
										sounds.jump.play();
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
				if (dist > m.map.pathWidth / 2) {
					this.speed[i] *= m.map.grassSlow;
					sounds.grass.play();
					grassEmitter.behaviours[1] = new Proton.Alpha(0.5, 0);
					grassEmitter.rate.nextTime = 0.06 / ((Math.distance([0, 0], this.speed) * (1 - m.map.grassSlow)) * 50);
					this.lastState = "grass";
				}
				else {
					sounds.grass.pause();
					sounds.grass.currentTime = 0;
					this.lastState = "road";
					grassEmitter.behaviours[1] = new Proton.Alpha(0, 0);
				}
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
		grassEmitter.p.x = this.pos[0];
		grassEmitter.p.y = this.pos[1];
		//replay
		if (!this.finished && this.started)
			replay.data.push([Math.floor(this.pos[0]), Math.floor(this.pos[1])]);
		
		//check for finish
		if (Math.distance(this.pos, m.map.pathPoints[m.map.pathPoints.length - 1]) < m.map.grassWidth / 2)
			this.win();
	}
	this.die = function() {
		replay.ghosts = [];
		replay.ghostNames = [];
		if (programState !== editor) {
			loadGhosts(currMap);
			loadScores(currMap);
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
		this.rank = 0;
	}
	this.win = function() {
		if (!this.finished) {
			this.finished = true;
			if (userid > -1 && currMap > -1)
				submitTime(JSON.stringify(replay.data));
			else if (userid === -1) {
				if (time < m.bestTime.length || m.bestTime.length === 0) {
					m.bestTime = JSON.parse(JSON.stringify(replay.data));
					replay.save(currMap + "best");
				}
				loadUserBests();
			}
			replay.data = [];
			this.effect = 0;
			if (typeof(scores) !== 'undefined') {
				if (scores.length === 0) {
					this.rank = 1;
				}
				else {
					for (var i = 0; i < scores.length; ++i) {
						var s = scores[i];
						if (- ( - s[2]) > time) {
							this.rank = i + 1;
							break;
						}
					}
					this.rank = i + 1;
				}
			}
			
		}
	}
	this.draw = function() {
		proton.update();
		ctx.globalAlpha = 1;
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
			// shitload of stats etc here
			var e = this.effect;
			var firstMedal = 100;
			var medalDelay = 40;
			var fadeIn = 15;
			ctx.textAlign = 'center';
			ctx.fillStyle = 'white';
			ctx.font = '20px Arial';
			ctx.globalAlpha = Math.max(0, Math.min(1, e / fadeIn));
			ctx.fillText("Your time was " + niceTime(time), canvas.width / 2, 100);
			ctx.globalAlpha = Math.max(0, Math.min(1, (e - 50) / fadeIn));
			var s;
			if (userid > -1) {
				s = "That's better than " + Math.floor((1 - (this.rank - 1) / (scores.length)) * 1000) / 10 + "% of players (your rank is " + this.rank + "/" + (scores.length + 1) + ")";
			}
			else {
				s = "Login to Kongregate to compare your times with other players."
			}
			ctx.fillText(s, canvas.width / 2, 130);
			ctx.globalAlpha = Math.max(0, Math.min(1, (e - 100) / fadeIn));
			ctx.fillText("Medals earned: ", canvas.width / 2, 180);
			
			if (e > firstMedal - medalDelay) {
				ctx.fillStyle = "#333333";
				ctx.fillRect(canvas.width / 2 - 120, canvas.height / 2 - 120, 240, 240);
			}
			var rank;
			if (time <= m.medals.author && e > firstMedal + medalDelay * 3) {
				rank = 0;
				if (e < firstMedal + medalDelay * 3 + 20) {
					sounds.platinum.play();
				}
			}
			else if (time <= m.medals.gold && e > firstMedal + medalDelay * 2) {
				rank = 1;
				if (e < firstMedal + medalDelay * 2 + 20)
					sounds.gold.play();
			}
			else if (time <= m.medals.silver && e > firstMedal + medalDelay) {
				rank = 2;
				if (e < firstMedal + medalDelay + 20)
					sounds.silver.play();
			}
			else if (time <= m.medals.bronze && e > firstMedal) {
				rank = 3;
				if (e < firstMedal + medalDelay + 20)
					sounds.bronze.play();
			}
			else {
				ctx.globalAlpha = 1;
				return;
			}
			
			drawMedal(canvas.width / 2, canvas.height / 2, 200, rank);
			ctx.globalAlpha = Math.max(0, Math.min(1, (e - 150) / fadeIn));
			ctx.fillStyle = 'white';
			ctx.fillText("Best times for this track", canvas.width - 210, 240);
			for (var i = 0; i < Math.min(10, scores.length); ++i) {
				var s = scores[i];
				ctx.fillText(s[0] + ": " + niceTime(s[2]), canvas.width - 210, 260 + i * 20);
			}
			ctx.globalAlpha = Math.max(0, Math.min(1, (e - 200) / fadeIn));
			ctx.fillText("Click to try again, press Esc to select another level", canvas.width / 2, canvas.height - 150);
		}
		ctx.globalAlpha = 1;
	}
}