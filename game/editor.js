function Editor() {
	this.selected = false;
	this.setup = function() {
		programState = editor;
		var a = $("<div>Path w<input id='pathw' class='editor' type='range' min='20' max='200' oninput='e.changePW(this.value)'></input></div>");
		a.css("position", "fixed");
		a.css("left", 40);
		a.css("top", 640);
		a.css("width", 200);
		$("body").append(a);
		var a = $("<div>Grass w<input id='grassw' class='editor' type='range' min='20' max='220' oninput='e.changeGW(this.value)'></input></div>");
		a.css("position", "fixed");
		a.css("left", 40);
		a.css("top", 660);
		a.css("width", 200);
		$("body").append(a);
		var a = $("<div>Grass slow<input id='grasss' class='editor' type='range' min='0.8' max='0.99' step='0.01' oninput='e.changeGS(this.value)'></input></div>");
		a.css("position", "fixed");
		a.css("left", 40);
		a.css("top", 680);
		a.css("width", 200);
		$("body").append(a);
		m = new Map();
		player.die();
	}
	this.click = function(pos) {
		for (var i = 0; i < m.map.pathPoints.length; ++i) {
			var p = m.map.pathPoints[i];
			if (Math.distance(pos, p) <= Math.max(m.map.pathWidth, m.map.grassWidth) / 2) {
				console.log("clicked on point " + i);
				this.selected = p;
				return;
			}
		}
		this.selected = false;
		m.map.pathPoints.push(pos);
	}
	this.drag = function() {
		this.selected[0] = divPos.x;
		this.selected[1] = divPos.y;
		player.die();
	}
	this.undo = function() {
		if (m.map.pathPoints.length > 1)
			m.map.pathPoints.splice(m.map.pathPoints.length - 1, 1);
	}
	this.del = function() {
		var index = m.map.pathPoints.indexOf(this.selected);
		this.selected = false;
		m.map.pathPoints.splice(index, 1);
	}
	this.changeGW = function(val) {
		m.map.grassWidth = val;
	}
	this.changePW = function(val) {
		m.map.pathWidth = val;
	}
	this.changeGS = function(val) {
		m.map.grassSlow = val;
	}
	this.play = function() {
		programState = "editPlay";
		player.die();
		makeMenu();
	}
	this.back = function() {
		programState = "editor";
		player.die();
		makeMenu();
	}
	this.setup();
}