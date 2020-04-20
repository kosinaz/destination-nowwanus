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
    const bg = this.add.image(512, 288, 'bg');
    bg.setDepth(-2);
    const offscreen = new Phaser.Geom.Rectangle(1024, 0, 1, 576);
    const onscreen = new Phaser.Geom.Rectangle(0, 0, 1025, 576);
    const dustGraphics = this.make.graphics();
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
    const pause = this.add.image(984, 40, 'sprites', 'pause');
    pause.setInteractive();
    pause.on('pointerdown', () => {
      this.scene.launch('PauseScene', {
        level: data.level,
        from: 'level',
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
    this.input.keyboard.on('keydown-UP', (event) => {
      newhorizons.setVelocityY(-newhorizons.speed);
      event.preventDefault();
    });
    this.input.keyboard.on('keyup-UP', () => {
      newhorizons.setVelocityY(0);
    });
    this.input.keyboard.on('keydown-DOWN', (event) => {
      newhorizons.setVelocityY(newhorizons.speed);
      event.preventDefault();
    });
    this.input.keyboard.on('keyup-DOWN', () => {
      newhorizons.setVelocityY(0);
    });
    this.input.keyboard.on('keydown-LEFT', (event) => {
      newhorizons.setVelocityX(-newhorizons.speed);
      event.preventDefault();
    });
    this.input.keyboard.on('keyup-LEFT', () => {
      newhorizons.setVelocityX(0);
    });
    this.input.keyboard.on('keydown-RIGHT', (event) => {
      newhorizons.setVelocityX(newhorizons.speed);
      event.preventDefault();
    });
    this.input.keyboard.on('keyup-RIGHT', () => {
      newhorizons.setVelocityX(0);
    });
    this.input.keyboard.on('keydown-W', () => {
      newhorizons.setVelocityY(-newhorizons.speed);
    });
    this.input.keyboard.on('keyup-W', () => {
      newhorizons.setVelocityY(0);
    });
    this.input.keyboard.on('keydown-S', () => {
      newhorizons.setVelocityY(newhorizons.speed);
    });
    this.input.keyboard.on('keyup-S', () => {
      newhorizons.setVelocityY(0);
    });
    this.input.keyboard.on('keydown-A', () => {
      newhorizons.setVelocityX(-newhorizons.speed);
    });
    this.input.keyboard.on('keyup-A', () => {
      newhorizons.setVelocityX(0);
    });
    this.input.keyboard.on('keydown-D', () => {
      newhorizons.setVelocityX(newhorizons.speed);
    });
    this.input.keyboard.on('keyup-D', () => {
      newhorizons.setVelocityX(0);
    });
    for (const asteroid of data.map.right) {
      this.addasteroid(asteroids, 0, asteroid.x, asteroid.y);
    }
    for (const asteroid of data.map.down) {
      this.addasteroid(asteroids, 1, asteroid.x, asteroid.y);
    }
    for (const asteroid of data.map.left) {
      this.addasteroid(asteroids, 2, asteroid.x, asteroid.y);
    }
    for (const asteroid of data.map.up) {
      this.addasteroid(asteroids, 3, asteroid.x, asteroid.y);
    }
    this.time.addEvent({
      delay: 17000,
      callback: () => {
        this.cameras.main.fadeOut(300);
      },
    });
    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.stop('LevelScene');
      this.scene.start('MenuScene', {
        level: data.level,
      });
    });
    this.scene.run('InstructionScene', data);
    this.scene.pause();
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
