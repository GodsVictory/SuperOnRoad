var express = require('express');
var app = express();
var server = require('http').createServer(app);
app.get('/', function(req, res) {
	res.sendFile(__dirname, 'public/index.html');
});
app.use(express.static('public'));
var port = process.env.PORT || 80;
server.listen(port);

var io = require('socket.io')(server);
var players = {};
io.on('connection', function(socket) {

	socket.emit('getID', socket.id);

	socket.on('initialize', function(data) {
		players[socket.id] = data;
		io.emit('create', players);
	});

	socket.on('disconnect', function() {
		delete players[socket.id];
		io.emit('destroy', socket.id);
	});

	socket.on('update', function(data) {
		players[socket.id] = data;
		socket.broadcast.emit('update', {
			id: socket.id,
			x: players[socket.id].x,
			y: players[socket.id].y,
			rotation: players[socket.id].rotation
		});
	});

});

/*
const gameloop = require('node-gameloop');
const id = gameloop.setGameLoop(function(delta) {
	io.emit('update', players);
}, 1000 / 60);*/