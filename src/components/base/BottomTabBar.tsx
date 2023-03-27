import React from 'react';

import { View, Pressable, Dimensions, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { BlurView } from '@react-native-community/blur';

const { width } = Dimensions.get('window')
const icons = ["home-outline", "tv-outline", "navigate-circle-outline", "person-outline"]

const BottomTabBar = ({ state, navigation }: any) => {
    return (
        <View>
            <BlurView reducedTransparencyFallbackColor="dark" style={styles.blurContainer} blurType="dark" blurAmount={20} />
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
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, padding: 8 }}>
                                    <Icon name={icons[index]} size={24} style={{ color: isFocused ? 'rgba(123,68,194,0.7)' : 'rgba(152,131,150,0.3)' }} />
                                </View>
                            </Pressable>
                        </View>
                    );
                })}
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 25,
        borderRadius: 25,
        marginHorizontal: width * 0.1,
        // backgroundColor: '#211920'
    },
    mainItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 1,
        borderColor: "#333B42"
    },
    blurContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
})


export default BottomTabBar; 