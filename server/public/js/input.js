function setupInput() {
    var w = keyboard(87);
    var a = keyboard(65);
    var s = keyboard(83);
    var d = keyboard(68);
    var space = keyboard(32);
    var upArrow = keyboard(38);
    var leftArrow = keyboard(37);
    var downArrow = keyboard(40);
    var rightArrow = keyboard(39);
    w.press = function() {
        pressForward();
    }
    w.release = function() {
        releaseForward();
    }
    a.press = function() {
        pressLeft();
    }
    a.release = function() {
        releaseLeft();
    }
    s.press = function() {
        pressBack();
    }
    s.release = function() {
        releaseBack();
    }
    d.press = function() {
        pressRight();
    }
    d.release = function() {
        releaseRight();
    }
    upArrow.press = function() {
        pressForward();
    }
    upArrow.release = function() {
        releaseForward();
    }
    leftArrow.press = function() {
        pressLeft();
    }
    leftArrow.release = function() {
        releaseLeft();
    }
    downArrow.press = function() {
        back();
    }
    downArrow.release = function() {
        releaseBack();
    }
    rightArrow.press = function() {
        pressRight();
    }
    rightArrow.release = function() {
        releaseRight();
    }
    space.press = function() {
        player.boost();
    }

    function pressForward() {
        player.pressForward();
    }

    function pressLeft() {
        player.pressLeft();
    }

    function pressBack() {
        player.pressBack();
    }

    function pressRight() {
        player.pressRight();
    }

    function releaseForward() {
        player.releaseForward();
    }

    function releaseLeft() {
        player.releaseLeft();
    }

    function releaseBack() {
        player.releaseBack();
    }

    function releaseRight() {
        player.releaseRight();
    }
}