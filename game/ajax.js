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
		data: {userid: userid,
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

function test() {
	console.log("testing");
	$.ajax({
		method: "POST",
		url: "php/test.php",
		success: function(data) {
			console.log(data);
		}
	});
}