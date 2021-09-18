var mainState = {
    max_amount_of_players: 50,
    weigth: 1024,
    heigth: 768,
    preload: function () {
        game.load.image("back", "static/img/back.jpg");
        game.load.spritesheet("player", "static/img/player.png", 20, 20);
    },
    create: function () {
        game.add.image(0, 0, "back");
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.players = game.add.group();
        this.players.enableBody = true;

        for (var i = 0; i < this.max_amount_of_players; i++) {
            this.add_player();
        }
    },

    add_player: function (x = game.world.randomX, y = game.world.randomY) {
        var player = this.players.create(x, y, "player", 1);
        player.scale.setTo(1.75, 1.75);
        player.rotation = Math.floor(Math.random() * 2) - 1;
        player.animations.add("changeFrameAnimation");
        player.animations.play("changeFrameAnimation", 5, true);
    },

    update: function () {
        for (let player of this.players.children) {
            if (player.x > game.world.bounds.width) {
                player.x = -100;
            } else {
                game.physics.arcade.moveToXY(player, game.world.bounds.width, player.y, 100);
            }
        }
    },
};

var game = new Phaser.Game(1024, 768, Phaser.AUTO, "gameDiv");

game.state.add("main", mainState);
game.state.start("main");
