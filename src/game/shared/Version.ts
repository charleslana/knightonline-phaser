import * as Phaser from 'phaser';
import packageJson from '@package';
import { FontEnum } from '../enums/font-enum';

export class Version extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
    this.create();
  }

  private create(): void {
    const { width, height } = this.scene.scale;
    const offsetX = width * 0.02;
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const baseOffsetY = height * 0.02;
    const extraPaddingMobile = 32;
    const offsetY = isMobile ? baseOffsetY + extraPaddingMobile : baseOffsetY;
    const textObject = this.scene.add
      .text(width - offsetX, height - offsetY, 'versão 1.0.0', {
        fontFamily: FontEnum.AlineaSans,
        fontSize: '14px',
        color: '#ffffff',
      })
      .setOrigin(1, 1);
    textObject.translation = this.scene.translation.add(textObject, {
      translationKey: 'version',
      interpolation: [packageJson.version],
    });
  }
}
