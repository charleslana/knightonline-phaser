export enum ImageEnum {
  Background = 'Background',
  LoadingBar = 'LoadingBar',
  LoadingFullBar = 'LoadingFullBar',
  Button1 = 'Button1',
  Button1Hover = 'Button1Hover',
  CloseIcon = 'CloseIcon',
  ModalBackground = 'ModalBackground',
}

export function getImageEnum(value: string): string {
  const enumValue = Object.values(ImageEnum).find(enumValue => enumValue === value);
  return enumValue ?? '';
}
