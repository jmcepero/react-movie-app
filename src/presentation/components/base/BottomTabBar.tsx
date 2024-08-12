import React from 'react';

import {View, Pressable, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');
const icons = [
  'home-outline',
  'tv-outline',
  'navigate-circle-outline',
  'person-outline',
];

const BottomTabBar = ({state, navigation}: any) => {
  return (
    <View style={styles.root}>
      <View style={styles.mainContainer}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <View key={index} style={styles.mainItemContainer}>
              <Pressable onPress={onPress}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Icon
                    name={icons[index]}
                    size={24}
                    style={{
                      color: isFocused ? '#988396' : 'rgba(152,131,150,0.3)',
                    }}
                  />
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    height: 56,
    bottom: 18,
    left: 0,
    right: 0,
    borderRadius: 25,
    marginHorizontal: width * 0.1,
    overflow: 'hidden',
    backgroundColor: 'rgba(33,25,32,1)',
    elevation: 16,
  },
  mainContainer: {
    flexDirection: 'row',
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 1,
    borderColor: '#333B42',
  },
});

export default BottomTabBar;
