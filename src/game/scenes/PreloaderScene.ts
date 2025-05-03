import * as Phaser from 'phaser';
import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { Version } from '../shared/Version';
import { Logo } from '../shared/Logo';
import { Background } from '../shared/Background';
import { isMobile } from '@/utils/utils';
import { FontEnum } from '../enums/font-enum';
import { Footer } from '../shared/Footer';

export class PreloaderScene extends Scene {
  constructor() {
    super(SceneEnum.Preloader);
  }

  private loadingText!: Phaser.GameObjects.Text;

  init() {
    new Background(this);
    new Logo(this);
    this.createLoadingText();
    this.createProgressBar();
    new Version(this);
    new Footer(this);
  }

  preload() {
    this.load.setPath('assets');
    for (let index = 0; index < 50; index++) {
      this.load.image(`teste_image_${index}`, 'images/background.jpeg');
    }
    this.load.image(ImageEnum.Button1, 'images/buttons/button1.png');
    this.load.image(ImageEnum.Button1Hover, 'images/buttons/button1_hover.png');
  }

  create() {
    this.scene.start(SceneEnum.Login);
  }

  private createLoadingText(): void {
    const { width, height } = this.scale;
    this.loadingText = this.add
      .text(width / 2, height / 2 + 130, 'Carregando...', {
        fontFamily: FontEnum.AlineaSans,
        fontSize: '24px',
        color: '#ffffff',
      })
      .setOrigin(0.5);
    this.loadingText.translation = this.translation.add(this.loadingText, {
      translationKey: 'loading',
      interpolation: ['...'],
    });
    this.loadingText.setResolution(3);
  }

  // private createProgressBar(): void {
  //   const { width } = this.scale;
  //   const barWidth = width * 0.7;
  //   const barHeight = 24;
  //   const progressBarX = width / 2;
  //   const progressBarY = this.loadingText.y + this.loadingText.height / 2 + barHeight;
  //   this.add.rectangle(progressBarX, progressBarY, barWidth, barHeight).setStrokeStyle(2, 0x808080).setOrigin(0.5);
  //   const progressIndicator = this.add.rectangle(progressBarX - barWidth / 2 + 2, progressBarY, 4, barHeight - 4, 0xffffff).setOrigin(0, 0.5);
  //   this.load.on(Phaser.Loader.Events.PROGRESS, (progress: number) => {
  //     progressIndicator.width = 4 + (barWidth - 8) * progress;
  //   });
  // }

  private createProgressBar(): void {
    const { width } = this.scale;
    const frameWidth = 220;
    const fillWidth = 214;
    const fillHeight = 10;
    const barWidth = isMobile ? width * 0.8 : 400;
    const scaleFactor = barWidth / frameWidth;

    const progressBarX = width / 2;
    const progressBarY = this.loadingText.y + this.loadingText.height / 2 + 30;

    const fill = this.add.image(progressBarX - (fillWidth * scaleFactor) / 2, progressBarY, ImageEnum.LoadingFullBar);
    fill.setOrigin(0, 0.5);
    fill.setScale(scaleFactor, scaleFactor);

    fill.displayWidth = 0;

    const barFrame = this.add.image(progressBarX, progressBarY, ImageEnum.LoadingBar);
    barFrame.setOrigin(0.5);
    barFrame.setScale(scaleFactor);

    this.load.on(Phaser.Loader.Events.PROGRESS, (progress: number) => {
      fill.displayWidth = fillWidth * scaleFactor * progress;
      fill.displayHeight = fillHeight * scaleFactor;
    });
  }
}
