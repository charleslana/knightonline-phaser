import * as Phaser from 'phaser';
import { ImageEnum } from '../enums/image-enum';
import { ButtonInterface } from '../interfaces/button-interface';
import { FontEnum } from '../enums/font-enum';

export class Button1 extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
  }

  private button: Phaser.GameObjects.Image = <Phaser.GameObjects.Image>{};
  private buttonText: Phaser.GameObjects.Text = <Phaser.GameObjects.Text>{};
  private onPointerDownCallback?: () => void;
  private hoverOverlay: Phaser.GameObjects.Image = <Phaser.GameObjects.Image>{};

  public create(button: ButtonInterface): Phaser.GameObjects.Image {
    this.button = this.scene.add.image(1001, 62, ImageEnum.Button1);
    // if (!button.scaleX && !button.scaleY) {
    //   this.button.setScale(0.4, 1.2).setInteractive();
    // } else {
    //   this.button.setScale(button.scaleX, button.scaleY).setInteractive();
    // }
    const { width: screenWidth, height: screenHeight } = this.scene.scale;
    const buttonWidth = this.button.width;
    const buttonHeight = this.button.height;
    let scaleX = button.scaleX ?? 0.4;
    let scaleY = button.scaleY ?? 1.2;
    const maxAllowedWidth = screenWidth * 0.9;
    const maxAllowedHeight = screenHeight * 0.2;
    if (buttonWidth * scaleX > maxAllowedWidth) {
      scaleX = maxAllowedWidth / buttonWidth;
    }
    if (buttonHeight * scaleY > maxAllowedHeight) {
      scaleY = maxAllowedHeight / buttonHeight;
    }
    this.button.setScale(scaleX, scaleY).setInteractive();

    this.button.setPosition(button.positionX, button.positionY);
    const buttonTextConfig = { fontFamily: FontEnum.CinzelBold, fontSize: '45px', fill: '#ffffff' };
    this.buttonText = this.scene.add.text(470, 387, button.text, buttonTextConfig);
    this.buttonText.translation = this.scene.translation.add(this.buttonText, {
      translationKey: button.key ?? button.text,
    });
    this.buttonText.setOrigin(0.5, 0.5);
    this.buttonText.setPosition(this.button.x, this.button.y);
    this.buttonText.setResolution(3);
    this.adjustTextToButton();
    this.button.on('pointerdown', () => {
      if (this.onPointerDownCallback) {
        this.onPointerDownCallback();
      }
    });
    this.onLanguageChanged();
    // this.createOverlayButton();
    this.createHoverBehavior();
    return this.button;
  }

  public destroy(fromScene: boolean = false): void {
    this.scene.translation.i18next.off('languageChanged');
    super.destroy(fromScene);
  }

  public createOverlayButton(): void {
    this.hoverOverlay = this.scene.add.image(1001, 62, ImageEnum.Button1).setAlpha(0).setScale(this.button.scaleX, this.button.scaleY).setPosition(this.button.x, this.button.y);
    this.hoverOverlay.setTint(0x000000);
    this.button.on('pointerover', () => {
      this.hoverOverlay.setAlpha(0.4);
    });
    this.button.on('pointerout', () => {
      this.hoverOverlay.setAlpha(0);
    });
  }

  private createHoverBehavior(): void {
    this.button.on('pointerover', () => {
      this.button.setTexture(ImageEnum.Button1Hover);
    });
    this.button.on('pointerout', () => {
      this.button.setTexture(ImageEnum.Button1);
    });
  }

  public hideButton(): void {
    this.button.setVisible(false);
    this.buttonText.setVisible(false);
    this.hoverOverlay.setVisible(false);
  }

  public showButton(text?: string): void {
    if (text) {
      this.changeText(text);
    }
    this.button.setVisible(true);
    this.buttonText.setVisible(true);
    this.hoverOverlay.setVisible(true);
  }

  public changeText(newText: string): void {
    const translate = this.scene.translation.t(newText);
    this.buttonText.setText(translate);
    this.adjustTextToButton();
  }

  public onPointerDown(callback: () => void): void {
    this.onPointerDownCallback = callback;
  }

  public offPointerDown(): void {
    this.onPointerDownCallback = undefined;
  }

  private adjustTextToButton(): void {
    const maxFontSize = 45;
    const minFontSize = 10;
    let fontSize = maxFontSize;
    this.buttonText.setFontSize(fontSize);
    const buttonBounds = this.button.getBounds();
    let textBounds = this.buttonText.getBounds();
    const horizontalPadding = 40;
    const verticalPadding = 20;
    while (fontSize > minFontSize && (textBounds.width > buttonBounds.width - horizontalPadding || textBounds.height > buttonBounds.height - verticalPadding)) {
      fontSize -= 1;
      this.buttonText.setFontSize(fontSize);
      textBounds = this.buttonText.getBounds();
    }
  }

  private onLanguageChanged(): void {
    this.scene.translation.i18next.on('languageChanged', () => {
      this.adjustTextToButton();
    });
  }
}
