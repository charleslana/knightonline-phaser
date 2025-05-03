import * as Phaser from 'phaser';
import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { Version } from '../shared/Version';
import { Logo } from '../shared/Logo';

export class PreloaderScene extends Scene {
  constructor() {
    super(SceneEnum.Preloader);
  }

  private loadingText!: Phaser.GameObjects.Text;

  init() {
    this.createBg();
    new Logo(this);
    this.createLoadingText();
    this.createProgressBar();
    new Version(this);
  }

  preload() {
    this.load.setPath('assets');
    for (let index = 0; index < 50; index++) {
      this.load.image(`teste_image_${index}`, 'images/background.jpeg');
    }
  }

  create() {
    // this.scene.start(SceneEnum.Login);
  }

  private createBg(): void {
    const { width, height } = this.scale;
    const bg = this.add.image(width / 2, height / 2, ImageEnum.Background).setOrigin(0.5);
    const scaleX = width / bg.width;
    const scaleY = height / bg.height;
    const scale = Math.max(scaleX, scaleY);
    bg.setScale(scale);
    this.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0);
  }

  private createLoadingText(): void {
    const { width, height } = this.scale;
    this.loadingText = this.add
      .text(width / 2, height / 2 + 130, 'Carregando...', {
        fontFamily: 'AlineaSans',
        fontSize: '24px',
        color: '#ffffff',
      })
      .setOrigin(0.5);
    this.loadingText.translation = this.translation.add(this.loadingText, {
      translationKey: 'loading',
      interpolation: ['...'],
    });
  }

  private createProgressBar(): void {
    const { width } = this.scale;
    const barWidth = width * 0.7;
    const barHeight = 24;
    const progressBarX = width / 2;
    const progressBarY = this.loadingText.y + this.loadingText.height / 2 + barHeight;
    this.add.rectangle(progressBarX, progressBarY, barWidth, barHeight).setStrokeStyle(2, 0x808080).setOrigin(0.5);
    const progressIndicator = this.add.rectangle(progressBarX - barWidth / 2 + 2, progressBarY, 4, barHeight - 4, 0xffffff).setOrigin(0, 0.5);
    this.load.on(Phaser.Loader.Events.PROGRESS, (progress: number) => {
      progressIndicator.width = 4 + (barWidth - 8) * progress;
    });
  }
}
