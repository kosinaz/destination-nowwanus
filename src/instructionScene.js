import Button from './button.js';

/**
 * Represent the instruction screen of the game.
 *
 * @export
 * @class InstructionScene
 * @extends {Phaser.Scene}
 */
export default class InstructionScene extends Phaser.Scene {
  /**
   * Creates an instance of InstructionScene.
   * @memberof InstructionScene
   */
  constructor() {
    super('InstructionScene');
  }

  /**
   * Creates the content of the InstructionScene.
   *
   * @param {*} data
   * @memberof InstructionScene
   */
  create(data) {
    const bg = this.add.graphics();
    bg.fillStyle(0x000000, 0.75);
    bg.fillRect(0, 0, 1024, 576);
    const maskgraphics = this.make.graphics();
    maskgraphics.fillCircle(512, 288, 50);
    for (const asteroid of data.map.right) {
      maskgraphics.fillCircle(asteroid.x, asteroid.y, 50);
    }
    for (const asteroid of data.map.down) {
      maskgraphics.fillCircle(asteroid.x, asteroid.y, 50);
    }
    for (const asteroid of data.map.left) {
      maskgraphics.fillCircle(asteroid.x, asteroid.y, 50);
    }
    for (const asteroid of data.map.up) {
      maskgraphics.fillCircle(asteroid.x, asteroid.y, 50);
    }
    bg.mask = maskgraphics.createGeometryMask();
    bg.mask.setInvertAlpha();
    const linegraphics = this.add.graphics();
    linegraphics.lineStyle(3, 0xffffff);
    linegraphics.strokeLineShape(new Phaser.Geom.Line(430, 216, 480, 266));
    const newhorizons = this.add.text(430, 216, `control the new horizons
      with wasd or arrows`, {
      fontSize: '16px',
      fontFamily: 'font',
      align: 'right',
    });
    newhorizons.setOrigin(1);
    const asteroids = this.add.text(512, 384, 'evade the asteroids', {
      fontSize: '16px',
      fontFamily: 'font',
    });
    asteroids.setOrigin(0.5);
    const pause = this.add.image(984, 40, 'sprites', 'pause');
    pause.on('pointerdown', () => {
      this.scene.launch('PauseScene', {
        level: data.level,
        from: 'instruction',
      });
      this.scene.pause();
    });
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        pause.setInteractive();
        this.input.on('pointerup', () => {
          this.scene.resume('LevelScene');
          this.scene.stop();
        });
        this.input.keyboard.on('keyup', () => {
          this.scene.resume('LevelScene');
          this.scene.stop();
        });
      },
    });
  }
  /**
   *
   *
   * @memberof InstructionScene
   */
  update() {}
}
