var mainState = {
    preload: function () {
        game.load.image("player", "assets/player.png");
        game.load.image("wall", "assets/wall.png");
        game.load.image("coin", "assets/coin.png");
        game.load.image("enemy", "assets/enemy.png");
        game.load.audio("coin", ["assets/coin.mp3", "assets/coin.ogg"]);
        game.load.audio("jump", ["assets/jump.mp3", "assets/jump.ogg"]);
        game.load.audio("lost", ["assets/lost.mp3", "assets/lost.ogg"]);
    },

    create: function () {
        game.stage.backgroundColor = "#3598db";
        game.world.enableBody = true;
        this.cursor = game.input.keyboard.createCursorKeys();
        this.player = game.add.sprite(60, 100, "player");
        this.player.body.gravity.y = 400;
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();

        var level = [
            "xxxxxxxxxxxxxxxxxxxxxx",
            "!         !          x",
            "!                 o  x",
            "!         o          x",
            "!                    x",
            "!     o   !    x     x",
            "xxxxxxxxxxxxxxxx!!!!!x",
        ];
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {
                if (level[i][j] == "x") {
                    var wall = game.add.sprite(30 + 20 * j, 30 + 20 * i, "wall");
                    this.walls.add(wall);
                    wall.body.immovable = true;
                }

                else if (level[i][j] == "o") {
                    var coin = game.add.sprite(30 + 20 * j, 30 + 20 * i, "coin");
                    this.coins.add(coin);
                }

                else if (level[i][j] == "!") {
                    var enemy = game.add.sprite(30 + 20 * j, 30 + 20 * i, "enemy");
                    this.enemies.add(enemy);
                }
            }
        }
    },

    update: function () {
        if (this.cursor.left.isDown) this.player.body.velocity.x = -200;
        else if (this.cursor.right.isDown) this.player.body.velocity.x = 200;
        else this.player.body.velocity.x = 0;

        if (this.cursor.up.isDown && this.player.body.y >= 130) {
            music = game.add.audio("jump");
            music.play();
            this.player.body.velocity.y = -200;
            this.player.body.y -= 1;
        }
        game.physics.arcade.collide(this.player, this.walls);

        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

        game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
    },
    takeCoin: function (player, coin) {
        music = game.add.audio("coin");
        music.play();
        coin.kill();
    },

    restart: function () {
        music = music = game.add.audio("lost");
        music.play();
        game.state.start("gameOver");
    },
};

var menuState = {
    preload: function () {
        game.load.image("button", "assets/button_play-game.png");
        game.load.image("back", "assets/back_1.jpg");
    },
    create: function () {
        game.stage.backgroundColor = "#182d3b";

        back = game.add.tileSprite(0, 0, 800, 600, "back");

        button = game.add.button(game.world.centerX - 95, 400, "button", this.actionOnClick, this);
    },

    actionOnClick: function () {
        game.state.start("game");
    },
};


var gameOverState = {
    timer: 0,
    preload: function () {
        game.load.image("button", "assets/button_play-again.png");
        game.load.image("back", "assets/game_over.jpg");
    },
    create: function () {
        this.add.text(0, 0, "Hello World", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        back = game.add.tileSprite(0, 0, 800, 600, "back");

        button = game.add.button(game.world.centerX - 95, 400, "button", this.actionOnClick, this);
    },

    actionOnClick: function () {
        game.state.start("game");
    },
    update: function () {
        this.timer += 1;
        if (this.timer >= 3 * 60) {
            game.state.start("menu");
            this.timer = 0;
        }
        
    },
};

var config = {
    type: Phaser.AUTO,
    scale: {
        width: 500,
        height: 200,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
        },
    },
};

var game = new Phaser.Game(config);
game.state.add("menu", menuState);
game.state.add("game", mainState);
game.state.add("gameOver", gameOverState);
game.state.start("menu");

// game.state.add("main", mainState);
// game.state.start("main");
