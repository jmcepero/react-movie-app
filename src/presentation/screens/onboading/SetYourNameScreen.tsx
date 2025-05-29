import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {MobXProviderContext, observer} from 'mobx-react';
import {Toolbar} from '../../components/base/Toolbar';
import {getFontFamily} from '../../utils/Fonts';
import RNInput from '../../components/base/RNInput';
import AuthStore from '../auth/store/AuthStore';
import RNMovieButton from '../../components/base/RNMovieButton';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const SetYourNameScreen = () => {
  const {authStore} = useContext(MobXProviderContext) as {
    authStore: AuthStore;
  };
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleOnFinish = () => {
    navigation.navigate('SetGnresPreferences');
  };

  return (
    <View style={styles.container}>
      <Toolbar title={'Hello cinephile!! 🍿'} showBackArrow={false} />
      <Text style={styles.descriptionText}>
        Welcome to RNMovie where you can view information about your favorite
        movies and series. So, tell us what you would like to be called?
      </Text>
      <RNInput
        textValue={authStore.name}
        onChange={value => authStore.onNameChange(value)}
        placeholder={'Enter your name'}
        iconName={'person'}
        style={styles.input}
      />
      <View style={styles.container}></View>
      <RNMovieButton
        onClick={() => authStore.saveDisplayName(handleOnFinish)}
        label="Continue"
        style={styles.button}
      />
    </View>
  );
};

export default observer(SetYourNameScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  descriptionText: {
    fontFamily: getFontFamily('normal'),
    fontSize: 16,
    color: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    marginTop: 16,
  },
  button: {
    margin: 16,
  },
});
