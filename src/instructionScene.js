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
    maskgraphics.fillCircle(70, 506, 70);
    maskgraphics.fillCircle(0, 0, 200);
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
    this.add.line(0, 0, 430, 216, 472, 258, 0xffffff).setOrigin(0);
    const newhorizons = this.add.text(430, 166, `Control the New Horizons
with WASD or arrows
to evade the asteroids`, {
      fontSize: '20px',
      fontFamily: 'font2',
      align: 'center',
      lineSpacing: 8,
    });
    newhorizons.setOrigin(0.5);
    this.add.line(0, 0, 75, 185, 165, 275, 0xffffff).setOrigin(0);
    this.add.line(0, 0, 98, 442, 165, 375, 0xffffff).setOrigin(0);
    const photos = this.add.text(165, 325, `Take photos
with Space or Enter
for science and stars`, {
      fontSize: '20px',
      fontFamily: 'font2',
      align: 'center',
      lineSpacing: 8,
    });
    photos.setOrigin(0.5);
    const pause = this.add.image(984, 40, 'sprites', 'pause');
    pause.on('pointerdown', () => {
      this.scene.launch('PauseScene', {
        level: data.level,
        from: 'instruction',
      });
      this.scene.pause();
    });
    this.time.addEvent({
      delay: 300,
      callback: () => {
        pause.setInteractive();
        this.input.on('pointerup', () => {
          this.scene.resume('LevelScene');
          this.scene.stop();
        });
        this.input.keyboard.on('keyup', (event) => {
          event.preventDefault();
          this.scene.resume('LevelScene');
          this.scene.stop();
        });
      },
    });
  }
}
