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
    this.add.particles('dust', [{
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
    }]);
    const pause = this.add.image(984, 40, 'sprites', 'pause');
    pause.setInteractive();
    pause.on('pointerdown', () => {
      this.pauseLevel(data);
    });
    this.input.keyboard.on('keydown-ESC', (event) => {
      event.preventDefault();
      this.pauseLevel(data);
    });
    this.input.keyboard.on('keydown-PAUSE', (event) => {
      event.preventDefault();
      this.pauseLevel(data);
    });
    this.newhorizons =
      this.physics.add.image(490, 262, 'sprites', 'newhorizons');
    this.newhorizons.body.setCircle(16, 8, 10);
    this.newhorizons.setOrigin(0);
    this.newhorizons.setCollideWorldBounds(true);
    this.newhorizons.speed = 200;
    const asteroids = this.physics.add.group();
    this.physics.add.overlap(this.newhorizons, asteroids, () => {
      this.scene.restart();
      // this.scene.start('RewindScene', {
      //   level: data.level,
      //   map: data.map,
      //   snaps: snaps,
      // });
      // this.scene.stop();
    });
    this.keys =
      this.input.keyboard.addKeys('W,A,S,D,UP,LEFT,DOWN,RIGHT,SPACE,ENTER');
    this.input.keyboard.on('keydown', (event) => {
      event.preventDefault();
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
    // const snaps = [];
    // this.time.addEvent({
    //   delay: 300,
    //   callback: () => {
    //     this.game.renderer.snapshot((snap) => {
    //       snaps.unshift(snap);
    //     });
    //   },
    //   loop: true,
    // });
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
   * @param {*} data
   * @memberof LevelScene
   */
  pauseLevel(data) {
    this.scene.launch('PauseScene', {
      level: data.level,
      from: 'level',
    });
    this.scene.pause();
  }

  /**
   *
   *
   * @memberof LevelScene
   */
  update() {
    this.newhorizons.setVelocity(0);
    if (this.keys.W.isDown || this.keys.UP.isDown) {
      this.newhorizons.setVelocityY(-this.newhorizons.speed);
    }
    if (this.keys.A.isDown || this.keys.LEFT.isDown) {
      this.newhorizons.setVelocityX(-this.newhorizons.speed);
    }
    if (this.keys.S.isDown || this.keys.DOWN.isDown) {
      this.newhorizons.setVelocityY(this.newhorizons.speed);
    }
    if (this.keys.D.isDown || this.keys.RIGHT.isDown) {
      this.newhorizons.setVelocityX(this.newhorizons.speed);
    }
    const within = this.physics.overlapRect(96, 96, 896, 448);

    within.forEach((body) => {
      //body.gameObject.setTint(0xff0000);
    });
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
