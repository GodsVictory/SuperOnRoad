function setupInput() {
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
}
