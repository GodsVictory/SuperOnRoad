function openSocket() {
	socket = io();

	socket.on('initialize', function(data) {

		id = data;

		var bg = PIXI.Sprite.fromImage('assets/levels/level2.png');
		app.stage.addChild(bg);
		socket.emit('level', '1');

		socket.on('create', function(data) {
			for (var i in players) {
				players[i].removeTruck();
				delete players[i];
			}
			for (var i in data) {
				if (i != id && !players[i]) {
					var newTruck = new Truck(data[i].type);
					newTruck.spawnAt(data[i].x, data[i].y);
					newTruck.setRotation(data[i].rotation);
					players[i] = newTruck;
				} else if (i == id) {
					if (player)
						player.removeTruck();
					player = new Truck(data[i].type);
					player.spawnAt(data[i].x, data[i].y);
					players[data[i].id] = player;
				}
			}

			socket.on('update', function(data) {
				if (players[data.id]) {
					players[data.id].setPos(data.x, data.y);
					players[data.id].setRotation(data.rotation);
				}
			});

			socket.on('destroy', function(id) {
				if (players[id]) {
					players[id].removeTruck();
					delete players[id];
				}
			});
		});
	});
};