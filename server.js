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
var sprites = ['ambulance', 'audi', 'black_viper', 'car', 'mini_truck', 'mini_van', 'police', 'sedan', 'sonic', 'taxi', 'trashmaster', 'truck'];
var tileSize = 5;

io.on('connection', function(socket) {
  socket.emit('initialize', socket.id);

  socket.on('disconnect', function() {
    delete players[socket.id];
    io.emit('destroy', socket.id);
  });

  socket.on('input', function(data) {
    if (players[socket.id]) {
      players[socket.id].inputs.push(data);
      players[socket.id].seq++;
    }
  });

  socket.on('level', function(data) {
    players[socket.id] = new Player(socket.id, 200, 150, 1.5708, sprites[getRandomInt(0, sprites.length - 1)], loadLevel(data));
    io.emit('create', players);
  });

});

var Player = function(id, x, y, rotation, type, level) {
  this.id = id;
  this.speed = 5;
  this.turn = .05;
  this.x = x;
  this.y = y;
  this.rotation = rotation;
  this.type = type;
  this.level = level;
  this.forward = 0;
  this.back = 0;
  this.left = 0;
  this.right = 0;
  this.boostVel = 2;
  this.boostVal = 1;
  this.boostDuration = 1000;
  this.boostCooldown = 3000;
  this.boostStart = 0;
  this.boostEnd = 0;
  this.inputs = [];
  this.seq = 0;
  this.updateData;
}

var tps = 60;
const gameloop = require('node-gameloop');
const id = gameloop.setGameLoop(function(deltaTime) {
    var delta = tps * deltaTime;
    for (var i in players) {
      var len = players[i].inputs.length;
      var forward = 0;
      var back = 0;
      var left = 0;
      var right = 0;
      for (var j = 0; j < len; j++) {
        var input = players[i].inputs.shift();

        if (players[i].boostStart == 0) {
          if (input.boost)
            if (players[i].boostEnd == 0 || input.time - players[i].boostEnd >= players[i].boostCooldown) {
              players[i].boostVal = players[i].boostVel;
              players[i].boostStart = input.time;
            }
        } else {
          if (input.time - players[i].boostStart >= players[i].boostDuration) {
            players[i].boostVal = 1;
            players[i].boostEnd = input.time;
            players[i].boostStart = 0;
          }
        }

        players[i].rotation = players[i].rotation + (-input.left + input.right) * players[i].turn * input.delta * delta;
        var x = players[i].x + (input.forward - input.back) * players[i].speed * players[i].boostVal * Math.sin(players[i].rotation) * input.delta * delta;
        var y = players[i].y - (input.forward - input.back) * players[i].speed * players[i].boostVal * Math.cos(players[i].rotation) * input.delta * delta;
        if (players[i].level)
          if (players[i].level.contains(x, y)) {
            players[i].x = x;
            players[i].y = y;
          }
      }
      players[i].updateData = {
        id: i,
        x: players[i].x,
        y: players[i].y,
        rotation: players[i].rotation,
        seq: players[i].seq
      };
    }
    var update = [];
    for (var i in players) {
      update.push(players[i].updateData);
    }
    io.emit('update', update);
  },
  1000 / tps);


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadLevel(level) {
  if (level == 1)
    return new Level1();

  function Level1() {
    var map = "\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX#################$\
################X                                                                                                                               X################$\
###############X                                                                                                                                 X###############$\
##############X                                                                                                                                   X##############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                          XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                          X#############$\
#############X                         X#################################################################################X                         X#############$\
#############X                        X###################################################################################X                        X#############$\
#############X                       X#####################################################################################X                       X#############$\
#############X                      X#######################################################################################X                      X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                      X#######################################################################################X                      X#############$\
#############X                       X#####################################################################################X                       X#############$\
#############X                        X###################################################################################X                        X#############$\
#############X                         X#################################################################################X                         X#############$\
#############X                          XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                          X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
##############X                                                                                                                                   X##############$\
###############X                                                                                                                                 X###############$\
################X                                                                                                                               X################$\
#################XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX#################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$";
    this.bounds = load(map);
    this.startX = 200;
    this.startY = 150;
    this.contains = function(x, y) {
      return (this.bounds[Math.round(x / tileSize) + "," + Math.round(y / tileSize)])
    }

  }

  function load(map) {
    var bounds = {};
    var x = 0;
    var y = 0;
    for (var i = 0; i < map.length; i++) {
      if (map[i] == '$') {
        x = -tileSize;
        y += tileSize;
      } else if (map[i] == ' ') {
        bounds[x / tileSize + "," + y / tileSize] = true;
      }
      x += tileSize;
    }
    return bounds;
  }
}