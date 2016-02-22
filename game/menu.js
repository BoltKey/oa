var menuButtons = [
{display: "Help/About", pos: [50, 550], w: 100, click: "toAbout()", menu:[1]},
{display: "Display best ghosts", pos: [180, 550], w: 150, click: 'changeSetting("gho")', menu:[1], id: 'sgho'},
{display: "Display your ghost", pos: [180, 500], w: 150, click: 'changeSetting("plgho")', menu:[1], id: 'splgho'},
{display: "Mute sounds", pos: [340, 500], w: 150, click: 'changeSetting("mute")', menu:[1], id: 'smute'},
{display: "Music", pos: [500, 500], w: 150, click: 'changeSetting("music")', menu:[1], id: 'smusic'},
{display: "Particle effects", pos: [340, 550], w: 150, click: 'changeSetting("parts")', menu:[1], id: 'sparts'},
];
var levelParams = {x: 50, y: 40, padding: [180, 4], rows: 10, w: 35};

function makeMenu() {
	$('button').remove();
	
	var a;
	switch(programState) {
		
		case menu:
			$('.ed').remove();
			for (i in menuButtons) {
				var b = menuButtons[i];
				if (b.menu.indexOf(menuid) > -1) {
					a = $("<button type='button' class='button button-primary button-box' onclick='" + b.click + "'>" + b.display + "</button>");
					if (typeof(b.id) !== 'undefined')
						a.attr('id', b.id);
					a.css("position", "fixed");
					a.css("left", b.pos[0]);
					a.css("top", b.pos[1]);
					a.css("width", b.w);
					$("body").append(a);
				}
				updateMedals();
			}
			
			if (menuid === 1) {
				for (var i = 0; i < maps.length; ++i) {
					a = $("<button type='button' class='button button-primary button-box' onclick='newLevel(" + i + ")'>" + i + "</button>");
					a.css("position", "fixed");
					a.css("left", levelParams.x + (levelParams.padding[0] + levelParams.w) * (Math.floor(i / levelParams.rows)));
					a.css("top", levelParams.y + (levelParams.padding[1] + 40) * (i % levelParams.rows));
					a.css("width", levelParams.w);
					$("body").append(a);
				}
			}
			settingsColors();
			break;
		case play:
			break;
		case editor:
			a = $("<button type='button' class='button-primary button-box' onclick='e.play()'>Play</button>");
			a.css("position", "fixed");
			a.css("left", 250);
			a.css("top", 680);
			a.css("width", 60);
			$("body").append(a);
			break;
		case editPlay:
			a = $("<button type='button' class='button-primary button-box' onclick='e.back()'>Edit</button>");
			a.css("position", "fixed");
			a.css("left", 250);
			a.css("top", 680);
			a.css("width", 60);
			$("body").append(a);
			break;
	}
}