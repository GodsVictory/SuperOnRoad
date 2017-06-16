function setupMobile() {

	mobile = new PIXI.Application(800, 600, {
		backgroundColor: 0xFFFFFF,
		antialias: true
	});
	document.body.appendChild(mobile.view);
	mobile.renderer.view.style.position = 'absolute';
	mobile.renderer.view.style.top = 600;
	mobile.renderer.view.style.left = 0;

	var arrowUp = new Arrow(150, 100, 0);
	arrowUp.arrow.on('pointerdown', function(e) {
		socket.emit('update', 'pressForward');
	});
	arrowUp.arrow.on('pointerup', function(e) {
		socket.emit('update', 'releaseForward');
	});

	var arrowDown = new Arrow(150, 300, 1);
	arrowDown.arrow.on('pointerdown', function(e) {
		socket.emit('update', 'pressBack');
	});
	arrowDown.arrow.on('pointerup', function(e) {
		socket.emit('update', 'releaseBack');
	});

	var arrowLeft = new Arrow(500, 300, 1.5);
	arrowLeft.arrow.on('pointerdown', function(e) {
		socket.emit('update', 'pressLeft');
	});
	arrowLeft.arrow.on('pointerup', function(e) {
		socket.emit('update', 'releaseLeft');
	});

	var arrowRight = new Arrow(700, 300, .5);
	arrowRight.arrow.on('pointerdown', function(e) {
		socket.emit('update', 'pressRight');
	});
	arrowRight.arrow.on('pointerup', function(e) {
		socket.emit('update', 'releaseRight');
	});

	var boost = new Arrow(600, 100, 0);
	boost.arrow.on('pointerdown', function(e) {
		socket.emit('update', 'boost');
	});

	function Arrow(x, y, r) {
		this.arrow = PIXI.Sprite.fromImage('assets/interface/arrow.png');
		this.arrow.width = 150;
		this.arrow.height = 150;
		this.arrow.anchor.set(0.5);
		this.arrow.rotation = Math.PI * r;
		this.arrow.x = x;
		this.arrow.y = y;
		mobile.stage.addChild(this.arrow);
		this.arrow.interactive = true;
	}

}