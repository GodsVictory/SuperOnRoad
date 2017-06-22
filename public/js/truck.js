function Truck(type) {
  this.update = false;
  this.type = type;
  this.truck = PIXI.Sprite.fromImage('assets/sprites/' + this.type + '.png');
  this.truck.anchor.set(0.5);
  this.truck.rotation = 1.5708;
  this.truck.width = 75;
  this.truck.height = 75;
}

Truck.prototype.spawnAt = function(x, y) {
  this.truck.x = x;
  this.truck.y = y;
  app.stage.addChild(this.truck);
}
Truck.prototype.getX = function() {
  return this.truck.x;
}
Truck.prototype.getY = function() {
  return this.truck.y;
}
Truck.prototype.setPos = function(x, y) {
  this.truck.x = x;
  this.truck.y = y;
}
Truck.prototype.getRotation = function() {
  return this.truck.rotation;
}
Truck.prototype.setRotation = function(angle) {
  this.truck.rotation = angle;
}
Truck.prototype.removeTruck = function() {
  this.truck.destroy();
}
Truck.prototype.getInfo = function() {
  return {
    x: this.getX(),
    y: this.getY(),
    rotation: this.getRotation()
  };
}