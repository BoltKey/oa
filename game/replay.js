function Replay() {
	this.data = [];
	this.ghosts = [];
	this.ghostNames = [];
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
		
		ctx.font = "8px Arial";
		ctx.textAlign = "center";
		for (i in this.ghosts) {
			var g = this.ghosts[i];
			if (g.length > 0) {
				ctx.beginPath();
				var r = g[Math.min(time, g.length - 1)];
				
				ctx.arc(r[0], r[1], player.fat, 0, Math.PI * 2);
				var s;
				if (this.ghostNames[i] === userName || (userid === -1 && this.ghostNames[i] === "You")) {
					ctx.fillStyle = "#00ff00";
					ctx.globalAlpha = 0.4;
					s = "You";
				}
				else {
					ctx.fillStyle = "#000000";
					ctx.globalAlpha = 0.1;
					s = this.ghostNames[i];
				}
				
				ctx.fill();
				ctx.globalAlpha = Math.min(0.5, Math.max(0, (time - 100) / 300));
				ctx.fillText(s, r[0], r[1] - 5)
			}
		}
		ctx.globalAlpha = 1;
		ctx.textAlign = "left";
	}
}