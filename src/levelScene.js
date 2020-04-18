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
    newhorizons.body.immovable = true;
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
    const orders = [];
    const up = new Button(this, 0, -72, 'sprites', 'upon');
    up.on('pointerdown', () => {
      orders.push(0);
    });
    const down = new Button(this, 0, 72, 'sprites', 'downon');
    down.on('pointerdown', () => {
      orders.push(2);
    });
    const left = new Button(this, -72, 0, 'sprites', 'lefton');
    left.on('pointerdown', () => {
      orders.push(1);
    });
    const right = new Button(this, 72, 0, 'sprites', 'righton');
    right.on('pointerdown', () => {
      orders.push(3);
    });
    this.add.container(896, 448, [up, down, left, right]);
    this.move(newhorizons, orders, leftasteroids);
  }
  /**
   *
   *
   * @param {*} newhorizons
   * @param {*} orders
   * @param {*} leftasteroids
   * @memberof LevelScene
   */
  move(newhorizons, orders, leftasteroids) {
    const order = orders.shift();
    const x = ['+=0', '-=96', '+=0', '+=96'][order] || '+=0';
    const y = ['-=96', '+=0', '+=96', '+=0'][order] || '+=0';
    this.tweens.add({
      targets: newhorizons,
      x: x,
      y: y,
      onComplete: () => {
        this.move(newhorizons, orders, leftasteroids);
      },
    });
    const i = 96 * ~~(Math.random() * 5 + 1);
    const asteroid = this.physics.add.image(1152, i, 'sprites', 'asteroidleft');
    leftasteroids.add(asteroid);
    asteroid.body.setCircle(16, 16, 16);
    this.tweens.add({
      targets: asteroid,
      x: -96,
      duration: 13000,
      onComplete: () => {
      },
    });
  }
}
