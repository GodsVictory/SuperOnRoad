var app;
var socket;
var id;
var mobile;
var level;
var player;
var tileSize = 5;
var players = {};

window.onload = function start() {
    openSocket();

    PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

    if (isMobile.any)
        setupMobile();

    app = new PIXI.Application(800, 600, {
        antialias: true
    });
    document.body.appendChild(app.view);
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.top = 0;
    app.renderer.view.style.left = 0;

    setupInput();
}