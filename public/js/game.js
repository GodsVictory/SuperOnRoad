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
    mobile = new PIXI.Application(app.view.width, 600, {
        backgroundColor: 0xFFFFFF,
        antialias: true
    });
    document.body.appendChild(mobile.view);

    if (isMobile.any)
        setupMobile();

    level = new Level2();

    function update(delta) {
        if (player)
            player.update(delta);
    }

    app.ticker.add(function(delta) {
        if (player)
            player.update(delta);
    });
}