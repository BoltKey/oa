var orig = "http://localhost/optimize_accel/";
function entry(name) {
	console.log("Entrying '" + name + "'");
	$.ajax({
		url: orig + "php/entry.php?name=" + name,
		type: "GET",
		crossDomain: true,
		success: function(data) {
			console.log(data);
			userid = data;
			userName = name;
			loadUserBests();
			//userid = data;
		}
	});
}

function loadUserBests() {
	console.log("Loading scores for player " + userName);
	if (userid > -1) {
		$.ajax({
			method: "POST",
			url: orig + "php/getbests.php",
			data: {
				userid: userid,
			},
			crossDomain: true,
			success: function(data) {
				var a = JSON.parse(data);
				playerBests = a;
				updateMedals();
			},
		});
	}
	else {
		playerBests = [];
		for (var i = 0; i < maps.length; ++i) {
			var m = new Map(i);
			if (m.bestTime.length > 0) {
				playerBests[i] = [m.bestTime.length, 0, 0];
			}
		}
	}
}

function submitTime(data) {
	console.log("Submitting time");
	$.ajax({
		method: "POST",
		url: orig + "php/submittime.php",
		data: {
			userid: userid,
			data: data,
			time: time,
			map: currMap,
			own: false
		},
		crossDomain: true,
		success: function(data) {
			loadUserBests();
			//userid = data;
		}
	});
}


function loadGhosts(map) {
	console.log("Getting replays for map " + map);
	$.ajax({
		method: "POST",
		url: orig + "php/getscores.php",
		data: {
			map: map,
			replay: true,
			own: settings.plgho,
			bests: settings.gho,
			userid: userid,
			max: 8
		},
		crossDomain: true,
		success: function(data) {
			var a = JSON.parse(data);
			if (settings.plgho && userid === -1) {
				m = new Map(map);
				a.push(["You", -1, m.bestTime]);
			}
			for (var i in a) {
				var r = a[i];
				replay.ghosts.push(r[2]);
				replay.ghostNames.push(r[0]);
			}
		},
	});
}

function loadScores(map) {
	console.log("Loading scores for map " + map);
	$.ajax({
		method: "POST",
		url: orig + "php/getscores.php",
		data: {
			map: map,
			replay: false,
			own: true,
			bests: true,
			max: 1000000,
			userid: userid
		},
		crossDomain: true,
		success: function(data) {
			var a = JSON.parse(data);
			scores = a;
		},
	});
}

function countPlayers() {
	console.log("Loading number of players");
	$.ajax({
		method: "POST",
		url: orig + "php/playersnum.php",
		crossDomain: true,
		success: function(data) {
			totalPlayers = - - data;
		},
	});
}