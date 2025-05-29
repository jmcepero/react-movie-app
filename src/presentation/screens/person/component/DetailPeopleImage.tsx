import * as React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BackButton} from '../../../components/base/BackButton';
import {detailImageStyle} from '../../../components/detail/DetailImage.style';
import {CrossFadeImages} from './CrossFadeImages';

const {width, height} = Dimensions.get('window');

interface ImageCarouselProps {
  image: string;
  onBackClicked: () => void;
}

const DetailPeopleImage: React.FC<ImageCarouselProps> = ({
  image,
  onBackClicked,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={detailImageStyle.image} />
      <LinearGradient
        style={detailImageStyle.gradient}
        colors={['rgba(19,20,24, 0.65)', 'rgba(19,20,24,1)']}
        locations={[0.5, 0.9]}
      />
      <BackButton onClicked={onBackClicked} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.61,
    position: 'relative',
  },
  image: {
    width: width,
    height: '100%',
  },
});

export default DetailPeopleImage;
