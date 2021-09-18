
var mainState = {
    preload: function () {
        game.load.image("logo", "static/img/logo_1.png");
    },
    create: function () {
        this.sprite = game.add.sprite(300, 300, "logo");
    },
    update: function () {
        this.sprite.rotation += 0.02;
    },
};

var game = new Phaser.Game(1024, 768, Phaser.AUTO, "gameDiv");

game.state.add("main", mainState);
game.state.start("main");
