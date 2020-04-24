import Profile from './profile.js';

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
    this.target = levels[data.level].target;
    const bg = this.add.image(512, 288, 'bg');
    bg.setDepth(-3);
    this.scene.get('MusicScene').play(1);
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
    this.newhorizons =
      this.physics.add.image(490, 262, 'sprites', 'newhorizons');
    this.newhorizons.body.setCircle(16, 8, 10);
    this.newhorizons.setOrigin(0);
    this.newhorizons.setCollideWorldBounds(true);
    this.newhorizons.speed = 200;
    this.focus = this.add.graphics({
      x: 512,
      y: 288,
    });
    this.focus.lineStyle(3, 0xffff00, 0.5);
    this.focus.beginPath();
    this.focus.moveTo(-144, -128);
    this.focus.lineTo(-144, -144);
    this.focus.lineTo(-128, -144);
    this.focus.moveTo(-144, 128);
    this.focus.lineTo(-144, 144);
    this.focus.lineTo(-128, 144);
    this.focus.moveTo(144, -128);
    this.focus.lineTo(144, -144);
    this.focus.lineTo(128, -144);
    this.focus.moveTo(144, 128);
    this.focus.lineTo(144, 144);
    this.focus.lineTo(128, 144);
    this.focus.strokePath();
    this.physics.world.enable(this.focus);
    this.focus.body.setSize(288, 288);
    this.focus.body.setOffset(-144);
    this.asteroids = this.physics.add.group();
    this.physics.add.overlap(this.newhorizons, this.asteroids, () => {
      if (!Profile.invincible) {
        this.scene.restart();
        // this.scene.start('RewindScene', {
        //   level: data.level,
        //   map: data.map,
        //   snaps: snaps,
        // });
        // this.scene.stop();
      }
    });
    this.physics.add.overlap(this.focus, this.asteroids, (focus, asteroid) => {
      if (!asteroid.shot) {
        asteroid.infocus.visible = true;
      }
      asteroid.outoffocus.visible = false;
    });
    this.keys =
      this.input.keyboard.addKeys('W,A,S,D,UP,LEFT,DOWN,RIGHT,SPACE,ENTER');
    this.input.keyboard.on('keydown', (event) => {
      event.preventDefault();
    });
    for (const asteroid of data.map.right) {
      this.addasteroid(0, asteroid.x, asteroid.y);
    }
    for (const asteroid of data.map.down) {
      this.addasteroid(1, asteroid.x, asteroid.y);
    }
    for (const asteroid of data.map.left) {
      this.addasteroid(2, asteroid.x, asteroid.y);
    }
    for (const asteroid of data.map.up) {
      this.addasteroid(3, asteroid.x, asteroid.y);
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
    this.input.keyboard.on('keydown-ENTER', (event) => {
      event.preventDefault();
      if (this.photos < this.photosmax) {
        this.takePicture();
      }
    });
    this.input.keyboard.on('keydown-SPACE', (event) => {
      event.preventDefault();
      if (this.photos < this.photosmax) {
        this.takePicture();
      }
    });
    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.stop('LevelScene');
      if (data.level === levels.length - 1) {
        this.scene.start('WinScene', {
          level: data.level,
          science: this.science,
        });
      } else {
        this.scene.start('MenuScene', {
          level: data.level,
          science: this.science,
        });
      }
    });
    this.photos = 0;
    this.photosmax = 5;
    this.add.image(76, 512, 'sprites', 'frame').setDepth(-1);
    this.add.image(40, 536, 'sprites', 'photocounter');
    this.photocounter = this.add.text(40, 536, this.photosmax - this.photos, {
      fontSize: '24px',
      fontFamily: 'font',
    });
    this.photocounter.setOrigin(0.5);
    this.textures.on('addtexture', (photo) => {
      this.cameras.main.flash(50, 64, 64, 64);
      this.add.image(76 + (this.photos - 1) * 16, 512, photo)
          .setScale(0.25).setDepth(-1);
      this.add.image(76 + (this.photos - 1) * 16, 512, 'sprites', 'frame')
          .setDepth(-1);
    });
    this.scene.run('InstructionScene', data);
    this.scene.pause();
    this.science = 0;
    const progressborder = this.add.image(0, 0, 'sprites', 'progressborder');
    this.progressbar = this.add.image(0, 160, 'sprites', 'progressbar');
    const progressoverlay = this.add.image(0, 0, 'sprites', 'progressoverlay');
    this.progresscounter = this.add.text(56, -60, this.science + '⚛', {
      fontSize: '24px',
      fontFamily: 'font',
    });
    this.add.container(88, 100, [
      progressborder,
      this.progressbar,
      this.progresscounter,
      progressoverlay,
    ]);
    this.progressmask = this.add.image(88, 100, 'sprites', 'progressbar');
    this.progressmask.visible = false;
    this.progressbar.mask =
      new Phaser.Display.Masks.BitmapMask(this, this.progressmask);
    this.progresscounter.setOrigin(1, 0.5);
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
  takePicture() {
    const focus = this.focus.body.getBounds({});
    this.game.renderer.snapshotArea(focus.x, focus.y, 288, 288, (image) => {
      this.photos += 1;
      this.textures.addImage('photo' + Phaser.Math.RND.uuid(), image);
      this.photocounter.text = this.photosmax - this.photos;
      this.physics.overlapRect(focus.x, focus.y, 288, 288).forEach((body) => {
        if (this.asteroids.contains(body.gameObject) &&
          !body.gameObject.shot) {
          body.gameObject.shot = true;
          body.gameObject.infocus.visible = false;
          this.science += 1;
          this.progresscounter.text = this.science + '⚛';
          let y = 160 - ~~((this.science / this.target) * 92);
          // eslint-disable-next-line new-cap
          y = Phaser.Math.Clamp(y, 0, 160);
          this.tweens.add({
            targets: this.progressbar,
            y: y,
            ease: 'Quad',
            duration: 300,
          });
        }
      });
    });
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
    // eslint-disable-next-line new-cap
    const focusx = Phaser.Math.Clamp(this.newhorizons.x + 22, 144, 880);
    // eslint-disable-next-line new-cap
    const focusy = Phaser.Math.Clamp(this.newhorizons.y + 26, 144, 432);
    this.focus.setPosition(focusx, focusy);
    this.asteroids.getChildren().forEach((asteroid) => {
      if (asteroid.body.touching.none) {
        asteroid.infocus.visible = false;
      }
      asteroid.outoffocus.visible = false;
    });
    this.physics.overlapRect(0, 0, 1024, 576).forEach((body) => {
      if (this.asteroids.contains(body.gameObject) &&
        !body.gameObject.infocus.visible &&
        !body.gameObject.shot) {
        body.gameObject.outoffocus.visible = true;
      }
    });
  }

  /**
   *
   *
   * @param {*} d
   * @param {*} x
   * @param {*} y
   * @memberof LevelScene
   */
  addasteroid(d, x, y) {
    const frame =
      ['asteroidright', 'asteroiddown', 'asteroidleft', 'asteroidup'][d];
    const asteroid = this.add.image(0, 0, 'sprites', frame);
    const infocus = this.add.graphics();
    infocus.lineStyle(3, 0xffff00, 0.5);
    infocus.beginPath();
    infocus.moveTo(0, -16);
    infocus.lineTo(0, -24);
    infocus.moveTo(0, 16);
    infocus.lineTo(0, 24);
    infocus.moveTo(-16, 0);
    infocus.lineTo(-24, 0);
    infocus.moveTo(16, 0);
    infocus.lineTo(24, 0);
    infocus.closePath();
    infocus.strokePath();
    infocus.strokeCircle(0, 0, 20);
    const outoffocus = this.add.graphics();
    outoffocus.lineStyle(3, 0xffffff, 0.5);
    outoffocus.beginPath();
    outoffocus.arc(
        // eslint-disable-next-line new-cap
        0, 0, 40, Phaser.Math.DegToRad(30), Phaser.Math.DegToRad(60),
    );
    outoffocus.strokePath();
    outoffocus.beginPath();
    // eslint-disable-next-line new-cap
    outoffocus.arc(
        // eslint-disable-next-line new-cap
        0, 0, 40, Phaser.Math.DegToRad(120), Phaser.Math.DegToRad(150),
    );
    outoffocus.strokePath();
    outoffocus.beginPath();
    // eslint-disable-next-line new-cap
    outoffocus.arc(
        // eslint-disable-next-line new-cap
        0, 0, 40, Phaser.Math.DegToRad(210), Phaser.Math.DegToRad(240),
    );
    outoffocus.strokePath();
    outoffocus.beginPath();
    // eslint-disable-next-line new-cap
    outoffocus.arc(
        // eslint-disable-next-line new-cap
        0, 0, 40, Phaser.Math.DegToRad(300), Phaser.Math.DegToRad(330),
    );
    outoffocus.strokePath();
    this.tweens.add({
      targets: [outoffocus, infocus],
      angle: 90,
      loop: -1,
    });
    infocus.visible = false;
    outoffocus.visible = false;
    const asteroidcontainer =
      this.add.container(x, y, [asteroid, outoffocus, infocus]);
    this.physics.world.enable(asteroidcontainer);
    asteroidcontainer.body.setCircle(32, -32, -32);
    this.asteroids.add(asteroidcontainer);
    asteroidcontainer.body.setVelocity(
        [200, 0, -200, 0][d],
        [0, 200, 0, -200][d],
    );
    asteroidcontainer.setDepth(-2);
    asteroidcontainer.infocus = infocus;
    asteroidcontainer.outoffocus = outoffocus;
  }
}
