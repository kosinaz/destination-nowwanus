/**
 * Represents four sets of random generated asteroid positions.
 *
 * @export
 * @class AsteroidMap
 */
export default class AsteroidMap {
  /**
   *Creates an instance of AsteroidMap.
   * @param {*} config
   * @memberof AsteroidMap
   */
  constructor(config) {
    this.right = new Set();
    this.up = new Set();
    this.left = new Set();
    this.down = new Set();
    let rightx = 0;
    let righty = 0;
    let downx = 0;
    let downy = 0;
    let leftx = 0;
    let lefty = 0;
    let upx = 0;
    let upy = 0;
    for (let i = 0; i < 60; i += 1) {
      this.right.add(`${rightx},${righty}`);
      this.down.add(`${downx},${downy}`);
      this.left.add(`${leftx},${lefty}`);
      this.up.add(`${upx},${upy}`);
      rightx -= 1;
      downy -= 1;
      leftx += 1;
      upy += 1;
      if (i < 30) {
        this.right.add(`${rightx},${righty}`);
        this.down.add(`${downx},${downy}`);
        this.left.add(`${leftx},${lefty}`);
        this.up.add(`${upx},${upy}`);
        // eslint-disable-next-line new-cap
        const directions = [];
        if (downx > -2 && upx > -2) {
          directions.push(0);
        }
        if (righty > -2 && lefty > -2) {
          directions.push(1);
        }
        if (downx < 2 && upx < 2) {
          directions.push(2);
        }
        if (righty < 2 && lefty < 2) {
          directions.push(3);
        }
        const d = Phaser.Math.RND.pick(directions);
        rightx += [-1, 0, 1, 0, 0][d];
        righty += [0, -1, 0, 1, 0][d];
        downx += [-1, 0, 1, 0, 0][d];
        downy += [0, -1, 0, 1, 0][d];
        leftx += [-1, 0, 1, 0, 0][d];
        lefty += [0, -1, 0, 1, 0][d];
        upx += [-1, 0, 1, 0, 0][d];
        upy += [0, -1, 0, 1, 0][d];
      }
    }
    if (config.asteroidright) {
      for (let y = -3; y < 4; y += 1) {
        for (let x = -30; x < -15; x += 1) {
          const chance = (3 - config.asteroidright) * 33 + (-x - 15) * 3;
          // eslint-disable-next-line new-cap
          const roll = Phaser.Math.Between(0, 100);
          if (chance > roll) {
            this.right.add(`${x},${y}`);
          }
        }
        for (let x = -15; x < 1; x += 1) {
          const chance = (3 - config.asteroidright) * 33 + (x + 15) * 3;
          // eslint-disable-next-line new-cap
          const roll = Phaser.Math.Between(0, 100);
          if (chance > roll) {
            this.right.add(`${x},${y}`);
          }
        }
      }
    }
    if (config.asteroidleft) {
      for (let y = -3; y < 4; y += 1) {
        for (let x = 0; x < 15; x += 1) {
          const chance = (3 - config.asteroidleft) * 33 + (15 - x) * 3;
          // eslint-disable-next-line new-cap
          const roll = Phaser.Math.Between(0, 100);
          if (chance > roll) {
            this.left.add(`${x},${y}`);
          }
        }
        for (let x = 15; x < 31; x += 1) {
          const chance = (3 - config.asteroidleft) * 33 + (x - 15) * 3;
          // eslint-disable-next-line new-cap
          const roll = Phaser.Math.Between(0, 100);
          if (chance > roll) {
            this.left.add(`${x},${y}`);
          }
        }
      }
    }
    if (config.asteroiddown) {
      for (let x = -5; x < 6; x += 1) {
        for (let y = -30; y < -15; y += 1) {
          const chance = (3 - config.asteroiddown) * 33 + (-y - 15) * 3;
          // eslint-disable-next-line new-cap
          const roll = Phaser.Math.Between(0, 100);
          if (chance > roll) {
            this.down.add(`${x},${y}`);
          }
        }
        for (let y = -15; y < 1; y += 1) {
          const chance = (3 - config.asteroiddown) * 33 + (y + 15) * 3;
          // eslint-disable-next-line new-cap
          const roll = Phaser.Math.Between(0, 100);
          if (chance > roll) {
            this.down.add(`${x},${y}`);
          }
        }
      }
    }
    if (config.asteroidup) {
      for (let x = -5; x < 6; x += 1) {
        for (let y = 0; y < 15; y += 1) {
          const chance = (3 - config.asteroidup) * 33 + (15 - y) * 3;
          // eslint-disable-next-line new-cap
          const roll = Phaser.Math.Between(0, 100);
          if (chance > roll) {
            this.up.add(`${x},${y}`);
          }
        }
        for (let y = 15; y < 31; y += 1) {
          const chance = (3 - config.asteroidup) * 33 + (y - 15) * 3;
          // eslint-disable-next-line new-cap
          const roll = Phaser.Math.Between(0, 100);
          if (chance > roll) {
            this.up.add(`${x},${y}`);
          }
        }
      }
    }
  }

  /**
   * Returns true if there is a right asteroid in the given position.
   *
   * @param {number} x
   * @param {number} y
   * @return {boolean}
   * @memberof AsteroidMap
   */
  hasRight(x, y) {
    return !this.right.has(`${x},${y}`);
  }

  /**
   * Returns true if there is a down asteroid in the given position.
   *
   * @param {number} x
   * @param {number} y
   * @return {boolean}
   * @memberof AsteroidMap
   */
  hasDown(x, y) {
    return !this.down.has(`${x},${y}`);
  }

  /**
   * Returns true if there is a left asteroid in the given position.
   *
   * @param {number} x
   * @param {number} y
   * @return {boolean}
   * @memberof AsteroidMap
   */
  hasLeft(x, y) {
    return !this.left.has(`${x},${y}`);
  }

  /**
   * Returns true if there is an up asteroid in the given position.
   *
   * @param {number} x
   * @param {number} y
   * @return {boolean}
   * @memberof AsteroidMap
   */
  hasUp(x, y) {
    return !this.up.has(`${x},${y}`);
  }
}
