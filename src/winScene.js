/**
 * Represent the victory cutscene.
 *
 * @export
 * @class WinScene
 * @extends {Phaser.Scene}
 */
export default class WinScene extends Phaser.Scene {
  /**
   * Creates an instance of WinScene.
   * @memberof WinScene
   */
  constructor() {
    super('WinScene');
  }

  /**
   * Creates the content of the WinScene.
   *
   * @param {*} data
   * @memberof WinScene
   */
  create(data) {
    this.cameras.main.fadeIn(3000);
    const bg = this.add.image(512, 288, 'bg');
    bg.setDepth(-3);
    this.add.image(490, 262, 'sprites', 'newhorizons');
    const nowwanus = this.physics.add.image(1200, 262, 'sprites', 'nowwanus');
    nowwanus.setVelocityX(-25);
    this.time.addEvent({
      delay: 15000,
      callback: () => {
        this.cameras.main.fadeOut(3000, 255, 255, 255);
      },
    });
    const offscreen = new Phaser.Geom.Rectangle(1024, 0, 1, 576);
    const onscreen = new Phaser.Geom.Rectangle(0, 0, 1025, 576);
    const dustGraphics = this.make.graphics();
    dustGraphics.fillStyle(0xffffff);
    dustGraphics.fillPoint(0, 0, 4);
    dustGraphics.generateTexture('dust', 4, 4);
    this.add.particles('dust', [{
      emitZone: {
        source: offscreen,
      },
      deathZone: {
        source: onscreen,
        type: 'onLeave',
      },
      frequency: 250,
      speedX: {
        min: -20,
        max: -100,
      },
      lifespan: 15000,
    }]);
    this.add.text(16, 16, `in 2026 nasa\'s new horizons probe

made the most distant flyby in space history`, {
      fontSize: '16px',
      fontFamily: 'font',
    }).setOrigin(0);
    const mid = this.add.text(16, 116, `after a dramatic 20-year long journey

new horizons reached it's marvelous destination: 

nowwanus`, {
      fontSize: '16px',
      fontFamily: 'font',
    }).setOrigin(0).setAlpha(0);
    this.tweens.add({
      delay: 5000,
      targets: mid,
      alpha: 1,
      duration: 1000,
    });
    const bottom = this.add.text(16, 468, `but this is still not the end,

beyond the outer edge of the kuiper belt,

the next destination awaits...`, {
      fontSize: '16px',
      fontFamily: 'font',
    }).setOrigin(0).setAlpha(0);
    this.tweens.add({
      delay: 10000,
      targets: bottom,
      alpha: 1,
      duration: 1000,
    });
    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.start('MenuScene', data);
    });
  }
}
