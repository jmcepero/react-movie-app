import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {primaryBackgroundColor, primaryRed} from '../../../utils/Colors';
import {getFontFamily} from '../../../utils/Fonts';
import {Images} from '../../../../../assets/images/Images.index';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MobXProviderContext, observer} from 'mobx-react';
import AuthStore from '../store/AuthStore';
import RNMovieButton from '../../../components/base/RNMovieButton';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginSchema} from '../components/form/LoginSchema';
import {Controller, useForm} from 'react-hook-form';
import Toast from 'react-native-toast-message';
import RNInput from '../../../components/base/RNInput';

const LoginScreen = observer(() => {
  const {authStore} = useContext(MobXProviderContext) as {
    authStore: AuthStore;
  };

  const {
    control,
    formState: {isValid},
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: authStore.loginEmail,
      password: authStore.loginPassword,
    },
    mode: 'onChange',
  });

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  useEffect(() => {
    if (authStore.error) {
      Toast.show({
        type: 'error',
        text1: 'Invalid credentials',
        text2: authStore.error,
        onHide: () => {
          authStore.onErrorHide();
        },
      });
    }
  }, [authStore.error]);

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
          <Controller
            control={control}
            name="email"
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <RNInput
                onBlur={onBlur}
                textValue={value}
                onChange={value => {
                  onChange(value);
                  authStore.onEmailChange(value);
                }}
                error={error}
                iconName="mail"
                placeholder="Email"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <RNInput
                onBlur={onBlur}
                textValue={value}
                onChange={value => {
                  onChange(value);
                  authStore.onPasswordChange(value);
                }}
                error={error}
                iconName="lock-closed"
                placeholder="Password"
                secureTextEntry
              />
            )}
          />

          <RNMovieButton
            isLoading={authStore.loading}
            onClick={() => authStore.signInWithEmail()}
            label="Sign in"
            style={styles.buttonProvider}
            disabled={!isValid}
          />
        </View>

        <View style={styles.containerOr}>
          <View style={styles.line}></View>
          <Text style={styles.textOr}>Or</Text>
        </View>

        <RNMovieButton
          isLoading={authStore.googleLoading}
          onClick={() => authStore.signInWithGoogle()}
          label="Continue with Google"
          style={styles.buttonGoogle}
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
    marginHorizontal: 16,
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
    marginHorizontal: 16,
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
