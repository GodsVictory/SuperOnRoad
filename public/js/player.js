function Player(x, y, rotation, speed, turn, type, levelBounds) {
  this.truck = new Truck(type);
  this.truck.spawnAt(x, y);
  this.lastUpdateSeq = 0;
  this.seq = -1;
  this.updates = [];
  this.speed = speed;
  this.turn = turn;
  this.x = x;
  this.y = y;
  this.rotation = rotation;
  this.type = type;
  this.levelBounds = levelBounds;
  this.boostVel = boostVel;
  this.boostVal = 1;
  this.boostDuration = boostDuration;
  this.boostCooldown = boostCooldown;
  this.update = function(delta) {
    var data = {
      forward: +forward.isDown,
      back: +back.isDown,
      left: +left.isDown,
      right: +right.isDown,
      boost: 0,
      delta: delta,
      time: Date.now(),
      seq: this.seq++
    };
    this.updates.push(data);
    if (player.truck.update)
      if (player.truck.update.seq > this.lastUpdateSeq) {
        this.x = player.truck.update.x;
        this.y = player.truck.update.y;
        this.rotation = player.truck.update.rotation;
        for (var i = player.truck.update.seq + 1; i < this.seq; i++)
          player.updatePos(this.updates[i]);
      }
    this.updatePos(data);
    socket.emit('input', data);
  }
  this.updatePos = function(data) {
    this.rotation = this.rotation + (-data.left + data.right) * this.turn * data.delta;
    var x = this.x + (data.forward - data.back) * this.speed * (data.boost == 1 ? data.boost * data.boostVel : 1) * Math.sin(this.rotation) * data.delta;
    var y = this.y - (data.forward - data.back) * this.speed * (data.boost == 1 ? data.boost * data.boostVel : 1) * Math.cos(this.rotation) * data.delta;
    if (this.levelBounds[Math.round(x / tileSize) + "," + Math.round(y / tileSize)]) {
      this.x = x;
      this.y = y;
    }
  }
  this.show = function() {
    this.truck.setPos(this.x, this.y);
    this.truck.setRotation(this.rotation);
  }
}