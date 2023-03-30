import React from 'react'
import Lottie from 'lottie-react-native';
import { LottieJson } from '../../../../assets/lottie/LottieJson.index';

export default function Animation() {
  return (
    <Lottie style={{
        width: 80,
        height: 80,
        alignSelf: 'center'
    }} source={LottieJson.loading} autoPlay loop />
  );
}
