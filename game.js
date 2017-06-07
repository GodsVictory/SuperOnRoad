window.onload = function start() {
    var app = new PIXI.Application(800, 600, {
        backgroundColor: 0x1099bb,
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

    var player = new truck(app);

    var forward = keyboard(87);
    var left = keyboard(65);
    var back = keyboard(83);
    var right = keyboard(68);
    var boost = keyboard(32);

    forward.press = function () {
        player.forward();
    }
    forward.release = function () {
        player.stopVel();
        if (back.isDown)
            player.back();
    }
    left.press = function () {
        player.left();
    }
    left.release = function () {
        player.stopTurn();
        if (right.isDown)
            player.right();
    }
    back.press = function () {
        player.back();
    }
    back.release = function () {
        player.stopVel();
        if (forward.isDown)
            player.forward();
    }
    right.press = function () {
        player.right();
    }
    right.release = function () {
        player.stopTurn();
        if (left.isDown)
            player.left();
    }
    boost.press = function () {
        player.boost();
    }

    function update() {
        player.update();
    }
    smoothie.start();
}
