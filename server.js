var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.get('/', function(req, res) {
	res.sendFile(__dirname, 'public/index.html');
});
app.use(express.static('public'));

var players = [];
io.on('connection', function(socket) {
	socket.emit('getID', socket.id);
	socket.on('initialize', function(data) {
		for (var i = 0; i < players.length; i++)
			socket.emit('create', players[i]);
		players.push(data);
		console.log('connect', players);
		socket.broadcast.emit('create', data);
	});
	socket.on('disconnect', function() {
		for (var i = 0; i < players.length; i++)
			if (players[i].id == socket.id) {
				players.splice(i, 1);
				io.emit('destroy', socket.id);
			}
	});
	socket.on('update', function(data) {
		var exist = false;
		for (var i = 0; i < players.length; i++)
			if (players[i].id == data.id) {
				exist = true;
				info = {
					id: socket.id,
					x: data.x,
					y: data.y,
					rotation: data.rotation
				};
				players[i].x = data.x;
				players[i].y = data.y;
				players[i].rotation = data.rotation;
				socket.broadcast.emit('update', info);
			}
		if (!exist)
			console.log('player not found');
		exist = false;
	});
});
server.listen(3000);