import {BaseToastProps, ErrorToast} from 'react-native-toast-message';
import {getFontFamily} from './Fonts';
import {StyleSheet} from 'react-native';
import {onyxColor, primaryRed, primaryTextColor, tabColor} from './Colors';
import {fullWidth} from './Dimen';

export const toastConfig = {
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={styles.container}
      text1Style={{
        fontFamily: getFontFamily('bold'),
        color: primaryTextColor,
        fontSize: 14,
      }}
      text2Style={{
        fontFamily: getFontFamily('thin'),
        color: primaryTextColor,
        fontSize: 13,
      }}
    />
  ),
};

const styles = StyleSheet.create({
  container: {
    width: fullWidth - 32,
    borderLeftColor: primaryRed,
    backgroundColor: onyxColor,
  },
});
