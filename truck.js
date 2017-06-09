function truck() {
    this.speed = 5;
    this.turn = .07;
    this.vel = 0;
    this.angle = 0;
    this.boostVel = 5;
    this.boostVal = 0;
    this.boostDuration = 1000;
    this.boostCooldown = 3000;
    this.boostStart = 0;
    this.boostEnd = 0;

    this.truck = PIXI.Sprite.fromImage('truck.png')
    this.truck.anchor.set(0.5);
    this.truck.width = 60;
    this.truck.height = 30;
    if (level) {
        this.truck.x = level.startX;
        this.truck.y = level.startY;
    } else {
        this.truck.x = app.renderer.width / 2;
        this.truck.y = app.renderer.height / 2;
    }
    app.stage.addChild(this.truck);

    this.update = function () {
        this.truck.rotation += this.angle;
        if (this.vel != 0) {
            var x = Math.round(this.truck.x + (this.vel + this.boostVal) * Math.cos(this.truck.rotation));
            var y = Math.round(this.truck.y + (this.vel + this.boostVal) * Math.sin(this.truck.rotation));
            if (level) {
                if (level.contains(x, y)) {
                    this.truck.x = x;
                    this.truck.y = y;
                }
            } else {
                this.truck.x = x;
                this.truck.y = y;
            }
        }

        if (this.boostStart > 0 && Date.now() - this.boostStart > this.boostDuration) {
            this.boostVal = 0;
            this.boostStart = 0;
            this.boostEnd = Date.now();
        }
    }

    this.forward = function () {
        this.vel = this.speed;
    }
    this.left = function () {
        this.angle = -this.turn;
    }
    this.back = function () {
        this.vel = -this.speed;
    }
    this.right = function () {
        this.angle = this.turn;
    }
    this.stopVel = function () {
        this.vel = 0;
    }
    this.stopTurn = function () {
        this.angle = 0;
    }
    this.boost = function () {
        if (this.boostEnd == 0 || Date.now() - this.boostEnd >= this.boostCooldown) {
            this.boostVal = this.boostVel;
            this.boostStart = Date.now();
        }
    }
}
