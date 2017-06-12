var setEventHandlers = function() {
	socket = io.connect('localhost:3000', {
		'sync disconnect on unload': true
	});
	socket.on('getID', function(socketID) {
		console.log('your ID is', socketID);
		player = new player(socketID);
		player.id = socketID;
		info = {
			id: socketID,
			x: player.sprite.getX(),
			y: player.sprite.getY(),
			rotation: player.sprite.getRotation()
		};
		socket.emit('initialize', info);
	});
	socket.on('create', function(data) {
		if (data.id != player.id) {
			var newTruck = new truck(data.id);
			newTruck.spawnAt(data.x, data.y);
			newTruck.setRotation(data.rotation);
			remotePlayers.push(newTruck);
			console.log('creating', data.id);
		}
	});
	socket.on('destroy', function(data) {
		var select = playerById(data);
		if (select) {
			console.log('removing', data);
			select.entitiy.removeTruck();
			remotePlayers.splice(select.index, 1);
		}
	});
	socket.on('update', function(data) {
		var select = playerById(data.id);
		if (select) {
			select.entitiy.setPos(data.x, data.y);
			select.entitiy.setRotation(data.rotation);
		}
	});

	function playerById(id) {
		for (var i = 0; i < remotePlayers.length; i++)
			if (remotePlayers[i].id === id)
				return {
					entitiy: remotePlayers[i],
					index: i
				}
		return false
	}
};