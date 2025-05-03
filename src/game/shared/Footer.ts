import * as Phaser from 'phaser';
import { FontEnum } from '../enums/font-enum';

export class Footer extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
    this.create();
  }

  private create(): void {
    const { width, height } = this.scene.scale;
    const offsetY = height * 0.02;
    const currentYear = new Date().getFullYear();
    const text = this.scene.add.text(width / 2, height - offsetY, `Knight Online by Charles Lana @2025 - ${currentYear}`, {
      fontFamily: FontEnum.HelveticaNowRegular,
      fontSize: '10px',
      color: '#ffffff',
    });
    text.setOrigin(0.5, 1);
    text.setResolution(3);
    this.add(text);
  }
}
