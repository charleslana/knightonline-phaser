import * as Phaser from 'phaser';
import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { Version } from '../shared/Version';
import { Background } from '../shared/Background';
import { Logo } from '../shared/Logo';
import { Button1 } from '../shared/Button1';
import { Footer } from '../shared/Footer';
import { ImageEnum } from '../enums/image-enum';
import { FontEnum } from '../enums/font-enum';

export class LoginScene extends Scene {
  constructor() {
    super(SceneEnum.Login);
  }

  private modalContainer?: Phaser.GameObjects.Container;
  private loginText!: Phaser.GameObjects.Text;

  init() {
    new Background(this);
    new Logo(this);
    new Version(this);
    this.createStartButton();
    new Footer(this);
  }

  create() {
    EventBus.emit('current-scene-ready', this);
  }

  update() {}

  private createStartButton(): void {
    const { width, height } = this.scale;
    const button = new Button1(this);
    button.create({
      positionX: width / 2,
      positionY: height / 2,
      text: 'Iniciar',
      key: 'start_button',
      scaleX: 0.3,
      scaleY: 1.2,
    });
    button.onPointerDown(() => {
      // this.scene.start(SceneEnum.Register);
      console.log('Hello');
      this.showLoginModal();
    });
  }

  private showLoginModal(): void {
    const { width, height } = this.scale;

    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0);
    overlay.setInteractive();

    const modal = this.add.container(0, 0);

    const modalBgImage = this.add
      .image(width / 2, height / 2, ImageEnum.ModalBackground)
      .setDisplaySize(width, height)
      .setOrigin(0.5);

    const padding = 16;
    const closeButton = this.add
      .image(width - padding, padding, ImageEnum.CloseIcon)
      .setOrigin(1, 0)
      .setDisplaySize(28, 27)
      .setScale(1.5)
      .setInteractive({ useHandCursor: true });

    closeButton.on('pointerdown', () => {
      this.modalContainer?.destroy(true);
      this.modalContainer = undefined;
      this.hideLoginText();
    });

    modal.add([modalBgImage, closeButton]);

    this.modalContainer = this.add.container(0, 0, [overlay, modal]);
    this.showLoginText();
  }

  private showLoginText(): void {
    const { width, height } = this.scale;
    const maxTextWidth = width * 0.8;
    this.loginText = this.add
      .text(width / 2, height / 5, 'Faça login para entrar', {
        fontFamily: FontEnum.AlineaSans,
        fontSize: '25px',
        color: '#000000',
        align: 'center',
        wordWrap: { width: maxTextWidth, useAdvancedWrap: true },
      })
      .setOrigin(0.5, 0.5);
    this.loginText.translation = this.translation.add(this.loginText, {
      translationKey: 'login_text',
    });
  }

  private hideLoginText(): void {
    this.loginText.destroy();
  }
}
