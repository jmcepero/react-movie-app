import Lottie from 'lottie-react-native';
import { LottieJson } from '../../../assets/lottie/LottieJson.index';

export default function SpinnerLottie() {
  return (
    <Lottie
      style={{
        width: 80,
        height: 30,
      }}
      source={LottieJson.spinner}
      autoPlay
      loop
      resizeMode="cover"
    />
  );
}
