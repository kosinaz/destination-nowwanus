import Button from './button.js';

/**
 * Represent the pause modal of the level scene.
 *
 * @export
 * @class PauseScene
 * @extends {Phaser.Scene}
 */
export default class PauseScene extends Phaser.Scene {
  /**
   * Creates an instance of PauseScene.
   * @memberof PauseScene
   */
  constructor() {
    super('PauseScene');
  }

  /**
   * Creates the content of the PauseScene.
   *
   * @param {*} data
   * @memberof PauseScene
   */
  create(data) {
    const bg = this.add.graphics();
    bg.fillStyle(0x000000, 0.75);
    bg.fillRect(0, 0, 1024, 576);
    const windowbg = this.add.image(0, 0, 'sprites', 'pausewindow');
    const title = this.add.text(0, -24, 'pause', {
      fontSize: '16px',
      fontFamily: 'font',
    });
    title.setOrigin(0.5);
    const play = new Button(this, 24, 24, 'sprites', 'play');
    play.once('click', () => {
      this.tweens.add({
        targets: window,
        duration: 150,
        y: {
          from: 288,
          to: -48,
        },
        onComplete: () => {
          if (data.from === 'level') {
            this.scene.resume('LevelScene');
          } else if (data.from === 'instruction') {
            this.scene.resume('InstructionScene');
          }
          this.scene.stop();
        },
      });
    });
    const close = new Button(this, -24, 24, 'sprites', 'close');
    close.once('click', () => {
      this.cameras.main.fadeOut(300);
    });
    const window = this.add.container(512, 288, [windowbg, title, play, close]);
    this.tweens.add({
      targets: window,
      duration: 150,
      y: {
        from: -48,
        to: 288,
      },
    });
    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.stop('InstructionScene');
      this.scene.stop('LevelScene');
      this.scene.start('MenuScene', {
        level: data.level,
      });
    });
  }
}
