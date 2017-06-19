function Player(x, y, rotation, type, levelBounds) {
	this.truck = new Truck(type);
	this.truck.spawnAt(200, 150);
	this.speed = 300;
	this.turn = 3;
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
			this.forward = this.speed;
		if (data == 'releaseForward')
			this.forward = 0;
		if (data == 'pressBack')
			this.back = this.speed;
		if (data == 'releaseBack')
			this.back = 0;
		if (data == 'pressLeft')
			this.left = -this.turn;
		if (data == 'releaseLeft')
			this.left = 0;
		if (data == 'pressRight')
			this.right = this.turn;
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
		if (this.forward || this.back || this.left || this.right) {
			this.truck.setRotation(this.truck.getRotation() + (this.left + this.right) * delta);

			if (this.boostStart > 0 && Date.now() - this.boostStart > this.boostDuration) {
				this.boostVal = 1;
				this.boostStart = 0;
				this.boostEnd = Date.now();
			}

			var x = this.truck.getX() + (this.forward - this.back) * this.boostVal * delta * Math.sin(this.truck.getRotation());
			var y = this.truck.getY() - (this.forward - this.back) * this.boostVal * delta * Math.cos(this.truck.getRotation());
			if (this.levelBounds[Math.round(x / tileSize) + "," + Math.round(y / tileSize)])
				this.truck.setPos(x, y);
		}
	}
}