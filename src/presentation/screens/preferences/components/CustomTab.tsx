import {JSX} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  NavigationState,
  Route,
  SceneRendererProps,
  TabDescriptor,
} from 'react-native-tab-view';
import {fullWidth} from '../../../utils/Dimen';
import {getFontFamily} from '../../../utils/Fonts';
import {primaryBlackColor} from '../../../utils/Colors';

export interface CustomTabBarRendererProps extends SceneRendererProps {
  navigationState: NavigationState<Route>;
  options?: Record<string, TabDescriptor<Route>>;
  jumpTo: (key: string) => void;
}

export const renderTabBar = (props: CustomTabBarRendererProps): JSX.Element => {
  const inputRange = props.navigationState.routes.map((_x, i) => i);
  const tabWidth = fullWidth / props.navigationState.routes.length;
  const translateX = props.position.interpolate({
    inputRange,
    outputRange: inputRange.map(i => i * tabWidth),
  });
  return (
    <View style={styles.tabBarContainer}>
      {props.navigationState.routes.map((route: Route, i: number) => {
        const opacity = props.position.interpolate({
          inputRange,
          outputRange: inputRange.map((inputIndex: number) =>
            inputIndex === i ? 1 : 0.5,
          ),
        });

        const color = props.position.interpolate({
          inputRange,
          outputRange: inputRange.map(
            (inputIndex: number) => (inputIndex === i ? '#FFFFFF' : '#E0E0E0'), // Blanco para activo, gris claro para inactivo
          ),
        });

        return (
          <TouchableOpacity
            style={styles.tabBarItem}
            key={route.key}
            onPress={() => props.jumpTo(route.key)}
            activeOpacity={0.7}>
            <Animated.Text
              style={[
                styles.tabBarLabelBase,
                {
                  opacity,
                  color,
                },
              ]}>
              {route.title}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
      <Animated.View
        style={[
          styles.indicator,
          {
            width: tabWidth,
            transform: [{translateX}],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    width: fullWidth,
    height: 40,
    backgroundColor: primaryBlackColor,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabelBase: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontFamily: getFontFamily('medium'),
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2, // Altura del indicador
    backgroundColor: '#FFFFFF', // Color del indicador
    borderTopLeftRadius: 3, // Opcional: bordes redondeados
    borderTopRightRadius: 3,
  },
});
