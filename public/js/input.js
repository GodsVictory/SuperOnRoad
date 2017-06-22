function setupInput() {
  window.onkeydown = function(event) {
    event.preventDefault();
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
  window.onkeyup = function(event) {
    event.preventDefault();
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
  // socket.emit('key', 'pressForward');
  player.input('pressForward');
}

function releaseForward() {
  // socket.emit('key', 'releaseForward');
  player.input('releaseForward');
}

function pressBack() {
  // socket.emit('key', 'pressBack');
  player.input('pressBack');
}

function releaseBack() {
  // socket.emit('key', 'releaseBack');
  player.input('releaseBack');
}

function pressLeft() {
  // socket.emit('key', 'pressLeft');
  player.input('pressLeft');
}

function releaseLeft() {
  // socket.emit('key', 'releaseLeft');
  player.input('releaseLeft');
}

function pressRight() {
  // socket.emit('key', 'pressRight');
  player.input('pressRight');
}

function releaseRight() {
  // socket.emit('key', 'releaseRight');
  player.input('releaseRight');
}

function boost() {
  // socket.emit('key', 'boost');
  player.input('boost');
}