import {isIOS} from './Constants';

export const fontFamilies = {
  ARCHIVO: {
    normal: isIOS() ? 'Archivo-Regular' : 'ArchivoRegular',
    medium: isIOS() ? 'Archivo-Medium' : 'ArchivoMedium',
    bold: isIOS() ? 'Archivo-Black' : 'ArchivoBlack',
    light: isIOS() ? 'Archivo-Light' : 'ArchivoLight',
    thin: isIOS() ? 'Archivo-Thin' : 'ArchivoThin',
  },
  // Adjust the above code to fit your chosen fonts' names
};

export const getFontFamily = (
  weight: 'normal' | 'medium' | 'thin' | 'bold' | 'light',
) => {
  return fontFamilies.ARCHIVO[weight];
};
