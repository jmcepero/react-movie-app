import React, {useContext, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Images} from '../../../../assets/images/Images.index';
import {getFontFamily} from '../../utils/Fonts';
import {MobXProviderContext, observer} from 'mobx-react';
import AuthStore from '../../screens/auth/store/AuthStore';

interface CustomToolbarProps {
  title: string;
  onUserIconClicked?: () => void;
}

const CustomToolbar = ({title, onUserIconClicked}: CustomToolbarProps) => {
  const {authStore} = useContext(MobXProviderContext) as {
    authStore: AuthStore;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => onUserIconClicked?.()}>
        <Image
          style={styles.avatar}
          source={
            authStore.user?.photoURL
              ? {
                  uri: authStore.user.photoURL,
                }
              : Images.user
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default observer(CustomToolbar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    marginTop: 8,
  },
  title: {
    fontFamily: getFontFamily('normal'),
    fontSize: 36,
    color: 'white',
  },
  avatar: {
    borderRadius: 100,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
