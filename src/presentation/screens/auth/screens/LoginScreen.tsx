import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {useContext, useEffect} from 'react';
import {Images} from '../../../../../assets/images/Images.index';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MobXProviderContext, observer} from 'mobx-react';
import RNMovieButton from '../../../components/base/RNMovieButton';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginSchema} from '../components/form/LoginSchema';
import {Controller, useForm} from 'react-hook-form';
import Toast from 'react-native-toast-message';
import RNInput from '../../../components/base/RNInput';
import LoginStore from '../store/LoginStore';
import {styles} from '../styles/LoginScreen.styles';

const LoginScreen = () => {
  const {loginStore} = useContext(MobXProviderContext) as {
    loginStore: LoginStore;
  };

  const {
    control,
    formState: {isValid},
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: loginStore.email,
      password: loginStore.password,
    },
    mode: 'onChange',
  });

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  useEffect(() => {
    if (loginStore.error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed!',
        text2: loginStore.error,
        visibilityTime: 6000,
        onHide: () => {
          loginStore.onErrorHide();
        },
      });
    }
  }, [loginStore.error]);

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
                  loginStore.onEmailChange(value);
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
                  loginStore.onPasswordChange(value);
                }}
                error={error}
                iconName="lock-closed"
                placeholder="Password"
                secureTextEntry
              />
            )}
          />

          <RNMovieButton
            isLoading={loginStore.loading}
            onClick={() => loginStore.signInWithEmail()}
            label="Sign in"
            style={styles.buttonProvider}
            enabled={isValid}
          />
        </View>

        <View style={styles.containerOr}>
          <View style={styles.line}></View>
          <Text style={styles.textOr}>Or</Text>
        </View>

        <RNMovieButton
          isLoading={loginStore.googleLoading}
          onClick={() => loginStore.signInWithGoogle()}
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
};

export default observer(LoginScreen);
