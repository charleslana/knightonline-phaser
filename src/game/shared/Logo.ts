import * as Phaser from 'phaser';
import { FontEnum } from '../enums/font-enum';

export class Logo extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
    this.create();
  }

  private create(): void {
    const { width, height } = this.scene.scale;
    const maxTextWidth = width * 0.8;
    const textObject = this.scene.add
      .text(width / 2, height / 4, 'Logo', {
        fontFamily: FontEnum.CinzelDecorativeBlack,
        fontSize: '48px',
        color: '#ffffff',
        fontStyle: 'bold',
        align: 'center',
        wordWrap: { width: maxTextWidth, useAdvancedWrap: true },
      })
      .setOrigin(0.5);
    textObject.translation = this.scene.translation.add(textObject, {
      translationKey: 'logo_name',
      interpolation: [''],
    });
    textObject.setResolution(3);
    // this.scene.tweens.add({
    //   targets: textObject,
    //   alpha: 0,
    //   duration: 1000,
    //   ease: Phaser.Math.Easing.Sine.InOut,
    //   yoyo: true,
    //   repeat: -1,
    // });
    // this.scene.tweens.add({
    //   targets: textObject,
    //   scaleX: 1.05,
    //   scaleY: 1.05,
    //   yoyo: true,
    //   repeat: -1,
    //   duration: 1200,
    //   ease: Phaser.Math.Easing.Sine.InOut,
    // });
  }
}
