import LoadScene from './loadScene.js';
import TitleScene from './titleScene.js';
import MenuScene from './menuScene.js';
import LevelScene from './levelScene.js';
import PauseScene from './pauseScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  backgroundColor: '#000',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scale: {
    parent: 'game-container',
    mode: Phaser.Scale.FIT,
    width: 1024,
    height: 576,
  },
  scene: [
    LoadScene,
    TitleScene,
    MenuScene,
    LevelScene,
    PauseScene,
  ],
});
