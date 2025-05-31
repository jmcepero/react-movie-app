import {View, Text, StyleSheet} from 'react-native';
import {fullWidth} from '../../utils/Dimen';
import {Images} from '../../../../assets/images/Images.index';
import {getFontFamily} from '../../utils/Fonts';
import {primaryTextColor, secondaryTextColor} from '../../utils/Colors';
import {Image} from 'expo-image';

const ConexionLostComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.graphicContainer}>
        <Image
          source={Images.conexionLost}
          style={styles.graphicImage}
          contentFit="contain"
        />
      </View>

      <Text style={styles.title}>Oops!!</Text>
      <Text style={styles.subtitle}>
        Seems your internet took a coffee break ☕️
        {'\n'}
        Check your network and give it a nudge!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 120,
  },
  graphicContainer: {
    width: '100%',
    height: fullWidth * 0.6,
  },
  graphicImage: {
    height: fullWidth * 0.6,
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
  },
});

export default ConexionLostComponent;
