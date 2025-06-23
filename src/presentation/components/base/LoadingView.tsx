import Lottie from 'lottie-react-native';
import { LottieJson } from '../../../assets/lottie/LottieJson.index';
import { View } from 'react-native';

export const LoadingView = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <Lottie
        style={{
          width: 80,
          height: 80,
          alignSelf: 'center',
        }}
        source={LottieJson.loading}
        autoPlay
        loop
      />
    </View>
  );
};
