import Button from './button.js';

/**
 * Represent the title screen of the game.
 *
 * @export
 * @class TitleScene
 * @extends {Phaser.Scene}
 */
export default class TitleScene extends Phaser.Scene {
  /**
   * Creates an instance of TitleScene.
   * @memberof TitleScene
   */
  constructor() {
    super('TitleScene');
  }

  /**
   * Creates the content of the TitleScene.
   *
   * @memberof TitleScene
   */
  create() {
    this.cameras.main.fadeIn(100);
    const bg = this.add.image(512, 288, 'bg');
    bg.setDisplaySize(1024, 576);
    this.add.image(512, 192, 'sprites', 'title');
    const play = new Button(this, 512, 464, 'sprites', 'playon');
    play.once('click', () => {
      play.disableInteractive();
      this.cameras.main.fadeOut(300);
    });
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('MenuScene', {
        level: 0,
      });
    });
  }
}
