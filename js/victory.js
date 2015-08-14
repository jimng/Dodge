var victoryState = {
    create: function() {

        /********* Background ********/
        game.stage.backgroundColor = '#000000';

        /********* Text Label *********/

        // Title Label
        var titleLabel = game.add.text(game.world.width / 2, game.world.height * 0.2, 'Thanks for playing!', {font: '60px Courier', fill: '#ffffff'});
        titleLabel.anchor.x = 0.5;
        titleLabel.anchor.y = 0.5;

        // No of deaths label
        var deathLabel = game.add.text(game.world.width / 2, game.world.height * 0.4, 'No. of deaths: ' + deaths, {font: '20px Courier', fill: '#ffffff'});
        deathLabel.anchor.x = 0.5;
        deathLabel.anchor.y = 0.5;

        // archivement label
        var archivementLabel = game.add.text(game.world.width / 2, game.world.height * 0.5, this.archivement(deaths), {font: '40px Courier', fill: '#ffffff'});
        archivementLabel.anchor.x = 0.5;
        archivementLabel.anchor.y = 0.5;

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

    archivement: function(deaths){
        if (deaths >= 3000) return "How much time have you spent?";
        else if (deaths >= 1000) return "Poor!";
        else if (deaths >= 500) return "Average!";
        else if (deaths >= 250) return "Satisfactory!";
        else if (deaths >= 100) return "Good!";
        else if (deaths >= 30) return "Professional!";
        else if (deaths >= 10) return "Genius!";
        else return "You are cheating!";
    }
};