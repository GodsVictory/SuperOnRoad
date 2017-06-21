function openSocket() {
  socket = io();

  socket.on('initialize', function(data) {
    id = data;

    for (var i in players) {
      players[i].removeTruck();
      delete players[i];
    }

    var level = PIXI.Sprite.fromImage('assets/levels/level2.png');
    app.stage.addChild(level);
    socket.emit('level', '1');
  });

  socket.on('create', function(data) {
    for (var i in data) {
      if (i == id) {
        if (!player)
          player = new Player(data[i].x, data[i].y, data[i].rotation, data[i].speed, data[i].turn, data[i].type, data[i].level.bounds);
        players[i] = player.truck;
      } else if (!players[i]) {
        var truck = new Truck(data[i].type);
        truck.spawnAt(data[i].x, data[i].y);
        truck.setRotation(data[i].rotation);
        players[i] = truck;
      }
    }
  });

  socket.on('update', function(data) {
    queueMove[data.id] = {
      id: data.id,
      x: data.x,
      y: data.y,
      rotation: data.rotation
    };
  });

  socket.on('destroy', function(id) {
    if (players[id]) {
      players[id].removeTruck();
      delete players[id];
      delete queueMove[id];
    }
  });
};