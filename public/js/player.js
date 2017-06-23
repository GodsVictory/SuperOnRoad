function Player(x, y, rotation, speed, turn, boostVel, boostDuration, boostCooldown, type, levelBounds) {
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
  this.boostVel = boostVel;
  this.boostVal = 1;
  this.boostDuration = boostDuration;
  this.boostCooldown = boostCooldown;
  this.lastBoost = 0;
  this.update = function(delta) {
    var updateData = player.truck.update;
    this.x = updateData.x;
    this.y = updateData.y;
    this.rotation = updateData.rotation;
    for (var i = updateData.seq; i < this.seq - 1; i++)
      player.updatePos(this.updates[i]);
    var data = {
      forward: +forward.isDown,
      back: +back.isDown,
      left: +left.isDown,
      right: +right.isDown,
      boost: +boost.isDown,
      lastBoost: this.lastBoost,
      delta: delta,
      time: Date.now(),
      seq: this.seq++
    };
    this.updates.push(data);
    this.updatePos(data);
    socket.emit('input', data);
  }
  this.updatePos = function(data) {
    if (data.time - data.lastBoost >= this.boostDuration) {
      this.boostVal = 1;
    }
    if (data.boost && data.time - data.lastBoost >= this.boostCooldown) {
      this.lastBoost = data.time;
      this.boostVal = this.boostVel;
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
  }
}