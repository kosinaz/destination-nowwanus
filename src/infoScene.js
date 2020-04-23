import Button from './button.js';

/**
 * Represent the description and credits scene.
 *
 * @export
 * @class InfoScene
 * @extends {Phaser.Scene}
 */
export default class InfoScene extends Phaser.Scene {
  /**
   * Creates an instance of InfoScene.
   * @memberof InfoScene
   */
  constructor() {
    super('InfoScene');
  }

  /**
   * Creates the content of the InfoScene.
   *
   * @param {*} data
   * @memberof InfoScene
   */
  create(data) {
    this.cameras.main.fadeIn(300);
    const bg = this.add.image(512, 288, 'bg');
    bg.setDepth(-3);
    bg.setAlpha(0.10);
    this.add.text(16, 16,
        ` In 2026 New Horizons will fly by its second Kuiper Belt Object,
860626 Nowwanus, provisional designation KBO 2021 KD19.

 Your job is to navigate through the asteroid fields of the Kuiper Belt 
using the asteroid location predictions based on the dust analytics 
of the VBSDC subsystem.

 You also need take valuable pictures of the asteroids with the Ralph 
to maintain our funding and allow us to invest in researches related 
to the operation of the probe.

 Better ways to use the RTG will grant us more power to take pictures, 
better image compression for the Ralph will give us bigger pictures,
better analytics for the VBSDC will make us notice the asteroids earlier,
providing us more time to find a way between them.


    Art: Free space shooter game GUI, Free space shooter game objects,
    2d fantasy fairy free character sprite, Free orc ogre and goblin chibi 
    2d game sprites by CraftPix and original content by Zoltan Kosina

    Fonts: Ethnocentric and Recharge by Typodermic Fonts

    Music: Endless Cyber Runner, Runaway Technology, 4.2 Light Years 
    by Eric Matyas www.soundimage.org

`, {
          fontSize: '16px',
          fontFamily: 'font2',
          color: 'gray',
        }).setOrigin(0);
    this.add.image(820, 155, 'sprites', 'newhorizonstitle');
    this.add.line(0, 0, 835, 85, 885, 35, 0xffffff).setOrigin(0);
    this.add.text(888, 32, 'RTG', {
      fontSize: '16px',
      fontFamily: 'font',
    }).setOrigin(0, 1);
    this.add.line(0, 0, 875, 195, 925, 145, 0xffffff).setOrigin(0);
    this.add.text(928, 142, 'Ralph', {
      fontSize: '16px',
      fontFamily: 'font',
    }).setOrigin(0, 1);
    this.add.line(0, 0, 840, 225, 890, 275, 0xffffff).setOrigin(0);
    this.add.text(893, 278, 'VBSDC', {
      fontSize: '16px',
      fontFamily: 'font',
    }).setOrigin(0);
    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.start('MenuScene', data);
    });
    const play = new Button(this, 512, 528, 'sprites', 'playon');
    play.once('click', () => {
      play.disableInteractive();
      this.cameras.main.fadeOut(300);
    });
  }
}
