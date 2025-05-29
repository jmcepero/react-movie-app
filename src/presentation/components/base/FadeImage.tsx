import { useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageErrorEventData,
  ImageStyle,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';
import {useFadeAnimation} from '../../hooks/useFadeAnimation';

interface Props {
  id: string;
  uri: string;
  style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({id, uri, style = {}}: Props) => {
  const {opacity, fadeIn} = useFadeAnimation();
  const [isLoading, setIsLoading] = useState(true);
  const combinedStyle = StyleSheet.flatten([style, {opacity}]);

  const finishLoading = () => {
    setIsLoading(false);
    fadeIn();
  };

  const onError = (err: NativeSyntheticEvent<ImageErrorEventData>) => {
    setIsLoading(false);
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        ...(style as any),
      }}>
      {isLoading && (
        <ActivityIndicator
          style={{position: 'absolute'}}
          color="grey"
          size={30}
        />
      )}

      <Animated.Image
        key={id}
        source={{uri: uri}}
        onError={onError}
        onLoad={finishLoading}
        style={combinedStyle}
      />
    </View>
  );
};
