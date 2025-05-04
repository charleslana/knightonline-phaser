import * as Phaser from 'phaser';
import { ImageEnum } from '../enums/image-enum';

export class Background extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
    this.create();
  }

  private create(): void {
    const { width, height } = this.scene.scale;
    const bg = this.scene.add.image(width / 2, height / 2, ImageEnum.Background).setOrigin(0.5);
    const scaleX = width / bg.width;
    const scaleY = height / bg.height;
    const scale = Math.max(scaleX, scaleY);
    bg.setScale(scale);
    this.scene.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0);
  }
}
