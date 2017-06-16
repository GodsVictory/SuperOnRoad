var app;
var socket;
var mobile;
var players = {};

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

	if (isMobile.any)
		setupMobile();
}