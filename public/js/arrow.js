  function Arrow(x, y, r, direction) {
    this.arrow = PIXI.Sprite.fromImage('assets/interface/arrow.png');
    this.arrow.width = 150;
    this.arrow.height = 150;
    this.arrow.anchor.set(0.5);
    this.arrow.rotation = Math.PI * r;
    this.arrow.x = x;
    this.arrow.y = y + 600;
    app.stage.addChild(this.arrow);
    this.arrow.interactive = true;
    this.code = keyCode;
    this.isDown = false;
    this.isUp = true;
    this.press = undefined;
    this.release = undefined;

    this.arrow.on('pointerdown', function() {
      this.isDown = true;
      this.isUp = false;
    });
    /*
        var key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;
        //The `downHandler`
        key.downHandler = function(event) {
          if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
          }
          event.preventDefault();
        };

        //The `upHandler`
        key.upHandler = function(event) {
          if (event.keyCode === key.code) {
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
        return key;*/
  }