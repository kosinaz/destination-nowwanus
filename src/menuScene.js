import Button from './button.js';
import AsteroidMap from './asteroidMap.js';

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
    console.log('menu scene started');
    const bg = this.add.image(512, 288, 'bg');
    bg.setDisplaySize(1024, 576);
    const levels = this.cache.json.get('levels');
    const windowbg = this.add.image(0, 0, 'sprites', 'window');
    const title = this.add.text(0, -184, 'Mission ' + (data.level + 1), {
      fontSize: '48px',
      fontFamily: 'font',
    });
    title.setOrigin(0.5);
    const star1 = this.add.image(0, 0, 'sprites', 'star');
    const star2 = this.add.image(-96, 0, 'sprites', 'star');
    star2.setScale(0.75);
    const star3 = this.add.image(96, 0, 'sprites', 'star');
    star3.setScale(0.75);
    const stars = this.add.container(0, -80, [star1, star2, star3]);
    const target =
      this.add.text(0, 0, `Target: ${(levels[data.level].target)} ⚛`, {
        fontSize: '24px',
        fontFamily: 'font',
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
      this.scene.transition({
        target: 'LevelScene',
        data: {
          level: data.level,
          map: new AsteroidMap(),
        },
        duration: 150,
        moveBelow: true,
        sleep: false,
      });
      bg.destroy();
    });
    this.events.on('transitionout', () => {
      this.tweens.add({
        targets: window,
        duration: 150,
        y: {
          from: 304,
          to: -288,
        },
      });
    });
    const buttons = this.add.container(0, 224, [play]);
    if (data.level > 0) {
      const left = new Button(this, -96, 0, 'sprites', 'left');
      left.once('click', () => {
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
      });
      buttons.add(left);
    }
    if (data.level < levels.length - 1) {
      const right = new Button(this, 96, 0, 'sprites', 'right');
      right.once('click', () => {
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
      });
      buttons.add(right);
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
}
