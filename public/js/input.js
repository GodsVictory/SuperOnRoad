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
  player.forward = 1;
  // player.input('pressForward');
}

function releaseForward() {
  // socket.emit('key', 'releaseForward');
  player.forward = 0;
  player.input('releaseForward');
}

function pressBack() {
  // socket.emit('key', 'pressBack');
  player.back = 1;
  player.input('pressBack');
}

function releaseBack() {
  // socket.emit('key', 'releaseBack');
  player.back = 0;
  player.input('releaseBack');
}

function pressLeft() {
  // socket.emit('key', 'pressLeft');
  player.left = 1;
  player.input('pressLeft');
}

function releaseLeft() {
  // socket.emit('key', 'releaseLeft');
  player.left = 0;
  player.input('releaseLeft');
}

function pressRight() {
  // socket.emit('key', 'pressRight');
  player.right = 1;
  player.input('pressRight');
}

function releaseRight() {
  // socket.emit('key', 'releaseRight');
  player.right = 0;
  player.input('releaseRight');
}

function boost() {
  // socket.emit('key', 'boost');
  player.boost();
}