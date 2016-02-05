function Replay() {
	this.data = [];
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
}