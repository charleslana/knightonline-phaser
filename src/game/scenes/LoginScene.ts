import * as Phaser from 'phaser';
import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { Version } from '../shared/Version';
import { Background } from '../shared/Background';
import { Logo } from '../shared/Logo';
import { Button1 } from '../shared/Button1';
import { Footer } from '../shared/Footer';

export class LoginScene extends Scene {
  constructor() {
    super(SceneEnum.Login);
  }

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
    });
  }
}
