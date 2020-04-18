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
    const levels = this.cache.json.get('levels');
    const bg = this.add.image(512, 288, 'bg');
    bg.setDepth(-2);
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
    newhorizons.setCollideWorldBounds(true);
    const asteroids = this.physics.add.group({
      collideWorldBounds: true,
      customBoundsRectangle: new Phaser.Geom.Rectangle(-300, -300, 1600, 1100),
      immovable: true,
    });
    this.physics.world.on('worldbounds', (body) => {
      body.gameObject.destroy();
    });
    this.physics.add.overlap(newhorizons, asteroids, () => {
      this.scene.restart();
    });
    newhorizons.speed = 200;
    const up = this.add.image(0, -72, 'sprites', 'upon');
    up.setInteractive();
    up.on('pointerdown', () => {
      newhorizons.setVelocity(0, -newhorizons.speed);
    });
    up.on('pointerover', () => {
      if (this.input.activePointer.isDown) {
        newhorizons.setVelocity(0, -newhorizons.speed);
      }
    });
    up.on('pointerout', () => {
      newhorizons.setVelocity(0);
    });
    this.input.keyboard.on('keydown-UP', () => {
      newhorizons.setVelocity(0, -newhorizons.speed);
    });
    this.input.keyboard.on('keyup-UP', () => {
      newhorizons.setVelocityY(0);
    });
    const down = this.add.image(0, 72, 'sprites', 'downon');
    down.setInteractive();
    down.on('pointerdown', () => {
      newhorizons.setVelocity(0, newhorizons.speed);
    });
    down.on('pointerover', () => {
      if (this.input.activePointer.isDown) {
        newhorizons.setVelocity(0, newhorizons.speed);
      }
    });
    down.on('pointerout', () => {
      newhorizons.setVelocity(0);
    });
    this.input.keyboard.on('keydown-DOWN', () => {
      newhorizons.setVelocity(0, newhorizons.speed);
    });
    this.input.keyboard.on('keyup-DOWN', () => {
      newhorizons.setVelocityY(0);
    });
    const left = this.add.image(-72, 0, 'sprites', 'lefton');
    left.setInteractive();
    left.on('pointerdown', () => {
      newhorizons.setVelocity(-newhorizons.speed, 0);
    });
    left.on('pointerover', () => {
      if (this.input.activePointer.isDown) {
        newhorizons.setVelocity(-newhorizons.speed, 0);
      }
    });
    left.on('pointerout', () => {
      newhorizons.setVelocity(0);
    });
    this.input.keyboard.on('keydown-LEFT', () => {
      newhorizons.setVelocity(-newhorizons.speed, 0);
    });
    this.input.keyboard.on('keyup-LEFT', () => {
      newhorizons.setVelocityX(0);
    });
    const right = this.add.image(72, 0, 'sprites', 'righton');
    right.setInteractive();
    right.on('pointerdown', () => {
      newhorizons.setVelocity(newhorizons.speed, 0);
    });
    right.on('pointerover', () => {
      if (this.input.activePointer.isDown) {
        newhorizons.setVelocity(newhorizons.speed, 0);
      }
    });
    right.on('pointerout', () => {
      newhorizons.setVelocity(0);
    });
    this.input.keyboard.on('keydown-RIGHT', () => {
      newhorizons.setVelocity(newhorizons.speed, 0);
    });
    this.input.keyboard.on('keyup-RIGHT', () => {
      newhorizons.setVelocityX(0);
    });
    this.input.on('pointerup', () => {
      newhorizons.setVelocity(0);
    });
    let leftgap = 3;
    this.add.container(896, 448, [up, down, left, right]);
    this.time.addEvent({
      delay: 500,
      callback: () => {
        let newleftgap = leftgap;
        for (let i = 0; i < 7; i += 1) {
          if (leftgap === i) {
            // eslint-disable-next-line new-cap
            newleftgap += Phaser.Math.Between(-1, 1);
            // eslint-disable-next-line new-cap
            newleftgap = Phaser.Math.Clamp(newleftgap, 1, 5);
          // eslint-disable-next-line new-cap
          } else if (Phaser.Math.Between(0, levels[data.level].asteroidleft)) {
            this.addasteroid(asteroids, 2, i);
          }
        }
        leftgap = newleftgap;
      },
      loop: true,
    });
  }

  /**
   *
   *
   * @param {*} asteroids
   * @param {*} d
   * @param {*} i
   * @memberof LevelScene
   */
  addasteroid(asteroids, d, i) {
    const x = [-96, i * 96, 1152, i * 96][d];
    const y = [i * 96, -96, i * 96, 672][d];
    const frame =
      ['asteroidright', 'asteroiddown', 'asteroidleft', 'asteroidup'][d];
    const asteroid = this.physics.add.image(x, y, 'sprites', frame);
    asteroids.add(asteroid);
    asteroid.body.setCircle(32, 0, 0);
    asteroid.body.onWorldBounds = true;

    asteroid.setDepth(-1);
    this.tweens.add({
      targets: asteroid,
      x: [1152, i * 96, -96, i * 96][d],
      y: [i * 96, 672, i * 96, -96][d],
      duration: [13000/2, 8000/2, 13000/2, 8000/2][d],
    });
  }
}
