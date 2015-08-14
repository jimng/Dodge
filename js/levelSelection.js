var levelSelectionState = {
    create: function() {

        /********* Background ********/
        levelNo = 1;
        game.stage.backgroundColor = '#000000';

        var titleLabel = game.add.text(game.world.width / 2, game.world.height / 5, 'Choose Level', {font: '80px Courier', fill: '#ffffff'});
        titleLabel.anchor.x = 0.5;
        titleLabel.anchor.y = 0.5;

        // Generate Level Selector
        for (var i = 0; i < 4; i++){
            for (var j = 0; j < 4; j++){
                var levelLabel = game.add.text(game.world.width / 5 * (j + 1), game.world.height * (0.35 + 0.1 * i), i * 4 + j + 1, {font: '30px Courier', fill: '#ffffff'});
                levelLabel.anchor.x = 0.5;
                levelLabel.anchor.y = 0.5;
                if (i * 4 + j + 1 <= maxLevel) {
                    levelLabel.inputEnabled = true;
                    levelLabel.input.useHandCursor = true;
                    levelLabel.events.onInputOver.add(function(label){
                        label.setStyle({font: 'bold 30px Courier', fill: '#ffff33'});
                    }, this);
                    levelLabel.events.onInputOut.add(function(label){
                        label.setStyle({font: '30px Courier', fill: '#ffffff'});
                    }, this);
                    levelLabel.events.onInputDown.add(this.start, this);
                }else levelLabel.setStyle({font: '30px Courier', fill: '#777777'});
            }
        }

        // Return Label
        var returnLabel = game.add.text(game.world.width / 2, game.world.height * 0.8, 'Return to main menu', {font: '30px Courier', fill: '#ffffff'});
        returnLabel.anchor.x = 0.5;
        returnLabel.anchor.y = 0.5;
        returnLabel.inputEnabled = true;
        returnLabel.input.useHandCursor = true;
        returnLabel.events.onInputOver.add(function(){
            returnLabel.setStyle({font: 'bold 30px Courier', fill: '#ffff33'});
        }, this);
        returnLabel.events.onInputOut.add(function(){
            returnLabel.setStyle({font: '30px Courier', fill: '#ffffff'});
        }, this);
        returnLabel.events.onInputDown.add(this.menu, this);
    },

    menu: function() {
        game.state.start('menu');
    },

    start: function(label){
        levelNo = Number(label.text);
        if (backgroundMusic != null) backgroundMusic.destroy();
        backgroundMusic = game.add.audio('game-bgm', 1, true);
        backgroundMusic.play();
        if (backgroundMusicMute) backgroundMusic.mute = true;
        game.state.start('transition');
    }
};