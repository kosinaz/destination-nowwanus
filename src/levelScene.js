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
      this.physics.add.image(546, 262, 'sprites', 'newhorizons');
    newhorizons.body.setCircle(16, 8, 10);
    newhorizons.setOrigin(0);
    const leftasteroids = this.physics.add.group({
      collideWorldBounds: true,
      customBoundsRectangle: new Phaser.Geom.Rectangle(-100, 0, 10000, 576),
      immovable: true,
    });
    this.physics.add.overlap(newhorizons, leftasteroids, () => {
      this.scene.restart();
    });
    const up = this.add.image(0, -72, 'sprites', 'upon');
    up.setInteractive();
    up.on('pointerdown', () => {
      newhorizons.setVelocity(0, -100);
    });
    up.on('pointerover', () => {
      if (this.input.activePointer.isDown) {
        newhorizons.setVelocity(0, -100);
      }
    });
    up.on('pointerout', () => {
      newhorizons.setVelocity(0);
    });
    this.input.keyboard.on('keydown-UP', () => {
      newhorizons.setVelocity(0, -100);
    });
    this.input.keyboard.on('keyup-UP', () => {
      newhorizons.setVelocityY(0);
    });
    const down = this.add.image(0, 72, 'sprites', 'downon');
    down.setInteractive();
    down.on('pointerdown', () => {
      newhorizons.setVelocity(0, 100);
    });
    down.on('pointerover', () => {
      if (this.input.activePointer.isDown) {
        newhorizons.setVelocity(0, 100);
      }
    });
    down.on('pointerout', () => {
      newhorizons.setVelocity(0);
    });
    this.input.keyboard.on('keydown-DOWN', () => {
      newhorizons.setVelocity(0, 100);
    });
    this.input.keyboard.on('keyup-DOWN', () => {
      newhorizons.setVelocityY(0);
    });
    const left = this.add.image(-72, 0, 'sprites', 'lefton');
    left.setInteractive();
    left.on('pointerdown', () => {
      newhorizons.setVelocity(-100, 0);
    });
    left.on('pointerover', () => {
      if (this.input.activePointer.isDown) {
        newhorizons.setVelocity(-100, 0);
      }
    });
    left.on('pointerout', () => {
      newhorizons.setVelocity(0);
    });
    this.input.keyboard.on('keydown-LEFT', () => {
      newhorizons.setVelocity(-100, 0);
    });
    this.input.keyboard.on('keyup-LEFT', () => {
      newhorizons.setVelocityX(0);
    });
    const right = this.add.image(72, 0, 'sprites', 'righton');
    right.setInteractive();
    right.on('pointerdown', () => {
      newhorizons.setVelocity(100, 0);
    });
    right.on('pointerover', () => {
      if (this.input.activePointer.isDown) {
        newhorizons.setVelocity(100, 0);
      }
    });
    right.on('pointerout', () => {
      newhorizons.setVelocity(0);
    });
    this.input.keyboard.on('keydown-RIGHT', () => {
      newhorizons.setVelocity(100, 0);
    });
    this.input.keyboard.on('keyup-RIGHT', () => {
      newhorizons.setVelocityX(0);
    });
    this.input.on('pointerup', () => {
      newhorizons.setVelocity(0);
    });
    this.add.container(896, 448, [up, down, left, right]);
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.addasteroid(leftasteroids);
        this.addasteroid(leftasteroids);
        this.addasteroid(leftasteroids);
      },
      loop: true,
    });
  }

  /**
   *
   *
   * @param {*} leftasteroids
   * @memberof LevelScene
   */
  addasteroid(leftasteroids) {
    const i = 96 * ~~(Math.random() * 5 + 1);
    const asteroid = this.physics.add.image(1152, i, 'sprites', 'asteroidleft');
    leftasteroids.add(asteroid);
    asteroid.body.setCircle(32, 0, 0);
    this.tweens.add({
      targets: asteroid,
      x: -96,
      duration: 13000,
    });
  }
}
