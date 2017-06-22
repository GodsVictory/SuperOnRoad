function Player(x, y, rotation, speed, turn, type, levelBounds) {
  this.truck = new Truck(type);
  this.truck.spawnAt(200, 150);
  this.speed = speed;
  this.turn = turn;
  this.x = x;
  this.y = y;
  this.rotation = rotation;
  this.type = type;
  this.levelBounds = levelBounds;
  this.forward = 0;
  this.back = 0;
  this.left = 0;
  this.right = 0;
  this.boostVel = 2;
  this.boostVal = 1;
  this.boostDuration = 1000;
  this.boostCooldown = 3000;
  this.boostStart = 0;
  this.boostEnd = 0;
  this.input = function(data) {
    if (data == 'pressForward')
      this.forward = 1;
    if (data == 'releaseForward')
      this.forward = 0;
    if (data == 'pressBack')
      this.back = 1;
    if (data == 'releaseBack')
      this.back = 0;
    if (data == 'pressLeft')
      this.left = 1;
    if (data == 'releaseLeft')
      this.left = 0;
    if (data == 'pressRight')
      this.right = 1;
    if (data == 'releaseRight')
      this.right = 0;
    if (data == 'boost')
      this.boost();
  }
  this.boost = function() {
    if (this.boostStart == 0)
      if (this.boostEnd == 0 || Date.now() - this.boostEnd >= this.boostCooldown) {
        this.boostVal = this.boostVel;
        this.boostStart = Date.now();
      }
  }

  this.update = function(delta) {
    if (player.truck.update) {
      player.truck.setPos(player.truck.update.x, player.truck.update.y);
      player.truck.setRotation(player.truck.update.rotation);
      for (var j = player.truck.update.seq; j < seq; j++) {
        player.updatePos(updates[j]);
      }
    }
    var update = {
      forward: this.forward,
      back: this.back,
      left: this.left,
      right: this.right,
      delta: delta,
      time: Date.now(),
      seq: seq++
    };
    updates.push(update);
    socket.emit('input', update);
    this.updatePos(update);
  }

  this.updatePos = function(data) {

    this.truck.setRotation(this.truck.getRotation() + (-data.left + data.right) * this.turn * data.delta);

    var x = this.truck.getX() + (data.forward - data.back) * this.speed * Math.sin(this.truck.getRotation()) * data.delta;
    var y = this.truck.getY() - (data.forward - data.back) * this.speed * Math.cos(this.truck.getRotation()) * data.delta;
    if (this.levelBounds[Math.round(x / tileSize) + "," + Math.round(y / tileSize)])
      this.truck.setPos(x, y);
  }
}