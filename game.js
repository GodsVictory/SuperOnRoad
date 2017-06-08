window.onload = function start() {
    var app = new PIXI.Application(800, 600, {
        backgroundColor: 0xc2b280,
        antialias: true
    });
    document.body.appendChild(app.view);

    var smoothie = new Smoothie({
        engine: PIXI,
        renderer: app.renderer,
        root: app.stage,
        fps: 60,
        update: update.bind(this)
    });

    var level = new level1(app);
    var player = new truck(app, level.startX, level.startY);
    setupInput(player, level);

    function update() {
        player.update(level);
    }
    smoothie.start();
}
