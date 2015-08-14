var creditsState = {
    create: function() {

        /********* Background ********/
        game.stage.backgroundColor = '#000000';
        
        var titleLabel = game.add.text(game.world.width / 2, game.world.height / 5, 'Credits', {font: '80px Courier', fill: '#ffffff'});
        titleLabel.anchor.x = 0.5;
        titleLabel.anchor.y = 0.5;

        // author label
        var authorLabel1 = game.add.text(game.world.width / 2, game.world.height * 0.34, 'Author', {font: '16px Courier', fill: '#ffffff'});
        authorLabel1.anchor.x = 0.5;
        authorLabel1.anchor.y = 0.5;
        var authorLabel2 = game.add.text(game.world.width / 2, game.world.height * 0.38, 'Jim Ng', {font: '25px Courier', fill: '#ffffff'});
        authorLabel2.anchor.x = 0.5;
        authorLabel2.anchor.y = 0.5;

        // game engine label
        var gameEngineLabel1 = game.add.text(game.world.width / 2, game.world.height * 0.46, 'Game Engine', {font: '16px Courier', fill: '#ffffff'});
        gameEngineLabel1.anchor.x = 0.5;
        gameEngineLabel1.anchor.y = 0.5;
        var gameEngineLabel2 = game.add.text(game.world.width / 2, game.world.height * 0.5, 'Phaser', {font: '25px Courier', fill: '#ffffff'});
        gameEngineLabel2.anchor.x = 0.5;
        gameEngineLabel2.anchor.y = 0.5;
        gameEngineLabel2.inputEnabled = true;
        gameEngineLabel2.input.useHandCursor = true;
        gameEngineLabel2.events.onInputOver.add(function(){
            gameEngineLabel2.setStyle({font: 'bold 25px Courier', fill: '#ffff33'});
        }, this);
        gameEngineLabel2.events.onInputOut.add(function(){
            gameEngineLabel2.setStyle({font: '25px Courier', fill: '#ffffff'});
        }, this);
        gameEngineLabel2.events.onInputDown.add(this.goToPhaser, this);

        // sounds source label
        var soundsSourceLabel1 = game.add.text(game.world.width / 2, game.world.height * 0.58, 'Source Of Background Music & Sound Effects', {font: '16px Courier', fill: '#ffffff'});
        soundsSourceLabel1.anchor.x = 0.5;
        soundsSourceLabel1.anchor.y = 0.5;
        var soundsSourceLabel2 = game.add.text(game.world.width / 2, game.world.height * 0.62, 'Purple Planet Music', {font: '25px Courier', fill: '#ffffff'});
        soundsSourceLabel2.anchor.x = 0.5;
        soundsSourceLabel2.anchor.y = 0.5;
        soundsSourceLabel2.inputEnabled = true;
        soundsSourceLabel2.input.useHandCursor = true;
        soundsSourceLabel2.events.onInputOver.add(function(){
            soundsSourceLabel2.setStyle({font: 'bold 25px Courier', fill: '#ffff33'});
        }, this);
        soundsSourceLabel2.events.onInputOut.add(function(){
            soundsSourceLabel2.setStyle({font: '25px Courier', fill: '#ffffff'});
        }, this);
        soundsSourceLabel2.events.onInputDown.add(this.goToPlanetRoyalty, this);
        var soundsSourceLabel3 = game.add.text(game.world.width / 2, game.world.height * 0.66, 'Freesound', {font: '25px Courier', fill: '#ffffff'});
        soundsSourceLabel3.anchor.x = 0.5;
        soundsSourceLabel3.anchor.y = 0.5;
        soundsSourceLabel3.inputEnabled = true;
        soundsSourceLabel3.input.useHandCursor = true;
        soundsSourceLabel3.events.onInputOver.add(function(){
            soundsSourceLabel3.setStyle({font: 'bold 25px Courier', fill: '#ffff33'});
        }, this);
        soundsSourceLabel3.events.onInputOut.add(function(){
            soundsSourceLabel3.setStyle({font: '25px Courier', fill: '#ffffff'});
        }, this);
        soundsSourceLabel3.events.onInputDown.add(this.goToFreeSound, this);

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

    goToPhaser: function(){
    	window.open("https://www.phaser.io", "_blank");
    },

    goToPlanetRoyalty: function(){
    	window.open("http://www.purple-planet.com", "_blank");
    },

    goToFreeSound: function(){
    	window.open("https://www.freesound.org", "_blank");
    }
};