function openSocket() {
	socket = io();

	socket.on('getID', function(data) {
		player = new Player(data);
		info = {
			id: player.id,
			x: player.sprite.getX(),
			y: player.sprite.getY(),
			rotation: player.sprite.getRotation(),
			//tint: player.sprite.getTint(),
			type: player.sprite.type
		};
		socket.emit('initialize', info);

		socket.on('create', function(data) {
			for (var i in data) {
				if (i != player.id && !remotePlayers[i]) {
					var newTruck = new Truck(data[i].id, data[i].type);
					newTruck.spawnAt(data[i].x, data[i].y);
					newTruck.setRotation(data[i].rotation);
					//newTruck.setTint(data[i].tint);
					remotePlayers[i] = newTruck;
				}
			}

			socket.on('update', function(data) {
				if (remotePlayers[data.id]) {
					remotePlayers[data.id].setPos(data.x, data.y);
					remotePlayers[data.id].setRotation(data.rotation);
				}
				/*for (var i in data) {
					if (i != player.id) {
						if (remotePlayers[i]) {
							remotePlayers[i].setPos(data[i].x, data[i].y);
							remotePlayers[i].setRotation(data[i].rotation);
						}
					}
				}*/
			});

			socket.on('destroy', function(data) {
				if (remotePlayers[data]) {
					remotePlayers[data].removeTruck();
					delete remotePlayers[data];
				}
			});
		});
	});
};