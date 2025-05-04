import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { useSettingsStore } from '@/stores/settings-store';
import { FontEnum } from '../enums/font-enum';

export class BootScene extends Scene {
  constructor() {
    super(SceneEnum.Boot);
  }

  preload() {
    this.load.image(ImageEnum.Background, 'assets/images/background.jpeg');
    this.load.image(ImageEnum.LoadingBar, 'assets/images/bars/loading_bar.png');
    this.load.image(ImageEnum.LoadingFullBar, 'assets/images/bars/loading_full_bar.png');
    this.loadFonts();
    this.loadTranslation();
  }

  create() {
    this.translation.i18next.on('languageChanged', () => {
      this.translation.i18next.off('languageChanged');
      this.scene.start(SceneEnum.Preloader);
    });
    this.createLoadingText();
  }

  private loadTranslation(): void {
    this.translation.initI18Next(this, {
      lng: 'en',
      fallbackLng: 'en',
      ns: 'ui',
      debug: false,
      backend: {
        loadPath: 'assets/locales/{{lng}}/{{ns}}.json',
      },
    });
  }

  private loadFonts(): void {
    this.load.font(FontEnum.AlineaSans, 'assets/fonts/Alinea/AlineaSansW01Regular.ttf');
    this.load.font(FontEnum.CinzelBlack, 'assets/fonts/Cinzel/Cinzel-Black.ttf');
    this.load.font(FontEnum.CinzelBold, 'assets/fonts/Cinzel/Cinzel-Bold.ttf');
    this.load.font(FontEnum.CinzelRegular, 'assets/fonts/Cinzel/Cinzel-Regular.ttf');
    this.load.font(FontEnum.CinzelDecorativeBlack, 'assets/fonts/Cinzel_Decorative/CinzelDecorative-Black.ttf');
    this.load.font(FontEnum.CinzelDecorativeBold, 'assets/fonts/Cinzel_Decorative/CinzelDecorative-Bold.ttf');
    this.load.font(FontEnum.CinzelDecorativeRegular, 'assets/fonts/Cinzel_Decorative/CinzelDecorative-Regular.ttf');
    this.load.font(FontEnum.Dosis, 'assets/fonts/Dosis/Dosis-SemiBold.ttf');
    this.load.font(FontEnum.RalewayBold, 'assets/fonts/Raleway/Raleway-Bold.ttf');
    this.load.font(FontEnum.RalewayRegular, 'assets/fonts/Raleway/Raleway-Regular.ttf');
    this.load.font(FontEnum.SFUIDisplayBold, 'assets/fonts/SFUIDisplay/SFUIDisplay-Bold.ttf');
    this.load.font(FontEnum.SFUIDisplayRegular, 'assets/fonts/SFUIDisplay/SFUIDisplay-Regular.ttf');
    this.load.font(FontEnum.HelveticaNowBold, 'assets/fonts/HelveticaNow/HelveticaNowText-Bold.ttf');
    this.load.font(FontEnum.HelveticaNowRegular, 'assets/fonts/HelveticaNow/HelveticaNowText-Regular.ttf');
  }

  private createLoadingText(): void {
    const settingsStore = useSettingsStore();
    settingsStore.setDefaultLanguage(this);
    const textObject = this.add.text(0, 0, '', { color: 'black' }).setAlpha(1);
    textObject.translation = this.translation.add(textObject, {
      translationKey: 'loading',
      interpolation: ['...'],
    });
  }
}
