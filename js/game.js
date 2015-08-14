var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gameDiv');

game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('transition', transitionState);
game.state.add('play', playState);
game.state.add('levelSelection', levelSelectionState);
game.state.add('options', optionsState);
game.state.add('credits', creditsState);
game.state.add('victory', victoryState);

game.state.start('load');

/********** Global Variables **********/

// Sounds related
var backgroundMusicMute = false;
var soundsEffectMute = false;
var backgroundMusic;
var soundsEffect;

// In-game related
var levelNo = 1;
var maxLevel = 1;
var deaths = 0;
var MAX_LEVEL = 16;