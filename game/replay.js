function Replay() {
	this.data = [];
	this.save = function(slot) {
		localStorage.setItem("replay" + slot, this.data);
	}
	this.load = function(slot) {
		var r = localStorage.getItem("replay" + slot);
		if (r === null || r === "null") {
			return false;
		}
		else {
			this.data = r;
			return true;
		}
	}
}