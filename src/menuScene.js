import Button from './button.js';
import AsteroidMap from './asteroidMap.js';
import Profile from './profile.js';

/**
 * Represent the level introduction modal of the level scene.
 *
 * @export
 * @class MenuScene
 * @extends {Phaser.Scene}
 */
export default class MenuScene extends Phaser.Scene {
  /**
   * Creates an instance of MenuScene.
   * @memberof MenuScene
   */
  constructor() {
    super('MenuScene');
  }

  /**
   * Creates the content of the MenuScene.
   *
   * @param {*} data
   * @memberof MenuScene
   */
  create(data) {
    const bg = this.add.image(512, 288, 'bg');
    bg.setDisplaySize(1024, 576);
    const levels = this.cache.json.get('levels');
    let open = 'level';
    const info = new Button(this, 984, 40, 'sprites', 'info');
    info.once('click', () => {
      this.cameras.main.fadeOut(300);
      open = 'info';
    });
    const windowbg = this.add.image(0, 0, 'sprites', 'window');
    const title = this.add.text(0, -184, 'Mission ' + (data.level + 1), {
      fontSize: '48px',
      fontFamily: 'font',
    });
    title.setOrigin(0.5);
    const star1border = this.add.image(0, 0, 'sprites', 'star');
    const star1 = this.add.image(0, 0, 'sprites', 'staron');
    star1.setScale(Profile.level[data.level] > 0 ? 1 : 0);
    const star2border = this.add.image(-96, 0, 'sprites', 'star');
    star2border.setScale(0.75);
    const star2 = this.add.image(-96, 0, 'sprites', 'staron');
    star2.setScale(Profile.level[data.level] > 1 ? 0.75 : 0);
    const star3border = this.add.image(96, 0, 'sprites', 'star');
    star3border.setScale(0.75);
    const star3 = this.add.image(96, 0, 'sprites', 'staron');
    star3.setScale(Profile.level[data.level] > 2 ? 0.75 : 0);
    const stars = this.add.container(0, -80, [
      star1border,
      star1,
      star2border,
      star2,
      star3border,
      star3,
    ]);
    const target =
      this.add.text(0, 0, `Target: ${(levels[data.level].target)} ⚛`, {
        fontSize: '24px',
        fontFamily: 'font2',
      });
    target.setOrigin(0.5);
    const warnings = this.add.container(0, 128);
    if (levels[data.level].asteroidleft) {
      warnings.add(this.add.container(0, 0, [
        this.add.image(0, 0, 'sprites', 'warning'),
        this.add.image(0, 0, 'sprites', 'asteroidleft'),
        this.add.image(
            40,
            40,
            'sprites',
            ['blue', 'yellow', 'red'][levels[data.level].asteroidleft - 1],
        ),
      ]));
    }
    if (levels[data.level].asteroiddown) {
      warnings.add(this.add.container(0, 0, [
        this.add.image(0, 0, 'sprites', 'warning'),
        this.add.image(0, 0, 'sprites', 'asteroiddown'),
        this.add.image(
            40,
            40,
            'sprites',
            ['blue', 'yellow', 'red'][levels[data.level].asteroiddown - 1],
        ),
      ]));
    }
    if (levels[data.level].asteroidup) {
      warnings.add(this.add.container(0, 0, [
        this.add.image(0, 0, 'sprites', 'warning'),
        this.add.image(0, 0, 'sprites', 'asteroidup'),
        this.add.image(
            40,
            40,
            'sprites',
            ['blue', 'yellow', 'red'][levels[data.level].asteroidup - 1],
        ),
      ]));
    }
    if (levels[data.level].asteroidright) {
      warnings.add(this.add.container(0, 0, [
        this.add.image(0, 0, 'sprites', 'warning'),
        this.add.image(0, 0, 'sprites', 'asteroidright'),
        this.add.image(
            40,
            40,
            'sprites',
            ['blue', 'yellow', 'red'][levels[data.level].asteroidright - 1],
        ),
      ]));
    }
    warnings.list[0].x -= (warnings.list.length - 1) * 64;
    // eslint-disable-next-line new-cap
    Phaser.Actions.AlignTo(
        warnings.list,
        Phaser.Display.Align.RIGHT_CENTER,
        128,
    );
    const play = new Button(this, 0, 0, 'sprites', 'playon');
    play.once('click', () => {
      this.cameras.main.fadeOut(300);
    });
    this.input.keyboard.on('keydown-ENTER', (event) => {
      event.preventDefault();
      this.cameras.main.fadeOut(300);
    });
    this.input.keyboard.on('keydown-SPACE', (event) => {
      event.preventDefault();
      this.cameras.main.fadeOut(300);
    });
    this.cameras.main.on('camerafadeoutcomplete', () => {
      if (open === 'level') {
        this.scene.start('LevelScene', {
          level: data.level,
          map: new AsteroidMap(levels[data.level]),
        });
      } else if (open === 'info') {
        this.scene.start('InfoScene', {
          level: data.level,
        });
      }
      this.scene.stop();
    });
    if (data.science) {
      if (data.science >= levels[data.level].target &&
        (!Profile.level[data.level] ||
          Profile.level[data.level] < 1)) {
        Profile.star += 1;
        Profile.level[data.level] = 1;
        this.tweens.add({
          delay: 500,
          targets: star1,
          duration: 150,
          scale: 1,
          ease: 'Back',
        });
        if (Profile.progress < data.level + 1) {
          Profile.progress += 1;
        }
      }
      if (data.science >= levels[data.level].target * 1.5 &&
        Profile.level[data.level] < 2) {
        Profile.star += 1;
        Profile.level[data.level] = 2;
        this.tweens.add({
          delay: 750,
          targets: star2,
          duration: 150,
          scale: 0.75,
          ease: 'Back',
        });
      }
      if (data.science >= levels[data.level].target * 1.75 &&
        Profile.level[data.level] < 3) {
        Profile.star += 1;
        Profile.level[data.level] = 3;
        this.tweens.add({
          delay: 1000,
          targets: star3,
          duration: 150,
          scale: 0.75,
          ease: 'Back',
        });
      }
    }
    const buttons = this.add.container(0, 224, [play]);
    if (data.level > 0) {
      const left = new Button(this, -96, 0, 'sprites', 'left');
      left.once('click', () => {
        this.previousLevel(window, data);
      });
      buttons.add(left);
      this.input.keyboard.on('keydown-LEFT', (event) => {
        event.preventDefault();
        this.previousLevel(window, data);
      });
    }
    if (data.level < levels.length - 1) {
      if (Profile.progress > data.level) {
        const right = new Button(this, 96, 0, 'sprites', 'right');
        right.once('click', () => {
          this.nextLevel(window, data);
        });
        buttons.add(right);
        this.input.keyboard.on('keydown-RIGHT', (event) => {
          event.preventDefault();
          this.nextLevel(window, data);
        });
      } else {
        const right = this.add.image(96, 0, 'sprites', 'lock');
        buttons.add(right);
      }
    }
    const windowcontent = [windowbg, title, stars, target, warnings, buttons];
    const window = this.add.container(512, 304, windowcontent);
    if (!data.from) {
      this.cameras.main.fadeIn(100);
    } else if (data.from === 'left') {
      this.tweens.add({
        targets: window,
        duration: 150,
        x: {
          from: -276,
          to: 512,
        },
      });
    } else if (data.from === 'right') {
      this.tweens.add({
        targets: window,
        duration: 150,
        x: {
          from: 1300,
          to: 512,
        },
      });
    }
  }

  /**
   *
   *
   * @param {*} window
   * @param {*} data
   * @memberof MenuScene
   */
  nextLevel(window, data) {
    this.tweens.add({
      targets: window,
      duration: 150,
      x: {
        from: 512,
        to: -276,
      },
      onComplete: () => {
        this.scene.start('MenuScene', {
          level: data.level + 1,
          from: 'right',
        });
      },
    });
  }

  /**
   *
   *
   * @param {*} window
   * @param {*} data
   * @memberof MenuScene
   */
  previousLevel(window, data) {
    this.tweens.add({
      targets: window,
      duration: 150,
      x: {
        from: 512,
        to: 1300,
      },
      onComplete: () => {
        this.scene.start('MenuScene', {
          level: data.level - 1,
          from: 'left',
        });
      },
    });
  }
}
