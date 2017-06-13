function truck(id) {
    this.id = id;
    this.truck = PIXI.Sprite.fromImage('assets/truck.png');
    this.truck.anchor.set(0.5);
    this.truck.width = 50;
    this.truck.height = 30;
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
}