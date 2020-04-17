/**
 * Represent an interactive image that displays a short tween on pointer up,
 * then executes the specified callback function.
 *
 * @export
 * @class Button
 * @extends {Phaser.GameObjects.Container}
 */
export default class Button extends Phaser.GameObjects.Container {
  /**
   * Creates an instance of Button.
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {string} texture
   * @param {string} frame
   * @param {string} text
   * @memberof Button
   */
  constructor(scene, x, y, texture, frame, text) {
    super(scene, x, y, [
      scene.add.image(0, 0, texture, frame),
      scene.add.text(-4, -10, text, {
        fontSize: '80px',
        fontFamily: 'font',
      }),
    ]);
    scene.children.add(this);
    this.setSize(this.list[0].width, this.list[0].height);
    this.setInteractive();
    this.on('pointerdown', () => {
      this.down = true;
    });
    this.on('pointerup', () => {
      if (this.down && !this.tweening) {
        this.tweening = true;
        scene.tweens.add({
          targets: this,
          scale: 0.8,
          ease: 'Quad',
          duration: 70,
          yoyo: true,
          onComplete: () => {
            this.emit('click');
            this.tweening = false;
          },
        });
      }
    });
    scene.input.on('pointerup', () => {
      this.down = false;
    });
    this.list[1].setOrigin(0.5);
    this.list[1].setStroke('#6dc300', 6);
    this.text = text;
  }

  /**
   * Locks the selected button.
   *
   * @memberof Button
   */
  lock() {
    this.list[0].disableInteractive();
    this.list[0].setFrame('locked');
    this.list[1].text = '';
  }
}
