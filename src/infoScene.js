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

 You have to navigate through the asteroid fields using the asteroid location
predictions based on the space dust analytics of the VBSDC subsystem.

 You also have take valuable pictures of the asteroids with the Ralph 
to maintain our funding and allow us to invest in researches related 
to the operation of the probe.

 Better ways to use the RTG will grant us more power to take pictures, 
better image compression for the Ralph will give us bigger pictures,
better analytics for the VBSDC will make us notice the asteroids earlier,
providing us more time to find a way between them.`, {
          fontSize: '14px',
          fontFamily: 'font2',
          color: 'lightgray',
        }).setOrigin(0);
    this.add.text(512, 268,
        `Art

Free space shooter game GUI, Free space shooter game objects,` +
` 2d fantasy fairy free character sprite,
Free orc ogre and goblin chibi 2d game sprites by CraftPix` +
` and original content by Zoltan Kosina

Font

Ethnocentric, Recharge by Typodermic Fonts

Music

Endless Cyber Runner, Runaway Technology, 4.2 Light Years` +
` by Eric Matyas www.soundimage.org`, {
          fontSize: '14px',
          fontFamily: 'font2',
          color: 'lightgray',
          align: 'center',
        }).setOrigin(0.5, 0);
    const newhorizons = this.add.image(0, 0, 'sprites', 'newhorizonstitle');
    const rtgline = this.add.line(0, 0, 0, 0, 25, -25, 0xffffff)
        .setOrigin(0);
    const rtgtext = this.add.text(28, -28, 'RTG', {
      fontSize: '16px',
      fontFamily: 'font',
    }).setOrigin(0, 1);
    const rtg = this.add.container(15, -70, [rtgline, rtgtext]);
    const ralphline = this.add.line(0, 0, 0, 0, 25, -25, 0xffffff)
        .setOrigin(0);
    const ralphtext = this.add.text(28, -28, 'Ralph', {
      fontSize: '16px',
      fontFamily: 'font',
    }).setOrigin(0, 1);
    const ralph = this.add.container(55, 40, [ralphline, ralphtext]);
    const vbsdcline = this.add.line(0, 0, 0, 0, 25, 25, 0xffffff)
        .setOrigin(0);
    const vbsdctext = this.add.text(28, 28, 'VBSDC', {
      fontSize: '16px',
      fontFamily: 'font',
    }).setOrigin(0);
    const vbsdc = this.add.container(20, 70, [vbsdcline, vbsdctext]);
    this.add.container(780, 130, [newhorizons, rtg, ralph, vbsdc]);
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
