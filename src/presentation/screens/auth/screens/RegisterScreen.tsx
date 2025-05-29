import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {primaryBackgroundColor, primaryRed} from '../../../utils/Colors';
import {getFontFamily} from '../../../utils/Fonts';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import {fullWidth} from '../../../utils/Dimen';
import {Images} from '../../../../../assets/images/Images.index';
import NameInput from '../components/NameInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MobXProviderContext, observer} from 'mobx-react';
import AuthStore from '../store/AuthStore';
import RNInput from '../../../components/base/RNInput';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginSchema} from '../components/form/LoginSchema';
import RNMovieButton from '../../../components/base/RNMovieButton';

const RegisterScreen = observer(() => {
  const {authStore} = useContext(MobXProviderContext) as {
    authStore: AuthStore;
  };
  const {
    control,
    formState: {isValid},
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: authStore.registerEmail,
      password: authStore.registerPassword,
    },
    mode: 'onChange',
  });
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={{flex: 1}}>
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
                    authStore.onRegisterEmailChange(value);
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
                    authStore.onRegisterPasswordChange(value);
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
              onClick={() => authStore.registerWithEmail()}
              label="Sign up"
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
            label="Sign up with Googgle"
            style={styles.buttonGoogle}
            leftIcon={Images.google}
          />

          <View style={styles.signUpContainer}>
            <Text style={styles.dontHaveAccountText}>
              Already have an account?
            </Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.goBack()}>
              <Text style={styles.signUpText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.buttonSquare}>
        <View style={styles.blurView} />
        <Icon style={styles.icon} name="arrow-back-outline" size={28} />
      </TouchableOpacity>
    </View>
  );
});

export default RegisterScreen;

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
  buttonSquare: {
    position: 'absolute',
    borderRadius: 8,
    width: 40,
    height: 40,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    top: 16,
    start: 16,
  },
  blurView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
    backgroundColor: 'rgba(46,35,49, 0.9)',
  },
  icon: {
    color: 'white',
  },
});
