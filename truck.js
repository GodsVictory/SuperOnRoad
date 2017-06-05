function truck(x, y, w, h, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.speedBoost = 0;
    this.turnSpeed = 300;
    this.boostTime = 1;
    this.boostCooldown = 3;
    this.boostStart = 0;
    this.boostEnd = 0;
    
    this.show = function() {
        this.sprite = game.add.sprite(400, 300, 'truck');
        this.sprite.scale.setTo(.2,.2);
        this.sprite.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    }
    
    this.update = function() {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        this.sprite.body.angularVelocity = 0;
        if (this.boostStart > 0 && game.time.totalElapsedSeconds()-this.boostStart > this.boostTime) {
            this.speedBoost = 0;
            this.boostStart = 0;
            this.boostEnd = game.time.totalElapsedSeconds();
        }
    }
    
    this.forward = function(val) {
        game.physics.arcade.velocityFromAngle(this.sprite.angle, this.speed+this.speedBoost, this.sprite.body.velocity);
    }
    this.left = function(val) {
        this.sprite.body.angularVelocity = -this.turnSpeed;
    }
    this.back = function(val) {
        game.physics.arcade.velocityFromAngle(this.sprite.angle, -(this.speed+this.speedBoost), this.sprite.body.velocity);
    }
    this.right = function(val) {
        this.sprite.body.angularVelocity = this.turnSpeed;
    }
    this.boost = function(val) {
        if (this.boostEnd == 0 || game.time.totalElapsedSeconds() - this.boostEnd >= this.boostCooldown) {
            this.speedBoost = val;
            this.boostStart = game.time.totalElapsedSeconds();
        }
    }
}