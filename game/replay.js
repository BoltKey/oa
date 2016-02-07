function Replay() {
	this.data = [];
	this.ghosts = [];
	this.save = function(slot) {
		localStorage.setItem("replay" + slot, JSON.stringify(this.data));
	}
	this.load = function(slot) {
		var r = localStorage.getItem("replay" + slot);
		if (r === null || r === "null") {
			this.data = [];
			return false;
		}
		else {
			this.data = JSON.parse(r);
			return true;
		}
	}
	this.addGhost = function(data) {
		this.ghosts.push(data);
	}
	this.drawGhosts = function() {
		for (i in this.ghosts) {
			var g = this.ghosts[i];
			ctx.beginPath();
			var r = g[Math.min(time, g.length - 1)];
			
			ctx.arc(r[0], r[1], player.fat, 0, Math.PI * 2);
			ctx.fillStyle = "#cccccc";
			ctx.fill();
		}
	}
}