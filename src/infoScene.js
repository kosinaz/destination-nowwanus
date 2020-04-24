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
   * @memberof InfoScene
   */
  create() {
    let opened = false;
    const info = new Button(this, 40, 40, 'sprites', 'info');
    info.on('click', () => {
      if (!opened) {
        window.visible = true;
        opened = true;
        this.tweens.add({
          duration: 150,
          targets: window,
          y: 328,
        });
      } else {
        opened = false;
        this.tweens.add({
          duration: 150,
          targets: window,
          y: 904,
          onComplete: () => {
            window.visible = false;
          },
        });
      }
    });
    const bg = this.add.image(0, 0, 'sprites', 'panel').setAlpha(0.99);
    const div1 = this.add.text(-496, -216,
        `  In 2026 New Horizons will fly by its second Kuiper Belt Object, ` +
`Nowwanus.

  You have to navigate through the asteroid fields using the asteroid ` +
`location 
predictions based on the space dust analytics of the VBSDC subsystem.

  You also have take valuable pictures of the asteroids with the Ralph
to keep us funded and let us invest in different research projects.

  Better ways to use the RTG will grant us more power to take pictures,
better image compression for the Ralph will give us bigger pictures,
and better analytics for the VBSDC will let us notice the asteroid earlier,
providing us more time to find a way through them.`, {
          fontSize: '16px',
          fontFamily: 'font2',
          color: 'lightgray',
          lineSpacing: 6,
        }).setOrigin(0);
    const div2 = this.add.text(0, 116,
        `Art by CraftPix and Zoltan Kosina
Fonts by Typodermic Fonts
Music by Eric Matyas www.soundimage.org`, {
          fontSize: '16px',
          fontFamily: 'font2',
          color: 'lightgray',
          align: 'center',
          lineSpacing: 18,
        }).setOrigin(0.5, 0);
    const newhorizons = this.add.image(0, 0, 'sprites', 'newhorizonstitle');
    const rtgline = this.add.line(0, 0, 0, 0, 25, -25, 0xffffff)
        .setOrigin(0);
    const rtgtext = this.add.text(28, -28, 'RTG', {
      fontSize: '16px',
      fontFamily: 'font',
    }).setOrigin(0, 1);
    const rtg = this.add.container(10, -70, [rtgline, rtgtext]);
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
    const illustration = this.add.container(330, -90, [
      newhorizons,
      rtg,
      ralph,
      vbsdc,
    ]);
    const window = this.add.container(512, 904, [bg, div1, div2, illustration]);
    window.visible = false;
  }
}
