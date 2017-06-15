function setupMobile() {

	var width = mobile.view.width;
	var height = mobile.view.height;
	var arrowSize = 150;

	var arrowUp = new Arrow(arrowSize, 150, 0);
	arrowUp.arrow.on('pointerdown', function(e) {
		player.pressForward();
	});
	arrowUp.arrow.on('pointerup', function(e) {
		player.releaseForward();
	});

	var arrowDown = new Arrow(arrowSize, 350, 1);
	arrowDown.arrow.on('pointerdown', function(e) {
		player.pressBack();
	});
	arrowDown.arrow.on('pointerup', function(e) {
		player.releaseBack();
	});

	var arrowLeft = new Arrow(width - arrowSize * 2, 350, 1.5);
	arrowLeft.arrow.on('pointerdown', function(e) {
		player.pressLeft();
	});
	arrowLeft.arrow.on('pointerup', function(e) {
		player.releaseLeft();
	});

	var arrowRight = new Arrow(width - arrowSize * .75, 350, .5);
	arrowRight.arrow.on('pointerdown', function(e) {
		player.pressRight();
	});
	arrowRight.arrow.on('pointerup', function(e) {
		player.releaseRight();
	});

	var boost = new Arrow(width - arrowSize * 1.375, 150, 0);
	boost.arrow.on('pointerdown', function(e) {
		player.boost();
	});

	function Arrow(x, y, r) {
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