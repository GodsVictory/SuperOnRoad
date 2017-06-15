var app;
var socket;
var mobile;
var level;
var player;
var tileSize = 5;
var remotePlayers = {};

window.onload = function start() {
    openSocket();

    app = new PIXI.Application(800, 600, {
        backgroundColor: 0xc2b280,
        antialias: true
    });
    document.body.appendChild(app.view);

    if (isMobile.any)
        setupMobile();

    level = new Level2();

    var smoothie = new Smoothie({
        engine: PIXI,
        renderer: app.renderer,
        root: app.stage,
        fps: 30,
        update: update.bind(this)
    });

    function update() {
        if (player)
            player.update();
    }
    smoothie.start();
}