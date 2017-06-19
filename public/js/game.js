var app;
var socket;
var id;
var player;
var mobile;
var players = {};
var queueMove = {};
var lerpMag = .1;
var tileSize = 5;

window.onload = function start() {
	PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
	app = new PIXI.Application(800, 600, {
		antialias: true
	});
	document.body.appendChild(app.view);
	app.renderer.view.style.position = 'absolute';
	app.renderer.view.style.top = 0;
	app.renderer.view.style.left = 0;

	openSocket();

	setupInput();

	var fps = 144,
		startTime = 0,
		lastFrame = 0,
		frameDuration = 1000 / fps;

	update();

	function update() {
		requestAnimationFrame(update);
		if (Date.now() >= startTime || startTime === 0) {
			var delta = (Date.now() - lastFrame) / 1000;
			lastFrame = Date.now();

			if (player)
				player.update(delta);

			for (var i in queueMove) {
				players[i].setPos(
					lerp(players[i].getX(), queueMove[i].x, lerpMag),
					lerp(players[i].getY(), queueMove[i].y, lerpMag)
				);
				players[i].setRotation(
					lerp(players[i].getRotation(), queueMove[i].rotation, lerpMag)
				);
			}
			startTime = Date.now() + frameDuration;
		}
	}

	if (isMobile.any)
		setupMobile();
}

function lerp(v0, v1, t) {
	return v0 * (1 - t) + v1 * t
}