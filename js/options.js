var BackgroundMusicLabel;
var soundsEffectLabel;

var optionsState = {
    create: function() {

        /********* Background ********/
        game.stage.backgroundColor = '#000000';

        var titleLabel = game.add.text(game.world.width / 2, game.world.height / 5, 'Options', {font: '80px Courier', fill: '#ffffff'});
        titleLabel.anchor.x = 0.5;
        titleLabel.anchor.y = 0.5;

        // Background Music Label
        BackgroundMusicLabel = game.add.text(game.world.width / 2, game.world.height * 0.4, 'Background Music On', {font: '30px Courier', fill: '#ffffff'});
        BackgroundMusicLabel.anchor.x = 0.5;
        BackgroundMusicLabel.anchor.y = 0.5;
        BackgroundMusicLabel.inputEnabled = true;
        BackgroundMusicLabel.input.useHandCursor = true;
        BackgroundMusicLabel.events.onInputOver.add(function(){
            BackgroundMusicLabel.setStyle({font: 'bold 30px Courier', fill: '#ffff33'});
        }, this);
        BackgroundMusicLabel.events.onInputOut.add(function(){
            BackgroundMusicLabel.setStyle({font: '30px Courier', fill: '#ffffff'});
        }, this);
        BackgroundMusicLabel.events.onInputDown.add(this.toggleBackgroundMusic, this);

        if (backgroundMusicMute) BackgroundMusicLabel.setText('Background Music Off');

        // Sounds Effect Label
        soundsEffectLabel = game.add.text(game.world.width / 2, game.world.height * 0.5, 'Sounds Effect On', {font: '30px Courier', fill: '#ffffff'});
        soundsEffectLabel.anchor.x = 0.5;
        soundsEffectLabel.anchor.y = 0.5;
        soundsEffectLabel.inputEnabled = true;
        soundsEffectLabel.input.useHandCursor = true;
        soundsEffectLabel.events.onInputOver.add(function(){
            soundsEffectLabel.setStyle({font: 'bold 30px Courier', fill: '#ffff33'});
        }, this);
        soundsEffectLabel.events.onInputOut.add(function(){
            soundsEffectLabel.setStyle({font: '30px Courier', fill: '#ffffff'});
        }, this);
        soundsEffectLabel.events.onInputDown.add(this.toggleSoundsEffect, this);

        if (soundsEffectMute) soundsEffectLabel.setText('Sounds Effect Off');

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

    toggleBackgroundMusic: function(){
        if (backgroundMusicMute) BackgroundMusicLabel.setText('Background Music On');
        else BackgroundMusicLabel.setText('Background Music Off');
        backgroundMusicMute = !backgroundMusicMute;
        if (backgroundMusic != null) backgroundMusic.mute = backgroundMusicMute;
    },

    toggleSoundsEffect: function(){
        if (soundsEffectMute) soundsEffectLabel.setText('Sounds Effect On');
        else soundsEffectLabel.setText('Sounds Effect Off');
        soundsEffectMute = !soundsEffectMute;
        if (soundsEffect != null) soundsEffect.mute = soundsEffectMute;
    },

    menu: function() {
        game.state.start('menu');
    }
};