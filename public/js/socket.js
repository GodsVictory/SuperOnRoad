function openSocket() {
	socket = io();

	socket.on('getID', function(data) {
		player = new Player(data);
		info = {
			x: player.sprite.getX(),
			y: player.sprite.getY(),
			rotation: player.sprite.getRotation(),
			tint: player.sprite.getTint()
		};
		socket.emit('initialize', info);
	});

	socket.on('create', function(data) {
		for (var i in data) {
			if (i != player.id) {
				var newTruck = new Truck(data[i].id);
				newTruck.spawnAt(data[i].x, data[i].y);
				newTruck.setRotation(data[i].rotation);
				newTruck.setTint(data[i].tint);
				remotePlayers[i] = newTruck;
			}
		}
	});

	socket.on('destroy', function(data) {
		remotePlayers[data].removeTruck();
		delete remotePlayers[data];
	});

	socket.on('update', function(data) {
		for (var i in data) {
			if (i != player.id) {
				remotePlayers[i].setPos(data[i].x, data[i].y);
				remotePlayers[i].setRotation(data[i].rotation);
			}
		}
	});
};