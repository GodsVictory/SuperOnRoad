var game = new Phaser.Game(800, 600, Phaser.AUTO, 'offroad', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('truck', 'truck.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#000000";
    player = new truck(50, 50, 60, 30, 300);
    player.show();
    
    forward = game.input.keyboard.addKey(Phaser.Keyboard.W);
    left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    back = game.input.keyboard.addKey(Phaser.Keyboard.S);
    right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    boost = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    player.update();
    if (forward.isDown)
        player.forward(1);
    if (left.isDown)
        player.left(1);
    if (back.isDown)
        player.back(1);
    if (right.isDown)
        player.right(1);
    if (boost.isDown)
        player.boost(200);
}
