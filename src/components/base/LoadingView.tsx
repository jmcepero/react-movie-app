import React from 'react'
import Lottie from 'lottie-react-native';
import { LottieJson } from '../../../assets/lottie/LottieJson.index';

export default function Animation() {
  return (
    <Lottie style={{
        width: 100,
        height: 100,
        alignSelf: 'center'
    }} source={LottieJson.loading} autoPlay loop />
  );
}
