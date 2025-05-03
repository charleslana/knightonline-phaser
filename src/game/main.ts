import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import TextTranslationPlugin from 'phaser3-rex-plugins/plugins/texttranslation-plugin.js';
import { AUTO, Game } from 'phaser';
import { BootScene } from './scenes/BootScene';
import { FontPlugin } from 'phaser-font-plugin';
import { HomeScene } from './scenes/HomeScene';
import { LoginScene } from './scenes/LoginScene';
import { PreloaderScene } from './scenes/PreloaderScene';
import { RegisterScene } from './scenes/RegisterScene';

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  banner: false,
  audio: {
    disableWebAudio: true,
  },
  parent: 'game-container',
  backgroundColor: '#ffffff',
  render: {
    pixelArt: false,
    roundPixels: true,
  },
  scene: [BootScene, PreloaderScene, LoginScene, RegisterScene, HomeScene],
  plugins: {
    global: [
      {
        key: 'FontPlugin',
        plugin: FontPlugin,
        start: true,
      },
    ],
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI',
      },
      {
        key: 'rexTextTranslation',
        plugin: TextTranslationPlugin,
        start: true,
        mapping: 'translation',
      },
    ],
  },
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
