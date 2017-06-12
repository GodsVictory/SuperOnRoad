var app;
var level;
var player;
var tileSize = 5;
var remotePlayers = [];

window.onload = function start() {
    socket = io.connect('localhost:3000', {
        'sync disconnect on unload': true
    });
    setEventHandlers();
    app = new PIXI.Application(800, 600, {
        backgroundColor: 0xc2b280,
        antialias: true
    });
    document.body.appendChild(app.view);

    var smoothie = new Smoothie({
        engine: PIXI,
        renderer: app.renderer,
        root: app.stage,
        fps: 30,
        update: update.bind(this)
    });

    level = new level2();
    //player = new player();
    setupInput();

    function update() {
        if (player.initialized)
            player.update();
    }
    smoothie.start();
}