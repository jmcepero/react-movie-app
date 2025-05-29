import {View, Text, StyleSheet, Image} from 'react-native';
import {fullWidth} from '../../utils/Dimen';
import {Images} from '../../../../assets/images/Images.index';
import {getFontFamily} from '../../utils/Fonts';
import {primaryTextColor, secondaryTextColor} from '../../utils/Colors';

const NoResultsComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.graphicContainer}>
        <Image
          source={Images.noResult}
          style={styles.graphicImage}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>No Results</Text>
      <Text style={styles.subtitle}>
        Sorry, there are no results for this search.
        {'\n'}
        Please try another phrase
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
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
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

export default NoResultsComponent;
