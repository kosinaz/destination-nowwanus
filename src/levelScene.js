import Button from './button.js';

/**
 * Represent the home screen of the game.
 *
 * @export
 * @class LevelScene
 * @extends {Phaser.Scene}
 */
export default class LevelScene extends Phaser.Scene {
  /**
   * Creates an instance of LevelScene.
   * @memberof LevelScene
   */
  constructor() {
    super('LevelScene');
  }

  /**
   * Creates the content of the LevelScene.
   *
   * @param {*} data
   * @memberof LevelScene
   */
  create(data) {
    console.log('level scene started');
    const bg = this.add.image(512, 288, 'bg');
    bg.setDisplaySize(1024, 576);
    this.events.on('transitionstart', () => {
      this.tweens.add({
        targets: bg,
        ease: 'Back',
        duration: 500,
        displayWidth: 1920,
        displayHeight: 1080,
      });
    });
    const offscreen = new Phaser.Geom.Rectangle(1024, 0, 1, 576);
    const onscreen = new Phaser.Geom.Rectangle(0, 0, 1025, 576);
    const dustGraphics = this.make.graphics({
      x: 0,
      y: 0,
      add: false,
    });
    dustGraphics.fillStyle(0xffffff);
    dustGraphics.fillPoint(0, 0, 2);
    dustGraphics.generateTexture('dust', 2, 2);
    this.add.particles('dust', [
      {
        emitZone: {
          source: offscreen,
        },
        deathZone: {
          source: onscreen,
          type: 'onLeave',
        },
        frequency: 25,
        speedX: {
          min: -200,
          max: -1000,
        },
        lifespan: 5000,
      },
    ]);
    const pause = new Button(this, 984, 40, 'sprites', 'pause');
    pause.on('click', () => {
      this.scene.launch('PauseScene', {
        level: data.level,
      });
      this.scene.pause();
    });
    const newhorizons =
      this.physics.add.image(512, 288, 'sprites', 'newhorizons');
    newhorizons.setCollideWorldBounds(true);
    newhorizons.body.immovable = true;
    const leftasteroids = this.physics.add.group({
      key: 'sprites',
      frame: 'asteroidleft',
      collideWorldBounds: true,
      customBoundsRectangle: new Phaser.Geom.Rectangle(-100, 0, 10000, 576),
      repeat: 6,
      setXY: {
        x: 1200,
        y: 288,
        stepX: 400,
      },
      allowGravity: false,
      velocityX: -200,
    });
    let y = 0;
    leftasteroids.getChildren().forEach((asteroid) => {
      asteroid.body.onWorldBounds = true;
      // eslint-disable-next-line new-cap
      y = Phaser.Math.Clamp(y + Phaser.Math.Between(-2, 2), -2, 2);
      asteroid.y += y * 96;
    });
    this.physics.add.overlap(newhorizons, leftasteroids, () => {
      this.scene.restart();
    });
    const up = new Button(this, 0, -72, 'sprites', 'upon');
    up.on('pointerdown', () => {
      buttons.each((button) => button.disableInteractive());
      this.tweens.add({
        targets: newhorizons,
        y: '-=96',
        duration: 400,
        ease: 'Sine.easeInOut',
        onComplete: () => {
          buttons.each((button) => button.setInteractive());
        },
      });
    });
    const down = new Button(this, 0, 72, 'sprites', 'downon');
    down.on('pointerdown', () => {
      buttons.each((button) => button.disableInteractive());
      this.tweens.add({
        targets: newhorizons,
        y: '+=96',
        duration: 400,
        ease: 'Sine.easeInOut',
        onComplete: () => {
          buttons.each((button) => button.setInteractive());
        },
      });
    });
    const left = new Button(this, -72, 0, 'sprites', 'lefton');
    left.on('pointerdown', () => {
      buttons.each((button) => button.disableInteractive());
      this.tweens.add({
        targets: newhorizons,
        x: '-=96',
        duration: 400,
        ease: 'Sine.easeInOut',
        onComplete: () => {
          buttons.each((button) => button.setInteractive());
        },
      });
    });
    const right = new Button(this, 72, 0, 'sprites', 'righton');
    right.on('pointerdown', () => {
      buttons.each((button) => button.disableInteractive());
      this.tweens.add({
        targets: newhorizons,
        x: '+=96',
        duration: 400,
        ease: 'Sine.easeInOut',
        onComplete: () => {
          buttons.each((button) => button.setInteractive());
        },
      });
    });
    const buttons = this.add.container(896, 448, [up, down, left, right]);
  }
}
