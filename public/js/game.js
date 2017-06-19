var app;
var socket;
var mobile;
var players = {};
var queueMove = {};
var lerpMag = .05;

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

	const ticker = new PIXI.ticker.Ticker();
	ticker.stop();
	ticker.add((deltaTime) => {
		for (var i in queueMove) {
			players[i].setPos(
				lerp(players[i].getX(), queueMove[i].x, lerpMag),
				lerp(players[i].getY(), queueMove[i].y, lerpMag)
			);
			players[i].setRotation(
				lerp(players[i].getRotation(), queueMove[i].rotation, lerpMag)
			);
		}
	});
	ticker.start();

	if (isMobile.any)
		setupMobile();
}

function lerp(v0, v1, t) {
	return v0 * (1 - t) + v1 * t
}