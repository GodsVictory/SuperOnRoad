function Player(x, y, rotation, speed, turn, type, levelBounds) {
  this.truck = new Truck(type);
  this.truck.spawnAt(200, 150);
  this.seq = 0;
  this.updates = [];
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
  this.boost = 0;
  this.boostVel = 2;
  this.boostVal = 1;
  this.boostDuration = 1000;
  this.boostCooldown = 3000;
  this.boostStart = 0;
  this.boostEnd = 0;
  this.update = function(delta) {
    this.forward = forward.isDown ? 1 : 0;
    this.back = back.isDown ? 1 : 0;
    this.left = left.isDown ? 1 : 0;
    this.right = right.isDown ? 1 : 0;
    this.boost = boost.isDown ? 1 : 0;

    if (player.truck.update) {
      this.x = player.truck.update.x;
      this.y = player.truck.update.y;
      this.rotation = player.truck.update.rotation;
      for (var i = player.truck.update.seq + 1; i < this.seq; i++) {
        player.updatePos(this.updates[i]);
      }
    }

    var data = {
      forward: this.forward,
      back: this.back,
      left: this.left,
      right: this.right,
      boost: this.boost,
      delta: delta,
      time: Date.now(),
      seq: this.seq
    };
    this.updates.push(data);
    this.updatePos(data);
    socket.emit('input', data);
  }
  this.updatePos = function(data) {
    if (this.boostStart == 0 && data.boost) {
      //if (this.boostEnd == 0 || data.time - this.boostEnd >= this.boostCooldown) {
      this.boostVal = this.boostVel;
      this.boostStart = data.time;
      //}
    } else {
      if (data.time - this.boostStart >= this.boostDuration) {
        this.boostVal = 1;
        this.boostEnd = data.time;
        this.boostStart = 0;
      }
    }
    this.rotation = this.rotation + (-data.left + data.right) * this.turn * data.delta;
    var x = this.x + (data.forward - data.back) * this.speed * this.boostVal * Math.sin(this.rotation) * data.delta;
    var y = this.y - (data.forward - data.back) * this.speed * this.boostVal * Math.cos(this.rotation) * data.delta;
    if (this.levelBounds[Math.round(x / tileSize) + "," + Math.round(y / tileSize)]) {
      this.x = x;
      this.y = y;
    }
  }
  this.show = function() {
    this.truck.setPos(this.x, this.y);
    this.truck.setRotation(this.rotation);
    this.updates[this.seq].x = this.x;
    this.updates[this.seq].y = this.y;
    this.seq++;
  }
}