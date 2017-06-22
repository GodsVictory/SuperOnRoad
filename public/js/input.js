function setupInput() {
  if (!isMobile.any) {
    forward = keyboard(['87', '38']);
    back = keyboard(['83', '40']);
    left = keyboard(['65', '37 ']);
    right = keyboard(['68', '39']);
    boost = keyboard(['32']);
  } else {
    forward = Arrow(150, 100, 0);
    back = Arrow(150, 300, 1);
    left = Arrow(500, 300, 1.5);
    right = Arrow(700, 300, .5);
    boost = Arrow(600, 100, 0);
  }
}

function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    for (var i = 0; i < key.code.length; i++)
      if (event.keyCode == key.code[i]) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    for (var i = 0; i < key.code.length; i++)
      if (event.keyCode == key.code[i]) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

function Arrow(x, y, r) {
  var arrow = {};
  arrow.sprite = PIXI.Sprite.fromImage('assets/interface/arrow.png');
  arrow.sprite.width = 150;
  arrow.sprite.height = 150;
  arrow.sprite.anchor.set(0.5);
  arrow.sprite.rotation = Math.PI * r;
  arrow.sprite.x = x;
  arrow.sprite.y = y + 600;
  app.stage.addChild(arrow.sprite);
  arrow.sprite.interactive = true;
  arrow.isDown = false;
  arrow.isUp = true;
  arrow.press = undefined;
  arrow.release = undefined;

  arrow.sprite.on('pointerdown', function() {
    arrow.isDown = true;
    arrow.isUp = false;
  });

  arrow.sprite.on('pointerup', function() {
    arrow.isDown = false;
    arrow.isUp = true;
  });
  return arrow;
}