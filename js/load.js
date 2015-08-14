var loadState = {
    preload: function() {
        // loading label
        var loadingText = game.add.text(game.world.width / 2, game.world.height / 2, 'Loading...', {font: '30px Courier', fill: '#ffffff'});
        loadingText.anchor.x = 0.5;
        loadingText.anchor.y = 0.5;

        // image files
        game.load.image('box', 'assets/images/box.png');
        game.load.image('enemy', 'assets/images/enemy.png');
        game.load.image('white', 'assets/images/white.png');
        game.load.image('gray', 'assets/images/gray.png');
        game.load.image('start', 'assets/images/start.png');
        game.load.image('goal', 'assets/images/goal.png');
        game.load.image('block', 'assets/images/block.png');
        game.load.image('checkpoint', 'assets/images/checkpoint.png');

        // sound files
        game.load.audio('menu-bgm', 'assets/sounds/menu_bgm.mp3');
        game.load.audio('game-bgm', 'assets/sounds/game_bgm.mp3');
        game.load.audio('lose-sound', 'assets/sounds/lose.mp3');
        game.load.audio('win-sound', 'assets/sounds/win.wav');

        // stage file
        game.load.text('level1', 'level/1.json');
        game.load.text('level2', 'level/2.json');
        game.load.text('level3', 'level/3.json');
        game.load.text('level4', 'level/4.json');
        game.load.text('level5', 'level/5.json');
        game.load.text('level6', 'level/6.json');
        game.load.text('level7', 'level/7.json');
        game.load.text('level8', 'level/8.json');
        game.load.text('level9', 'level/9.json');
        game.load.text('level10', 'level/10.json');
        game.load.text('level11', 'level/11.json');
        game.load.text('level12', 'level/12.json');
        game.load.text('level13', 'level/13.json');
        game.load.text('level14', 'level/14.json');
        game.load.text('level15', 'level/15.json');
        game.load.text('level16', 'level/16.json');
    },

    create: function() {
        /********** Background Music **********/
        backgroundMusic = game.add.audio('menu-bgm', 1, true);
        if (backgroundMusicMute) backgroundMusic.mute = true;
        backgroundMusic.play();
        game.state.start('menu');
    }
};