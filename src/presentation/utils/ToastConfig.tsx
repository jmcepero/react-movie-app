import {BaseToastProps, ErrorToast} from 'react-native-toast-message';
import {getFontFamily} from './Fonts';
import {StyleSheet} from 'react-native';
import {onyxColor, primaryRed, primaryTextColor, tabColor} from './Colors';

export const toastConfig = {
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={styles.container}
      text1Style={{
        fontFamily: getFontFamily('bold'),
        color: primaryTextColor,
      }}
      text2Style={{
        fontFamily: getFontFamily('thin'),
        color: primaryTextColor,
      }}
    />
  ),
};

const styles = StyleSheet.create({
  container: {
    borderLeftColor: primaryRed,
    backgroundColor: onyxColor,
  },
});
