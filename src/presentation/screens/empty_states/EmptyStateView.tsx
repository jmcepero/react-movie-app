import React from 'react';
import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {Image} from 'expo-image';
import {ImageSource} from 'expo-image';
import {emptyStateStyles} from './styles/EmptyState.styles';
import RNMovieButton from '../../components/base/RNMovieButton';

interface EmptyStateViewProps {
  image: ImageSource;
  title: string;
  subtitle: string;
  buttonLabel?: string;
  onButtonPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const EmptyStateView: React.FC<EmptyStateViewProps> = ({
  image,
  title,
  subtitle,
  buttonLabel = 'Try Again',
  onButtonPress,
  containerStyle,
}) => {
  return (
    <View style={[emptyStateStyles.container, containerStyle]}>
      <View style={emptyStateStyles.graphicContainer}>
        <Image
          source={image}
          style={emptyStateStyles.graphicImage}
          contentFit="contain"
        />
      </View>

      <Text style={emptyStateStyles.title}>{title}</Text>
      <Text style={emptyStateStyles.subtitle}>{subtitle}</Text>

      {onButtonPress && (
        <RNMovieButton label={buttonLabel} onClick={onButtonPress} />
      )}
    </View>
  );
};

export default EmptyStateView;
