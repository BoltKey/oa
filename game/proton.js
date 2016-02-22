var proton;
var grassEmitter;
var roadEmitter;
function initProton() {
	proton = new Proton();
	proton.addEmitter(grassE());
	proton.addEmitter(roadE());

	renderer = new Proton.Renderer('canvas', proton, canvas);
	renderer.onProtonUpdate = function() {};
	renderer.start();

	function grassE() {
		emitter = new Proton.Emitter();
		emitter.rate = new Proton.Rate(0.1, 0.08);
		emitter.addInitialize(new Proton.ImageTarget('graphics/grass.png', 1, 10));
		emitter.addInitialize(new Proton.Mass(1));
		emitter.addInitialize(new Proton.Life(1.5, 2.2));
		emitter.addInitialize(new Proton.Velocity(0.1, Proton.getSpan(0, 360), 'polar'));
		emitter.addBehaviour(new Proton.Rotate());
		emitter.addBehaviour(new Proton.Alpha(0, 0));
		//emitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, canvas.width, canvas.height), 'bound'));
		emitter.p.x = canvas.width / 2;
		emitter.p.y = canvas.height / 2;
		emitter.emit();
		grassEmitter = emitter;
		return emitter;
	}
	function roadE() {
		emitter = new Proton.Emitter();
		emitter.rate = new Proton.Rate(0.1, 0.08);
		emitter.addInitialize(new Proton.Mass(1));
		emitter.addInitialize(new Proton.Radius(0.5, 1));
		emitter.addInitialize(new Proton.Life(1.5, 2.2));
		emitter.addInitialize(new Proton.Velocity(0.1, Proton.getSpan(0, 360), 'polar'));
		emitter.addBehaviour(new Proton.Color("000000", "000000", Infinity, Proton.easeOutQuart));
		emitter.addBehaviour(new Proton.Alpha(0, 0));
		emitter.addBehaviour(new Proton.Scale(1, 0.7));
		emitter.p.x = canvas.width / 2;
		emitter.p.y = canvas.height / 2;
		emitter.emit();
		roadEmitter = emitter;
		return emitter;
	}
}