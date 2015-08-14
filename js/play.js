var player;
var cursors;
var enemies;
var stage;
var blocks;
var goals;
var checkpoints;
var w;
var h;
var xmin;
var xmax;
var ymin;
var ymax;
var startTime; // in second
var spawnPos;
var winTheLevel;

var levelText;
var deathText;
var BackgroundMusicLabel;
var soundsEffectLabel;

var playState = {
    create: function() {
        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        /********* Background ********/
        game.stage.backgroundColor = '#400340';

        /********* Right-side bar *********/
        levelText = game.add.text(780, 50, 'Level ' + levelNo, {font: '20px Courier', fill: '#ffffff'});
        deathText = game.add.text(780, 100, 'Deaths: ' + deaths, {font: '20px Courier', fill: '#ffffff'});
        // Background Music Label
        game.add.text(780, 200, 'Background Music', {font: '20px Courier', fill: '#ffffff'});
        BackgroundMusicLabel = game.add.text(780, 230, 'On', {font: '30px Courier', fill: '#ffffff'});
        BackgroundMusicLabel.inputEnabled = true;
        BackgroundMusicLabel.input.useHandCursor = true;
        BackgroundMusicLabel.events.onInputOver.add(function(){
            BackgroundMusicLabel.setStyle({font: 'bold 30px Courier', fill: '#ffff33'});
        }, this);
        BackgroundMusicLabel.events.onInputOut.add(function(){
            BackgroundMusicLabel.setStyle({font: '30px Courier', fill: '#ffffff'});
        }, this);
        BackgroundMusicLabel.events.onInputDown.add(this.toggleBackgroundMusic, this);
        if (backgroundMusicMute) BackgroundMusicLabel.setText('Off');

        // Sounds Effect Label
        game.add.text(780, 300, 'Sounds Effect', {font: '20px Courier', fill: '#ffffff'});
        soundsEffectLabel = game.add.text(780, 330, 'On', {font: '30px Courier', fill: '#ffffff'});
        soundsEffectLabel.inputEnabled = true;
        soundsEffectLabel.input.useHandCursor = true;
        soundsEffectLabel.events.onInputOver.add(function(){
            soundsEffectLabel.setStyle({font: 'bold 30px Courier', fill: '#ffff33'});
        }, this);
        soundsEffectLabel.events.onInputOut.add(function(){
            soundsEffectLabel.setStyle({font: '30px Courier', fill: '#ffffff'});
        }, this);
        soundsEffectLabel.events.onInputDown.add(this.toggleSoundsEffect, this);
        if (soundsEffectMute) soundsEffectLabel.setText('Off');

        // Choose Level Label
        var chooseLevelLabel = game.add.text(780, 450, 'Choose Level', {font: '20px Courier', fill: '#ffffff'});
        chooseLevelLabel.inputEnabled = true;
        chooseLevelLabel.input.useHandCursor = true;
        chooseLevelLabel.events.onInputOver.add(function(label){
            label.setStyle({font: 'bold 20px Courier', fill: '#ffff33'});
        }, this);
        chooseLevelLabel.events.onInputOut.add(function(label){
            label.setStyle({font: '20px Courier', fill: '#ffffff'});
        }, this);
        chooseLevelLabel.events.onInputDown.add(this.levelSelection, this);

        // Return Label
        var returnLabel = game.add.text(780, 500, 'Main Menu', {font: '20px Courier', fill: '#ffffff'});
        returnLabel.inputEnabled = true;
        returnLabel.input.useHandCursor = true;
        returnLabel.events.onInputOver.add(function(label){
            label.setStyle({font: 'bold 20px Courier', fill: '#ffff33'});
        }, this);
        returnLabel.events.onInputOut.add(function(label){
            label.setStyle({font: '20px Courier', fill: '#ffffff'});
        }, this);
        returnLabel.events.onInputDown.add(this.menu, this);

        /********* Load Level ********/
        // Load Level From JSON
        var level = JSON.parse(game.cache.getText('level' + levelNo));

        /********* Stage ********/
        stage = game.add.group();
        blocks = game.add.group();
        goals = game.add.group();
        checkpoints = game.add.group();
        blocks.enableBody = true;
        goals.enableBody = true;
        checkpoints.enableBody = true;
        // Place Grid
        w = level.map.w;
        h = level.map.h;
        xmin = Math.floor((25 - w) / 2);
        ymin = Math.floor((20 - h) / 2);
        xmax = xmin + w - 1;
        ymax = ymin + h - 1;
        var grid = level.map.grid;
        for (var y = ymin; y <= ymax; y++){
            for (var x = xmin; x <= xmax; x++){
                var placeType;
                var element = grid[(y - ymin) * w + (x - xmin)];
                if (element == '.'){
                    if ((x + y) % 2 == 0) placeType = 'white';
                    else placeType = 'gray';
                }else if (element == '#') placeType = 'block';
                else if (element == 'S') placeType = 'start';
                else if (element == 'I') placeType = 'checkpoint';
                else if (element == 'G') placeType = 'goal';
                var sprite = stage.create(x * 30, y * 30, placeType);
                if (placeType == 'block' || placeType == 'outside'){
                    blocks.add(sprite, false);
                    sprite.body.immovable = true;
                }
                else if (placeType == 'goal') goals.add(sprite, false);
                else if (placeType == 'checkpoint') checkpoints.add(sprite, false);
            }
        }
        
        /********* Player ********/
        // The player and its settings
        spawnPos = this.gridToReal(level.spawn.x, level.spawn.y);
        player = game.add.sprite(spawnPos.x, spawnPos.y, 'box');
        player.anchor.setTo(0.5, 0.5);
        //  We need to enable physics on the player
        game.physics.arcade.enable(player);
        //  Player physics properties, cannot out of bound
        player.body.collideWorldBounds = true;
        
        /********* Enemies ********/
        enemies = game.add.group();
        //  We will enable physics for any star that is created in this group
        enemies.enableBody = true;
        var numOfEnemies = level.enemy.length;
        for (var i = 0; i < numOfEnemies; i++){
            var enemyEntry = level.enemy[i];
            if (enemyEntry.type == 'seq'){
                var path = enemyEntry.path;
                var threshold = [];
                // 1-based to 0-based
                for (var j = 0; j < path.length; j++){
                    var initPos = this.gridToReal(path[j].x, path[j].y);
                    if (enemyEntry.path[j].hasOwnProperty('speed')) path[j].speed = enemyEntry.path[j].speed;
                    if (enemyEntry.path[j].hasOwnProperty('duration')) path[j].duration = enemyEntry.path[j].duration;
                    path[j].x = initPos.x;
                    path[j].y = initPos.y;
                }
                threshold[0] = 0;
                for (var j = 0; j < path.length; j++){
                	var deltaX = path[(j + 1) % path.length].x - path[j].x;
                    var deltaY = path[(j + 1) % path.length].y - path[j].y;
                    var nextDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    if (path[j].hasOwnProperty('speed')) threshold[j + 1] = threshold[j] + nextDistance / path[j].speed;
                    else if (path[j].hasOwnProperty('duration')) threshold[j + 1] = threshold[j] + path[j].duration;
                    else threshold[j + 1] = threshold[j] + nextDistance / enemyEntry.speed;
                }
                var enemy = enemies.create(path[0].x, path[0].y, 'enemy');
                enemy.type = 'seq';
                enemy.path = path;
                enemy.state = 0;
                enemy.threshold = threshold;
                enemy.speed = enemyEntry.speed;
                enemy.anchor.setTo(0.5, 0.5);
            }else if (enemyEntry.type == 'func'){
                var xfunc = new Function("t", enemyEntry.xfunc);
                var yfunc = new Function("t", enemyEntry.yfunc);
                var InitPos = this.gridToReal(xfunc(0), yfunc(0));
                var enemy = enemies.create(InitPos.x, InitPos.y, 'enemy');
                enemy.type = 'func';
                enemy.xfunc = xfunc;
                enemy.yfunc = yfunc;
                enemy.anchor.setTo(0.5, 0.5);
            }else if (enemyEntry.type == 'stat'){
                var pos = this.gridToReal(enemyEntry.pos.x, enemyEntry.pos.y);
                var enemy = enemies.create(pos.x, pos.y, 'enemy');
                enemy.type = 'stat';
                enemy.anchor.setTo(0.5, 0.5);
            }
        }
         
        //  Our controls
        cursors = game.input.keyboard.createCursorKeys();

        // Record start time
        startTime = Date.now();

        // To ensure only win once
        winTheLevel = false;
    },

    update: function() {
        //  Collide the player and the block
        game.physics.arcade.collide(player, blocks);
        
        //  Collide the player and the enemies
        game.physics.arcade.overlap(player, enemies, this.lose, null, this);

        //  Collide the player and the goals
        game.physics.arcade.overlap(player, goals, this.win, null, this);

        //  Collide the player and the checkpoints
        game.physics.arcade.overlap(player, checkpoints, this.save, null, this);

        /********* Player movement ********/
        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        if (cursors.left.isDown){
            player.body.velocity.x -= 150;
        }if (cursors.right.isDown){
            player.body.velocity.x += 150;
        }if (cursors.down.isDown){
            player.body.velocity.y += 150;
        }if (cursors.up.isDown){
            player.body.velocity.y -= 150;
        }

        /********* Enemies movement ********/
        var timeElapsed = (Date.now() - startTime) / 1000;
        enemies.forEach(function(enemy){
            // coordinate sequence based
            if (enemy.type == 'seq'){
                timePoint = timeElapsed % enemy.threshold[enemy.path.length];
                if (timePoint < enemy.threshold[enemy.state]){
                	enemy.state = 0;
                }
                if (timePoint > enemy.threshold[enemy.state + 1]){
                    enemy.state = enemy.state + 1;
                }
                var orix = enemy.path[enemy.state].x;
                var oriy = enemy.path[enemy.state].y;
                var newx = enemy.path[(enemy.state + 1) % enemy.path.length].x;
                var newy = enemy.path[(enemy.state + 1) % enemy.path.length].y;
                var timeFraction = (timePoint - enemy.threshold[enemy.state]) / (enemy.threshold[enemy.state + 1] - enemy.threshold[enemy.state]);
                enemy.x = orix + (newx - orix) * timeFraction;
                enemy.y = oriy + (newy - oriy) * timeFraction;
            }
            // time function based
            else if (enemy.type == 'func'){
                var newPos = this.gridToReal(enemy.xfunc(timeElapsed), enemy.yfunc(timeElapsed));
                enemy.x = newPos.x;
                enemy.y = newPos.y;
            }
        }, this);
    },

    lose: function() {
        if (soundsEffect != null) soundsEffect.destroy();
        soundsEffect = game.add.audio('lose-sound');
        if (!soundsEffectMute) soundsEffect.play();

        player.x = spawnPos.x;
        player.y = spawnPos.y;
        deaths++;
        deathText.setText('Deaths: ' + deaths);
        
    },

    win: function() {
        if (!winTheLevel){
            winTheLevel = true;
            if (soundsEffect != null) soundsEffect.destroy();
            soundsEffect = game.add.audio('win-sound');
            if (!soundsEffectMute) soundsEffect.play();
            levelNo++;
            if (levelNo > MAX_LEVEL) this.victory();
            else{
                if (levelNo > maxLevel) maxLevel = levelNo;
                game.state.start('transition');
            }
        }
    },

    save: function(player, checkpoint) {
        spawnPos.x = checkpoint.x + 15;
        spawnPos.y = checkpoint.y + 15;
    },

    toggleBackgroundMusic: function(){
        if (backgroundMusicMute) BackgroundMusicLabel.setText('On');
        else BackgroundMusicLabel.setText('Off');
        backgroundMusicMute = !backgroundMusicMute;
        if (backgroundMusic != null) backgroundMusic.mute = backgroundMusicMute;
    },

    toggleSoundsEffect: function(){
        if (soundsEffectMute) soundsEffectLabel.setText('On');
        else soundsEffectLabel.setText('Off');
        soundsEffectMute = !soundsEffectMute;
        if (soundsEffect != null) soundsEffect.mute = soundsEffectMute;
    },

    levelSelection: function(){
        if (backgroundMusic != null) backgroundMusic.destroy();
        backgroundMusic = game.add.audio('menu-bgm', 1, true);
        backgroundMusic.play();
        if (backgroundMusicMute) backgroundMusic.mute = true;
        game.state.start('levelSelection');
    },

    menu: function() {
        if (backgroundMusic != null) backgroundMusic.destroy();
        backgroundMusic = game.add.audio('menu-bgm', 1, true);
        backgroundMusic.play();
        if (backgroundMusicMute) backgroundMusic.mute = true;
        game.state.start('menu');
    },

    victory: function() {
        if (backgroundMusic != null) backgroundMusic.destroy();
        backgroundMusic = game.add.audio('menu-bgm', 1, true);
        backgroundMusic.play();
        if (backgroundMusicMute) backgroundMusic.mute = true;
        game.state.start('victory');
    },

    gridToReal: function(x, y){
        var ret = {};
        ret.x = (x + xmin - 1) * 30 + 15;
        ret.y = (y + ymin - 1) * 30 + 15;
        return ret;
    }
};