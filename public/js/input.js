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
        socket.emit('update', 'pressForward');
    }
    w.release = function() {
        socket.emit('update', 'releaseForward');
    }
    a.press = function() {
        socket.emit('update', 'pressLeft');
    }
    a.release = function() {
        socket.emit('update', 'releaseLeft');
    }
    s.press = function() {
        socket.emit('update', 'pressBack');
    }
    s.release = function() {
        socket.emit('update', 'releaseBack');
    }
    d.press = function() {
        socket.emit('update', 'pressRight');
    }
    d.release = function() {
        socket.emit('update', 'releaseRight');
    }
    upArrow.press = function() {
        socket.emit('update', 'pressForward');
    }
    upArrow.release = function() {
        socket.emit('update', 'releaseForward');
    }
    leftArrow.press = function() {
        socket.emit('update', 'pressLeft');
    }
    leftArrow.release = function() {
        socket.emit('update', 'releaseLeft');
    }
    downArrow.press = function() {
        socket.emit('update', 'pressBack');
    }
    downArrow.release = function() {
        socket.emit('update', 'releaseBack');
    }
    rightArrow.press = function() {
        socket.emit('update', 'pressRight');
    }
    rightArrow.release = function() {
        socket.emit('update', 'releaseRight');
    }
    space.press = function() {
        socket.emit('update', 'boost');
    }
}