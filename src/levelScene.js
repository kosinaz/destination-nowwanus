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
      this.physics.add.image(490, 262, 'sprites', 'newhorizons');
    newhorizons.body.setCircle(16, 8, 10);
    newhorizons.setOrigin(0);
    newhorizons.setCollideWorldBounds(true);
    const asteroids = this.physics.add.group();
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
    this.add.container(896, 448, [up, down, left, right]);
    if (levels[data.level].asteroidright) {
      for (let x = -30; x < 1; x += 1) {
        for (let y = -3; y < 4; y += 1) {
          if (data.map.hasRight(x, y)) {
            this.addasteroid(asteroids, 0, 512 + x * 96, 288 + y * 96);
          }
        }
      }
    }
    if (levels[data.level].asteroidleft) {
      for (let x = 0; x < 31; x += 1) {
        for (let y = -3; y < 4; y += 1) {
          if (data.map.hasLeft(x, y)) {
            this.addasteroid(asteroids, 2, 512 + x * 96, 288 + y * 96);
          }
        }
      }
    }
    if (levels[data.level].asteroiddown) {
      for (let x = -5; x < 6; x += 1) {
        for (let y = -30; y < 1; y += 1) {
          if (data.map.hasDown(x, y)) {
            this.addasteroid(asteroids, 1, 512 + x * 96, 288 + y * 96);
          }
        }
      }
    }
    if (levels[data.level].asteroidup) {
      for (let x = -5; x < 6; x += 1) {
        for (let y = 0; y < 31; y += 1) {
          if (data.map.hasUp(x, y)) {
            this.addasteroid(asteroids, 3, 512 + x * 96, 288 + y * 96);
          }
        }
      }
    }
  }

  /**
   *
   *
   * @param {*} asteroids
   * @param {*} d
   * @param {*} x
   * @param {*} y
   * @memberof LevelScene
   */
  addasteroid(asteroids, d, x, y) {
    const frame =
      ['asteroidright', 'asteroiddown', 'asteroidleft', 'asteroidup'][d];
    const asteroid = this.physics.add.image(x, y, 'sprites', frame);
    asteroids.add(asteroid);
    asteroid.body.setCircle(32, 0, 0);
    asteroid.setVelocity([200, 0, -200, 0][d], [0, 200, 0, -200][d]);
    asteroid.setDepth(-1);
  }
}
