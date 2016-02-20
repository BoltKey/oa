var maps = [
	// 0
	{"pathPoints":[[289,109],[175,198],[133,346],[256,466],[407,468],[518,358],[649,313],[762,360],[792,508]],"pathWidth":"132","grassWidth":"202","grassSlow":"0.97","authorTime":651,"specials":[]},
	// 1
	{pathPoints: [[50, 50], [200, 60], [50, 300], [280, 320], [400, 130], [520, 190], [560, 360], [420, 420]],  "specials":[],pathWidth: 80, grassWidth: 100, grassSlow: 0.94, authorTime: 880},
	{"pathPoints":[[113,110],[858,248],[846,434],[106,475]],"pathWidth":"170","grassWidth":"220","grassSlow":"0.97","authorTime":714,"specials":[]},
	// 2
	{"pathPoints":[[760,294],[599,214],[487,183],[333,161],[228,168],[181,262],[270,331],[351,355],[462,360],[579,405],[648,479],[606,512],[520,520],[327,539],[81,466]],"pathWidth":80,"grassWidth":"192","grassSlow":0.94,"authorTime":1137,"specials":[]},
	// 3
	{"pathPoints":[[597,135],[479,165],[532,207],[368,248],[387,161],[218,221],[276,311],[180,330],[280,444],[332,375],[419,494],[340,511],[410,592]],"pathWidth":"42","grassWidth":"80","grassSlow":"0.91","authorTime":1079,"specials":[]},
	// 4
	{"pathPoints":[[883,316],[786,480],[612,537],[377,535],[241,480],[181,381],[383,391],[554,393],[657,365],[674,293],[475,279],[492,175],[747,194],[754,89],[403,58],[363,274],[186,266],[274,79],[143,96],[84,160],[58,235],[61,563]],"pathWidth":80,"grassWidth":100,"grassSlow":0.94,"authorTime":2702,"specials":[]},
	{"pathPoints":[[109,120],[375,122],[633,157],[768,245],[842,418],[762,553],[605,551],[347,540],[178,497],[111,373],[213,331],[382,342],[616,361]],"pathWidth":"134","grassWidth":"160","grassSlow":0.94,"authorTime":1337,"specials":[]},
	// 5
	{"pathPoints":[[130,120],[188,245],[292,342],[479,418],[650,494],[802,533]],"pathWidth":"138","grassWidth":"165","grassSlow":"0.87","authorTime":394,"specials":[{"pos":4,"type":"jump","pow":10}]},
	// 6
	{"pathPoints":[[690,50],[656,66],[668,107],[708,148],[774,208],[806,275],[801,353],[765,443],[695,516],[590,562],[482,570],[355,548],[241,494],[135,404],[64,305],[28,197]],"pathWidth":"36","grassWidth":100,"grassSlow":"0.8","authorTime":846,"specials":[]},
	// 7
	{"pathPoints":[[85,81],[297,120],[102,296],[331,412],[304,122],[511,180],[342,417],[683,520],[509,177],[880,257],[676,508],[901,564]],"pathWidth":"65","grassWidth":"128","grassSlow":"0.98","authorTime":505,"specials":[]},
	
	// 8
	{"pathPoints":[[406,153],[319,122],[206,124],[143,204],[153,289],[223,357],[333,356],[425,407],[449,465],[442,527],[363,578],[270,579],[186,535],[137,463]],"specials":[{type:"jump",pos:5,pow:10},{type:"turbo",pos:2,pow:0.007,dir:-Math.PI/3}],"pathWidth":"65","grassWidth":"84","grassSlow":0.94,"authorTime":1002},
	// 9
	{"pathPoints":[[50,50],[107,193],[193,265],[293,278],[436,268],[526,274],[613,310],[687,367],[810,480],[867,531]],"pathWidth":80,"grassWidth":100,"grassSlow":0.94,"authorTime":539,"specials":[{"pos":8,"type":"jump","pow":10}]},
	{"pathPoints":[[106,262],[322,198],[443,251],[504,254],[541,329],[600,370],[580,420],[545,465],[487,482],[391,483],[332,430],[319,349],[339,286],[399,150],[414,102],[453,58],[516,56],[570,79],[630,122],[656,177],[654,237],[669,297],[732,325],[769,312],[782,279],[756,224],[748,172],[808,157],[871,184],[883,293],[849,371],[800,411],[666,409],[500,394],[403,369]],"pathWidth":"47","grassWidth":"67","grassSlow":0.94,"authorTime":2293,"specials":[{"pos":13,"type":"jump","pow":20},{"pos":33,"type":"jump","pow":20}]},
	{"pathPoints":[[195,451],[383,376],[305,540],[613,414],[455,351],[719,224]],"pathWidth":"30","grassWidth":"20","grassSlow":0.94,"authorTime":1321,"specials":[]},
	{"pathPoints":[[402,287],[331,259],[264,246],[188,262],[136,300],[104,363],[92,429],[117,493],[161,525],[233,536],[299,515],[406,507],[517,519],[623,539],[709,532],[785,502],[819,430],[834,345],[815,275],[762,198],[701,133],[605,86],[433,64],[358,92],[364,141],[412,176],[469,207],[545,286],[517,350],[477,378],[381,403],[251,393]],"pathWidth":80,"grassWidth":"48","grassSlow":0.94,"authorTime":1854,"specials":[]},
	{"pathPoints":[[76,189],[166,134],[258,118],[339,125],[423,161],[519,230],[842,505],[842,504]],"pathWidth":80,"grassWidth":100,"grassSlow":0.94,"authorTime":499,"specials":[{"pos":6,"type":"jump","pow":30}]},
	// 10
	{"pathPoints":[[624,63],[610,195],[556,334],[477,431],[319,488],[200,480],[60,346],[129,94],[276,133],[392,206],[464,279],[623,422],[781,516],[867,542]],"pathWidth":80,"grassWidth":100,"grassSlow":0.94,"authorTime":1188,"specials":[{"pos":11,"type":"jump","pow":20},{"type":"turbo","pos":8,"dir":0.2,"pow":0.01}]},
	
	{"pathPoints":[[888,572],[766,515],[655,472],[512,466],[352,488],[226,505],[110,469],[94,349],[154,279],[236,275],[342,330],[441,356],[671,366],[784,332],[868,271],[858,182],[815,88],[712,60],[575,77],[523,122],[500,178],[486,255],[440,594],[439,590],[442,590]],"pathWidth":80,"grassWidth":100,"grassSlow":0.94,"authorTime":1959,"specials":[{"pos":22,"type":"jump","pow":30}]},
	// 11
	{"pathPoints":[[139,191],[222,277],[329,339],[433,413],[542,386],[624,335],[693,228],[646,140],[568,72],[479,55],[415,90],[296,276],[253,341],[142,520],[79,605]],"pathWidth":80,"grassWidth":100,"grassSlow":0.94,"authorTime":990,"specials":[{"pos":13,"type":"jump","pow":10},{"type":"turbo","pos":11,"dir":Math.PI * 0.68,"pow":0.02}]},
	// 12
	{"pathPoints":[[196,342],[240,279],[292,260],[354,256],[411,274],[451,347],[537,437],[595,473],[705,493],[818,471],[874,385],[903,242],[831,159],[731,102],[640,120],[538,227],[386,445],[287,486],[232,497],[156,480],[93,415],[64,300],[60,134],[148,53],[310,47],[362,147],[464,522],[491,568],[565,583]],"pathWidth":"74","grassWidth":"106","grassSlow":"0.88","authorTime":2476,"specials":[{"pos":6,"type":"jump","pow":10},{"pos":16,"type":"jump","pow":10},{"pos":26,"type":"jump","pow":10}]},
	
]

function Map(id) {
	if (typeof(id) === 'undefined') {
		this.map = {pathPoints: [[50, 50]], pathWidth: 80, grassWidth: 100, grassSlow: 0.94, authorTime: 0, specials: []}
	}
	else 
		this.map = maps[id];
	this.calcVars = function() {
		this.start = this.map.pathPoints[0];
		this.pathSpecials = this.map.specials.map(function(a){return a.pos});
		replay.load(id + "best");
		this.bestTime = JSON.parse(JSON.stringify(replay.data));
		replay.data = [];
		sounds.grass.volume = (1 - this.map.grassSlow) * 5;
		var t = this.map.authorTime;
		this.medals = {
			author: t, 
			gold: Math.floor((t * 1.1) / 50) * 50, 
			silver: Math.floor((t * 1.4) / 50) * 50, 
			bronze: Math.floor((t * 2) / 50) * 50
		};
	}
	this.draw = function() {
		// basic path
		ctx.beginPath();
		var point;
		for (var i = 0; i < this.map.pathPoints.length; ++i) {
			
			point = this.map.pathPoints[i];
			if (m.pathSpecials.indexOf(i) > -1) {
				ctx.moveTo(point[0], point[1]);
			}
			else
				ctx.lineTo(point[0], point[1]);
		}
		
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.lineWidth = this.map.grassWidth;
		var green = 60 + Math.floor(120 * (this.map.grassSlow - 0.8) * 5);
		var others = Math.floor(180 * (this.map.grassSlow - 0.8) * 5);
		ctx.strokeStyle = "rgb(" + others + "," + green + "," + others + ")";
		ctx.stroke();
		ctx.lineWidth = this.map.pathWidth;
		ctx.strokeStyle = "#bbbbbb";
		ctx.stroke();
		
		// specials
		for (var i = 0; i < m.map.specials.length; ++i) {
			var s = m.map.specials[i];
			switch(s.type) {
				case "jump":
					var a = this.map.pathPoints[s.pos - 2];
					var b =	this.map.pathPoints[s.pos - 1];
					var coef = (this.map.pathWidth / 2) / Math.distance(a, b) ;
					var x2 = (b[1] - a[1]) * coef;
					var y2 = (b[0] - a[0]) * coef;
					ctx.beginPath();
					ctx.moveTo(b[0] - x2, b[1] + y2);
					ctx.lineTo(b[0] + x2, b[1] - y2);
					ctx.lineWidth = s.pow / 5;
					ctx.strokeStyle = getColorScale(s.pow / 30);
					ctx.stroke();
					break;
				case "turbo":
					var a = this.map.pathPoints[s.pos - 1];
					var b = this.map.pathPoints[s.pos];
					ctx.beginPath();
					ctx.moveTo(a[0], a[1]);
					ctx.lineTo(b[0], b[1]);
					ctx.lineWidth = Math.max(this.map.pathWidth, this.map.grassWidth);
					
					ctx.strokeStyle = "yellow";
					ctx.lineCap = "butt";
					ctx.stroke();
					// draw arrow
					var x = Math.sqrt(100 / (1 + (Math.pow(Math.tan(s.dir), 2)))) * Math.sign((s.dir + Math.PI * 1.5) % (Math.PI * 2) - Math.PI);
					var y = Math.sqrt(100 / (1 + (1 / (Math.pow(Math.tan(s.dir), 2))))) * Math.sign((s.dir + Math.PI) % (Math.PI * 2) - Math.PI);
					
					var start = [a[0] + (b[0] - a[0]) / 2, a[1] + (b[1] - a[1]) / 2];
					ctx.beginPath();
					ctx.arc(start[0], start[1], 2, 0, Math.PI * 2);
					ctx.moveTo(start[0], start[1]);
					ctx.lineTo(start[0] + x * s.pow * 250, start[1] + y * s.pow * 250);
					ctx.strokeStyle = "red";
					ctx.lineWidth = 2;
					
					ctx.stroke();
			}
		}
		ctx.beginPath();
		ctx.arc(point[0], point[1], this.map.grassWidth / 2, 0, Math.PI * 2);
		ctx.fillStyle = "#00ff00";
		ctx.fill();
		ctx.fillStyle = "white";
		ctx.fillRect(canvas.width, 0, -80, 150);
		var rank = 0;
		ctx.textAlign = 'center';
		for (var i in m.medals) {
			drawMedal(canvas.width - 60, 35 + rank * 30, 30, rank);
			ctx.font = "15px Arial";
			ctx.fillStyle = "black";
			ctx.fillText(niceTime(m.medals[i]), canvas.width - 25, 40 + rank * 30);
			++rank;
		}
		ctx.fillStyle = "white";
		ctx.fillText(niceTime(time), canvas.width - 45, 180);
		/*ctx.lineWidth = 1;
		ctx.strokeStyle = "#000000";
		ctx.stroke();*/	
	}
	this.calcVars();
}