var app;
var level;
var player;
var tileSize = 5;
var remotePlayers = [];

window.onload = function start() {
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

    function update() {
        if (player.initialized)
            player.update();
    }
    smoothie.start();
}