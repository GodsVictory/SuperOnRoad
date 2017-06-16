function setupInput() {
    document.onkeydown = function(event) {
        if (event.keyCode == 87 || event.keyCode == 38)
            pressForward();
        else if (event.keyCode == 83 || event.keyCode == 40)
            pressBack();
        else if (event.keyCode == 65 || event.keyCode == 37)
            pressLeft();
        else if (event.keyCode == 68 || event.keyCode == 39)
            pressRight();
        else if (event.keyCode == 32)
            boost();

    }
    document.onkeyup = function(event) {
        if (event.keyCode == 87 || event.keyCode == 38)
            releaseForward();
        else if (event.keyCode == 83 || event.keyCode == 40)
            releaseBack();
        else if (event.keyCode == 65 || event.keyCode == 37)
            releaseLeft();
        else if (event.keyCode == 68 || event.keyCode == 39)
            releaseRight();

    }

}

function pressForward() {
    socket.emit('key', 'pressForward');
}

function releaseForward() {
    socket.emit('key', 'releaseForward');
}

function pressBack() {
    socket.emit('key', 'pressBack');
}

function releaseBack() {
    socket.emit('key', 'releaseBack');
}

function pressLeft() {
    socket.emit('key', 'pressLeft');
}

function releaseLeft() {
    socket.emit('key', 'releaseLeft');
}

function pressRight() {
    socket.emit('key', 'pressRight');
}

function releaseRight() {
    socket.emit('key', 'releaseRight');
}