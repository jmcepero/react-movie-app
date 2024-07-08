import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BackButton} from '../../../components/base/BackButton';
import {detailImageStyle} from '../../../components/detail/DetailImage.style';
import {CrossFadeImages} from './CrossFadeImages';

const {width, height} = Dimensions.get('window');

interface ImageCarouselProps {
  images: string[];
  onBackClicked: () => void;
}

const DetailPeopleImage: React.FC<ImageCarouselProps> = ({
  images,
  onBackClicked,
}) => {
  if (images.length === 1) {
    return (
      <View
        style={{
          width: '100%',
          height: height * 0.62,
        }}>
        <Image source={{uri: images[0]}} style={detailImageStyle.image} />
        <LinearGradient
          style={detailImageStyle.gradient}
          colors={['transparent', 'rgba(23, 24, 27, 1)']}
          locations={[0.5, 0.9]}
        />
        <BackButton onClicked={onBackClicked} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CrossFadeImages images={images} interval={3000} />
      <LinearGradient
        style={detailImageStyle.gradient}
        colors={['transparent', 'rgba(23, 24, 27, 1)']}
        locations={[0.5, 0.9]}
      />
      <BackButton onClicked={onBackClicked} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.62,
    position: 'relative',
  },
  image: {
    width: width,
    height: '100%',
  },
});

export default DetailPeopleImage;
