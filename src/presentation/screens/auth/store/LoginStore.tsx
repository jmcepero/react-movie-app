import {makeAutoObservable, runInAction} from 'mobx';
import AuthStore from './AuthStore';
import {authInstance, defaultAppInstance} from '../../../utils/Firebase';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {getAuthErrorMessage} from '../constants/AuthErrors';

class LoginStore {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  googleLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  onEmailChange(value: string) {
    this.email = value;
  }

  onPasswordChange(value: string) {
    this.password = value;
  }

  setGoogleLoading(loading: boolean) {
    this.googleLoading = loading;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  async signInWithEmail() {
    try {
      this.setLoading(true);
      await authInstance.signInWithEmailAndPassword(this.email, this.password);
      this.resetForm();
    } catch (error: any) {
      runInAction(() => {
        console.log(error.code);
        this.error = getAuthErrorMessage(error.code ?? 'app/unknown-error');
        this.loading = false;
      });
    }
  }

  async signInWithGoogle() {
    try {
      this.setGoogleLoading(true);
      if (!(await GoogleSignin.hasPlayServices())) {
        throw {code: 'app/google-play-services'};
      }
      const result = await GoogleSignin.signIn();
      if (!result?.data?.idToken) {
        throw {code: 'app/incomplete-user-data'};
      }
      const googleCredential = auth.GoogleAuthProvider.credential(
        result.data.idToken,
      );
      await authInstance.signInWithCredential(googleCredential);
    } catch (error: any) {
      runInAction(() => {
        this.error = getAuthErrorMessage(error.code ?? 'app/unknown-error');
        this.setGoogleLoading(false);
      });
    }
  }

  resetForm() {
    this.email = '';
    this.password = '';
    this.error = null;
    this.loading = false;
  }

  onErrorHide() {
    this.error = null;
  }
}

export default LoginStore;
