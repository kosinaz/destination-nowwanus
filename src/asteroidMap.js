/**
 * Represents four sets of random generated asteroid positions.
 *
 * @export
 * @class AsteroidMap
 */
export default class AsteroidMap {
  /**
   * Creates an instance of AsteroidMap.
   * @memberof AsteroidMap
   */
  constructor() {
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
        console.log(rightx, righty, leftx, lefty, downx, downy, upx, upy);
        rightx += [-1, 0, 1, 0, 0][d];
        // eslint-disable-next-line new-cap
        // rightx = Phaser.Math.Clamp(rightx, -2, 2);
        righty += [0, -1, 0, 1, 0][d];
        // eslint-disable-next-line new-cap
        // righty = Phaser.Math.Clamp(righty, -2, 2);
        downx += [-1, 0, 1, 0, 0][d];
        // eslint-disable-next-line new-cap
        // downx = Phaser.Math.Clamp(downx, -2, 2);
        downy += [0, -1, 0, 1, 0][d];
        // eslint-disable-next-line new-cap
        // downy = Phaser.Math.Clamp(downy, -2, 2);
        leftx += [-1, 0, 1, 0, 0][d];
        // eslint-disable-next-line new-cap
        // leftx = Phaser.Math.Clamp(leftx, -2, 2);
        lefty += [0, -1, 0, 1, 0][d];
        // eslint-disable-next-line new-cap
        // lefty = Phaser.Math.Clamp(lefty, -2, 2);
        upx += [-1, 0, 1, 0, 0][d];
        // eslint-disable-next-line new-cap
        // upx = Phaser.Math.Clamp(upx, -2, 2);
        upy += [0, -1, 0, 1, 0][d];
        // eslint-disable-next-line new-cap
        // upy = Phaser.Math.Clamp(upy, -2, 2);
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
