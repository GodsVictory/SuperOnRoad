function setupMobile() {
	mobile = new PIXI.Application(app.view.width, 600, {
		backgroundColor: 0xFFFFFF,
		antialias: true
	});
	document.body.appendChild(mobile.view);
	var width = mobile.view.width;
	var height = mobile.view.height;
	var arrowSize = 150;

	var arrowUp = new arrow(arrowSize, height / 2 - arrowSize * .75, 0);
	arrowUp.arrow.on('pointerdown', function(e) {
		player.pressForward();
	});
	arrowUp.arrow.on('pointerup', function(e) {
		player.releaseForward();
	});

	var arrowDown = new arrow(arrowSize, height / 2 + arrowSize * .75, 1);
	arrowDown.arrow.on('pointerdown', function(e) {
		player.pressBack();
	});
	arrowDown.arrow.on('pointerup', function(e) {
		player.releaseBack();
	});

	var arrowLeft = new arrow(width - arrowSize * 2, height / 2, 1.5);
	arrowLeft.arrow.on('pointerdown', function(e) {
		player.pressLeft();
	});
	arrowLeft.arrow.on('pointerup', function(e) {
		player.releaseLeft();
	});

	var arrowRight = new arrow(width - arrowSize * .75, height / 2, .5);
	arrowRight.arrow.on('pointerdown', function(e) {
		player.pressRight();
	});
	arrowRight.arrow.on('pointerup', function(e) {
		player.releaseRight();
	});

	function arrow(x, y, r) {
		this.arrow = PIXI.Sprite.fromImage('assets/arrow.png');
		this.arrow.width = arrowSize;
		this.arrow.height = arrowSize;
		this.arrow.anchor.set(0.5);
		this.arrow.rotation = Math.PI * r;
		this.arrow.x = x;
		this.arrow.y = y;
		mobile.stage.addChild(this.arrow);
		this.arrow.interactive = true;
	}

}