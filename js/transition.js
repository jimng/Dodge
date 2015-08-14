var transitionState = {
    create: function() {

        /********* Background ********/
        game.stage.backgroundColor = '#000000';

        /********* Text Label *********/

        // Title Label
        var titleLabel = game.add.text(game.world.width / 2, game.world.height / 5, 'Level ' + levelNo, {font: '80px Courier', fill: '#ffffff'});
        titleLabel.anchor.x = 0.5;
        titleLabel.anchor.y = 0.5;

        // Level Description
        var level = JSON.parse(game.cache.getText('level' + levelNo));
        var levelLabel = game.add.text(game.world.width / 2, game.world.height * 0.4, level.text.content, {font: level.text.size + 'px Courier', fill: '#ffffff'});
        levelLabel.anchor.x = 0.5;
        levelLabel.anchor.y = 0.5;

        // Control Label
        var controlLabel = game.add.text(game.world.width / 2, game.world.height * 0.9, 'Press spacebar to continue', {font: '20px Courier', fill: '#ffffff'});
        controlLabel.anchor.x = 0.5;
        controlLabel.anchor.y = 0.5;

        var spacebarkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebarkey.onDown.add(this.start, this);
    },

    start: function() {
        game.state.start('play');
    }
};