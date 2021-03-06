function Player(x, y, rotation, speed, turn, boostVel, boostDuration, boostCooldown, type, levelBounds) {
  this.truck = new Truck(type);
  this.truck.spawnAt(x, y);
  this.lastUpdateSeq = -1;
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
    var data = {
      id: id,
      forward: +forward.isDown,
      back: +back.isDown,
      left: +left.isDown,
      right: +right.isDown,
      boost: 0,
      lastBoost: this.lastBoost,
      delta: delta,
      time: Date.now(),
      seq: this.seq++
    };
    this.updates.push(data);
    var updateData = player.truck.update;
    if (updateData)
      if (updateData.seq > this.lastUpdateSeq) {
        this.lastUpdateSeq = updateData.seq;
        this.x = updateData.x;
        this.y = updateData.y;
        this.rotation = updateData.rotation;
        for (var i = updateData.seq + 1; i < this.seq; i++)
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