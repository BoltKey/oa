function entry(name) {
	console.log("Entrying '" + name + "'");
	$.ajax({
		url: "php/entry.php?name=" + name,
		type: "GET",
		crossDomain: true,
		success: function(data) {
			console.log(data);
			userid = data;
			//userid = data;
		}
	});
}

function submitTime(data) {
	console.log("Submitting time");
	$.ajax({
		method: "POST",
		url: "php/submittime.php",
		data: {
			userid: userid,
			data: data,
			time: time,
			map: currMap,
		},
		crossDomain: true,
		success: function(data) {
			console.log(data);
			//userid = data;
		}
	});
}

function getGhosts(players, map) {
	console.log("Getting ghosts");
	$.ajax({
		method: "POST",
		url: "php/getghost.php",
		data: {
			players: JSON.stringify(players),
			map: map,
		},
		crossDomain: true,
		success: function(data) {
			console.log(data);
			var replays = JSON.parse(data);
			replay.ghosts = replay.ghosts.concat(replays);
			//userid = data;
		}
	});
}