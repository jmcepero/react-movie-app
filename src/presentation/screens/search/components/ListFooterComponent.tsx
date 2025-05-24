import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {primaryRed} from '../../../utils/Colors';

interface FooterProps {
  isLoading: boolean;
  hasError: boolean;
}

export const ListFooterComponent: React.FC<FooterProps> = ({
  isLoading,
  hasError,
}) => {
  if (isLoading || hasError) {
    return (
      <View style={styles.footerComponent}>
        <ActivityIndicator color={primaryRed} size={16} />
      </View>
    );
  }

  return <></>;
};

const styles = StyleSheet.create({
  footerComponent: {
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
