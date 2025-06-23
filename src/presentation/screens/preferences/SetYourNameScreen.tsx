import { StyleSheet, Text, View } from 'react-native';
import { useContext, useEffect } from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import { Toolbar } from '../../components/base/Toolbar';
import { getFontFamily } from '../../utils/Fonts';
import RNInput from '../../components/base/RNInput';
import AuthStore from '../auth/store/AuthStore';
import RNMovieButton from '../../components/base/RNMovieButton';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import UserNameStore from './store/UserNameStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Images } from '../../../assets/images/Images.index';
import { fullHeight, fullWidth } from '../../utils/Dimen';
import {
  darkBlueColor,
  darkColor,
  primaryBackgroundColor,
  primaryBlackColor,
} from '../../utils/Colors';

const SetYourNameScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { userNameStore, authStore } = useContext(MobXProviderContext) as {
    userNameStore: UserNameStore;
    authStore: AuthStore;
  };
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleOnFinish = () => {
    navigation.navigate('SetGnresPreferences');
  };

  useEffect(() => {
    if (authStore.user) {
      userNameStore.onScreenLoaded(authStore.user);
    }
  }, [authStore.user]);

  return (
    <View style={styles.container}>
      <Toolbar title={'Hello cinephile!! 🍿'} showBackArrow={false} />
      <Text style={styles.descriptionText}>
        Welcome to RNMovie where you can view information about your favorite
        movies and series. So, tell us what you would like to be called?
      </Text>
      <RNInput
        textValue={userNameStore.name}
        onChange={value => userNameStore.onNameChange(value)}
        placeholder={'Enter your name'}
        iconName={'person'}
        style={styles.input}
      />
      <View style={styles.container}>
        <Image source={Images.kid} style={styles.image} contentFit="contain" />
      </View>
      <View style={[styles.buttonContainer]}>
        <RNMovieButton
          onClick={() => userNameStore.saveDisplayName(handleOnFinish)}
          label="Continue"
          style={{ marginBottom: bottom }}
          isLoading={userNameStore.loading}
        />
      </View>
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
  buttonContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: darkColor,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    height: fullHeight * 0.4,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
