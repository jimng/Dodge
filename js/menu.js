var menuState = {
    create: function() {

        /********* Background ********/
        levelNo = 1;
        game.stage.backgroundColor = '#000000';

        /********** Labels **********/
        var titleLabel = game.add.text(game.world.width / 2, game.world.height / 5, 'Dodge', {font: '80px Courier', fill: '#ffffff'});
        titleLabel.anchor.x = 0.5;
        titleLabel.anchor.y = 0.5;

        // Start Label
        var startLabel = game.add.text(game.world.width / 2, game.world.height * 0.4, 'Start Game', {font: '30px Courier', fill: '#ffffff'});
        startLabel.anchor.x = 0.5;
        startLabel.anchor.y = 0.5;
        startLabel.inputEnabled = true;
        startLabel.input.useHandCursor = true;
        startLabel.events.onInputOver.add(function(){
            startLabel.setStyle({font: 'bold 30px Courier', fill: '#ffff33'});
        }, this);
        startLabel.events.onInputOut.add(function(){
            startLabel.setStyle({font: '30px Courier', fill: '#ffffff'});
        }, this);
        startLabel.events.onInputDown.add(this.start, this);

        // Choose Level Label
        var chooseLevelLabel = game.add.text(game.world.width / 2, game.world.height * 0.5, 'Choose Level', {font: '30px Courier', fill: '#ffffff'});
        chooseLevelLabel.anchor.x = 0.5;
        chooseLevelLabel.anchor.y = 0.5;
        chooseLevelLabel.inputEnabled = true;
        chooseLevelLabel.input.useHandCursor = true;
        chooseLevelLabel.events.onInputOver.add(function(){
            chooseLevelLabel.setStyle({font: 'bold 30px Courier', fill: '#ffff33'});
        }, this);
        chooseLevelLabel.events.onInputOut.add(function(){
            chooseLevelLabel.setStyle({font: '30px Courier', fill: '#ffffff'});
        }, this);
        chooseLevelLabel.events.onInputDown.add(this.levelSelection, this);

        // Options Label
        var optionsLabel = game.add.text(game.world.width / 2, game.world.height * 0.6, 'Options', {font: '30px Courier', fill: '#ffffff'});
        optionsLabel.anchor.x = 0.5;
        optionsLabel.anchor.y = 0.5;
        optionsLabel.inputEnabled = true;
        optionsLabel.input.useHandCursor = true;
        optionsLabel.events.onInputOver.add(function(){
            optionsLabel.setStyle({font: 'bold 30px Courier', fill: '#ffff33'});
        }, this);
        optionsLabel.events.onInputOut.add(function(){
            optionsLabel.setStyle({font: '30px Courier', fill: '#ffffff'});
        }, this);
        optionsLabel.events.onInputDown.add(this.options, this);

        // Credits Label
        var creditsLabel = game.add.text(game.world.width / 2, game.world.height * 0.7, 'Credits', {font: '30px Courier', fill: '#ffffff'});
        creditsLabel.anchor.x = 0.5;
        creditsLabel.anchor.y = 0.5;
        creditsLabel.inputEnabled = true;
        creditsLabel.input.useHandCursor = true;
        creditsLabel.events.onInputOver.add(function(){
            creditsLabel.setStyle({font: 'bold 30px Courier', fill: '#ffff33'});
        }, this);
        creditsLabel.events.onInputOut.add(function(){
            creditsLabel.setStyle({font: '30px Courier', fill: '#ffffff'});
        }, this);
        creditsLabel.events.onInputDown.add(this.credits, this);

        // Control Label
        var controlLabel = game.add.text(game.world.width / 2, game.world.height * 0.9, 'Game Controls: Use the arrow keys', {font: '20px Courier', fill: '#ffffff'});
        controlLabel.anchor.x = 0.5;
        controlLabel.anchor.y = 0.5;

        // Version Label
        var versionLabel = game.add.text(game.world.width * 0.93, game.world.height * 0.98, 'Beta v0.00', {font: '20px Courier', fill: '#ffffff'});
        versionLabel.anchor.x = 0.5;
        versionLabel.anchor.y = 0.5;
    },

    start: function(){
        if (backgroundMusic != null) backgroundMusic.destroy();
        backgroundMusic = game.add.audio('game-bgm', 1, true);
        backgroundMusic.play();
        if (backgroundMusicMute) backgroundMusic.mute = true;
        game.state.start('transition');
    },

    levelSelection: function(){
        game.state.start('levelSelection');
    },

    options: function(){
        game.state.start('options');
    },

    credits: function(){
        game.state.start('credits');
    }
};