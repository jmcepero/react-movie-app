import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {useContext, useEffect} from 'react';
import {Images} from '../../../../../assets/images/Images.index';
import Icon from 'react-native-vector-icons/Ionicons';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MobXProviderContext, observer} from 'mobx-react';
import RNInput from '../../../components/base/RNInput';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginSchema, registerSchema} from '../components/form/LoginSchema';
import RNMovieButton from '../../../components/base/RNMovieButton';
import RegisterStore from '../store/RegisterStore';
import LoginStore from '../store/LoginStore';
import {styles} from '../styles/RegisterScreen.styles';
import Toast from 'react-native-toast-message';

const RegisterScreen = () => {
  const {registerStore, loginStore} = useContext(MobXProviderContext) as {
    registerStore: RegisterStore;
    loginStore: LoginStore;
  };
  const {
    control,
    formState: {isValid},
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: registerStore.email,
      password: registerStore.password,
    },
    mode: 'onChange',
  });
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  useEffect(() => {
    if (registerStore.error) {
      Toast.show({
        type: 'error',
        text1: 'Register Failed!',
        text2: registerStore.error,
        visibilityTime: 6000,
        topOffset: 70,
        onHide: () => {
          registerStore.onErrorHide();
        },
      });
    }
  }, [registerStore.error]);

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
                    registerStore.onEmailChange(value);
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
                    registerStore.onPasswordChange(value);
                  }}
                  error={error}
                  iconName="lock-closed"
                  placeholder="Password"
                  secureTextEntry
                />
              )}
            />
            <RNMovieButton
              isLoading={registerStore.loading}
              onClick={() => registerStore.registerWithEmail()}
              label="Sign up"
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
};

export default observer(RegisterScreen);
