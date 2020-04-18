/**
 * Represents four sets of random generated asteroid positions.
 *
 * @export
 * @class AsteroidMap
 */
export default class AsteroidMap {
  /**
   * Creates an instance of AsteroidMap.
   * @param {*} config
   * @memberof AsteroidMap
   */
  constructor() {
    this.right = new Set();
    this.up = new Set();
    this.left = new Set();
    this.down = new Set();
    let rightx = 30;
    let righty = 3;
    let downx = 5;
    let downy = 30;
    let leftx = 0;
    let lefty = 3;
    let upx = 5;
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
        const d = Phaser.Math.Between(0, 4);
        switch (d) {
          case 0: this.right.add(`${rightx},${righty}`); break;
          case 1: this.down.add(`${downx},${downy}`); break;
          case 2: this.left.add(`${leftx},${lefty}`); break;
          case 3: this.up.add(`${upx},${upy}`); break;
          default: break;
        }
        rightx += [-1, 0, 1, 0, 0][d];
        righty += [0, -1, 0, 1, 0][d];
        // eslint-disable-next-line new-cap
        righty = Phaser.Math.Clamp(righty, 1, 5);
        downx += [-1, 0, 1, 0, 0][d];
        // eslint-disable-next-line new-cap
        downx = Phaser.Math.Clamp(downx, 1, 11);
        downy += [0, -1, 0, 1, 0][d];
        leftx += [-1, 0, 1, 0, 0][d];
        lefty += [0, -1, 0, 1, 0][d];
        // eslint-disable-next-line new-cap
        lefty = Phaser.Math.Clamp(lefty, 1, 5);
        upx += [-1, 0, 1, 0, 0][d];
        // eslint-disable-next-line new-cap
        upx = Phaser.Math.Clamp(upx, 1, 11);
        upy += [0, -1, 0, 1, 0][d];
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
