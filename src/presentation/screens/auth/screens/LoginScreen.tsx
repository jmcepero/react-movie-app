import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useContext} from 'react';
import {primaryBackgroundColor, primaryRed} from '../../../utils/Colors';
import {getFontFamily} from '../../../utils/Fonts';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import {fullWidth} from '../../../utils/Dimen';
import {Images} from '../../../../../assets/images/Images.index';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {observable} from 'mobx';
import {MobXProviderContext, observer} from 'mobx-react';
import AuthStore from '../store/AuthStore';
import SpinnerLottie from '../../../components/base/SpinnerLottie';
import RNMovieButton from '../../../components/base/RNMovieButton';

const LoginScreen = observer(() => {
  const {authStore} = useContext(MobXProviderContext) as {
    authStore: AuthStore;
  };
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
      }}>
      <View>
        <View style={styles.textRNContainer}>
          <Text style={styles.textRN}>RN</Text>
          <Text style={styles.textMovie}>movie</Text>
        </View>

        <View style={styles.inputContainer}>
          <EmailInput
            textValue={authStore.email}
            onChange={value => authStore.onEmailChange(value)}
          />
          <PasswordInput
            textValue={authStore.password}
            onChange={value => authStore.onPasswordChange(value)}
          />

          <RNMovieButton
            isLoading={authStore.loading}
            onClick={() => authStore.signInWithEmail()}
            label="Sign in"
            styles={styles.buttonProvider}
          />
        </View>

        <View style={styles.containerOr}>
          <View style={styles.line}></View>
          <Text style={styles.textOr}>Or</Text>
        </View>

        <RNMovieButton
          isLoading={authStore.loading}
          onClick={() => authStore.signInWithGoogle()}
          label="Continue with Google"
          styles={styles.buttonGoogle}
          leftIcon={Images.google}
        />

        <View style={styles.signUpContainer}>
          <Text style={styles.dontHaveAccountText}>Don't have an account?</Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
});

export default LoginScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 16,
    gap: 8,
  },
  textRNContainer: {
    alignSelf: 'center',
  },
  textRN: {
    color: primaryRed,
    fontFamily: getFontFamily('bold'),
    fontSize: 68,
  },
  textMovie: {
    color: 'white',
    fontFamily: getFontFamily('bold'),
    fontSize: 28,
    top: -13,
    start: 4,
    letterSpacing: 3.3,
  },
  buttonProvider: {
    marginTop: 24,
  },
  buttonText: {
    fontFamily: 'Archivo-Medium',
    fontSize: 18,
    color: 'white',
    padding: 16,
    textAlign: 'center',
    flex: 1,
  },
  textOr: {
    position: 'absolute',
    color: '#988396',
    fontFamily: getFontFamily('normal'),
    fontSize: 12,
    backgroundColor: primaryBackgroundColor,
    width: 30,
    textAlign: 'center',
  },
  containerOr: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 42,
    marginVertical: 24,
    justifyContent: 'center',
  },
  line: {
    height: 0.6,
    flex: 1,
    backgroundColor: '#988396',
    opacity: 0.3,
  },
  buttonGoogle: {
    borderColor: primaryRed,
    borderWidth: 0.5,
    backgroundColor: 'rgba(19,20,24,1)',
  },
  googleTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 22,
    height: 22,
  },
  googleText: {
    fontFamily: 'Archivo-Medium',
    fontSize: 18,
    color: 'white',
    padding: 16,
    textAlign: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 16,
  },
  dontHaveAccountText: {
    color: '#988396',
    fontFamily: getFontFamily('normal'),
    fontSize: 12,
    textAlign: 'center',
  },
  signUpText: {
    color: primaryRed,
    fontFamily: getFontFamily('bold'),
    fontSize: 12,
    textAlign: 'center',
    marginStart: 4,
  },
});
