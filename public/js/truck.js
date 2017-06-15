function Truck(id, type) {
    this.id = id;
    this.type = type;
    this.truck = PIXI.Sprite.fromImage('assets/' + this.type + '.png');
    this.truck.anchor.set(0.5);
    this.truck.rotation = 1.5708;
    this.truck.width = 100;
    this.truck.height = 100;
    this.spawnAt = function(x, y) {
        this.truck.x = x;
        this.truck.y = y;
        app.stage.addChild(this.truck);
    }
    this.getX = function() {
        return this.truck.x;
    }
    this.getY = function() {
        return this.truck.y;
    }
    this.setPos = function(x, y) {
        this.truck.x = x;
        this.truck.y = y;
    }
    this.getRotation = function() {
        return this.truck.rotation;
    }
    this.setRotation = function(angle) {
        this.truck.rotation = angle;
    }
    this.removeTruck = function() {
        this.truck.destroy();
    }
    this.setTint = function(tint) {
        this.truck.tint = tint;
    }
    this.getTint = function() {
        return this.truck.tint;
    }
}