import {StyleSheet} from 'react-native';
import {fullWidth} from '../../../utils/Dimen';
import {getFontFamily} from '../../../utils/Fonts';
import {primaryTextColor, secondaryTextColor} from '../../../utils/Colors';

export const emptyStateStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  graphicContainer: {
    width: '100%',
    height: fullWidth * 0.6,
    marginBottom: 24,
  },
  graphicImage: {
    height: fullWidth * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: getFontFamily('bold'),
    color: primaryTextColor,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: getFontFamily('normal'),
    fontSize: 16,
    color: secondaryTextColor,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
});
