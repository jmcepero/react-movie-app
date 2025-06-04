import {makeAutoObservable, runInAction} from 'mobx';
import auth, {
  FirebaseAuthTypes,
  updateProfile,
} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {isUserCompleteOnBoardingUseCase} from '../../../../domain/preferences/usecases/IsUserCompleteOnBoardingUseCase';
import {defaultAppInstance} from '../../../utils/Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  webClientId:
    '137817280284-p277vjlo9sa184vkkvem5utv108hlo4b.apps.googleusercontent.com',
});

class AuthStore {
  loginEmail: string = '';
  loginPassword: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  name: string = '';
  user: FirebaseAuthTypes.User | null | undefined = undefined;
  loading: boolean | undefined = undefined;
  googleLoading: boolean | undefined = undefined;
  error: string | null = null;
  isFirstTimeOpeningApp: boolean | null = null;
  isOnBoardingComplete: boolean | undefined = undefined;
  authInstance = auth(defaultAppInstance);

  constructor() {
    makeAutoObservable(this);
    this.authStateListener();
    this.checkIfFirstTimeOpeningApp();
  }

  setUser(user: any) {
    this.user = user;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  onEmailChange(value: string) {
    this.loginEmail = value;
  }

  onPasswordChange(value: string) {
    this.loginPassword = value;
  }

  onRegisterEmailChange(value: string) {
    this.registerEmail = value;
  }

  onRegisterPasswordChange(value: string) {
    this.registerPassword = value;
  }

  onNameChange(value: string) {
    this.name = value;
  }

  setGoogleLoading(loading: boolean) {
    this.googleLoading = loading;
  }

  setIsOnBoardingComplete(value: boolean | undefined) {
    this.isOnBoardingComplete = value;
  }

  async signInWithEmail() {
    try {
      this.setLoading(true);
      await this.authInstance.signInWithEmailAndPassword(
        this.loginEmail,
        this.loginPassword,
      );
    } catch (error) {
      runInAction(() => {
        this.error = 'Incorrect username or password 😔';
        this.setLoading(false);
      });
    }
  }

  async registerWithEmail() {
    try {
      this.setLoading(true);
      await this.authInstance.createUserWithEmailAndPassword(
        this.registerEmail,
        this.registerPassword,
      );
    } catch (error) {
      runInAction(() => {
        console.error(error);
        this.setLoading(false);
      });
    }
  }

  async signInWithGoogle() {
    try {
      this.setGoogleLoading(true);
      if (!(await GoogleSignin.hasPlayServices())) {
        throw new Error('Google Play Services no disponibles');
      }
      const result = await GoogleSignin.signIn();
      if (!result?.data?.idToken) {
        throw new Error('Fallo en autenticación: Datos de usuario incompletos');
      }
      const googleCredential = auth.GoogleAuthProvider.credential(
        result.data.idToken,
      );
      await this.authInstance.signInWithCredential(googleCredential);
    } catch (error) {
      runInAction(() => {
        console.error(error);
        this.setGoogleLoading(false);
      });
    }
  }

  authStateListener() {
    this.authInstance.onAuthStateChanged(async user => {
      if (user) {
        const isUserVerify = await this.verifyAccount(user);
        const onBoardingComplete = await this.checkIfOnBoardingComplete(
          user.uid,
        );
        if (isUserVerify) {
          runInAction(() => {
            this.onEmailChange('');
            this.onPasswordChange('');
            this.onNameChange('');
            this.setUser(user);
            this.setIsOnBoardingComplete(onBoardingComplete);
            this.setLoading(false);
            this.setGoogleLoading(false);
          });
        } else {
          await auth().signOut();
        }
      } else {
        runInAction(() => {
          this.onEmailChange('');
          this.onPasswordChange('');
          this.onNameChange('');
          this.setUser(null);
          this.setIsOnBoardingComplete(false);
          this.setLoading(false);
          this.setGoogleLoading(false);
        });
      }
    });
  }

  async signOut() {
    runInAction(() => {
      this.setLoading(true);
    });
    try {
      await this.authInstance.signOut();
      runInAction(() => {
        this.setUser(null);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async verifyAccount(user: FirebaseAuthTypes.User): Promise<boolean> {
    try {
      const idTokenResult = await user.getIdTokenResult(true);
      if (idTokenResult.claims && idTokenResult.claims.deleted) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log('Error fetching token result: ', error);
      return false;
    }
  }

  async checkIfOnBoardingComplete(uid: string): Promise<boolean | undefined> {
    try {
      const value = await isUserCompleteOnBoardingUseCase.execute(uid);
      return value;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  onErrorHide() {
    runInAction(() => {
      this.error = null;
    });
  }

  async saveDisplayName(onFinish: Function) {
    if (this.user) {
      try {
        // Actualiza el perfil del usuario
        await updateProfile(this.user, {
          displayName: this.name,
        });
        console.log('Nombre guardado');
      } catch (error) {
        console.error(error);
        // Maneja errores aquí, como mostrar un mensaje al usuario
      } finally {
        onFinish();
      }
    }
  }

  async checkIfFirstTimeOpeningApp() {
    try {
      const hasOpenedApp = await AsyncStorage.getItem('hasOpenedApp');

      runInAction(() => {
        this.isFirstTimeOpeningApp = hasOpenedApp === null;
      });
    } catch (error) {
      console.log('Error checking first time:', error);
      runInAction(() => {
        this.isFirstTimeOpeningApp = false;
      });
    }
  }

  async markAppAsOpened() {
    try {
      await AsyncStorage.setItem('hasOpenedApp', 'true');
      runInAction(() => {
        this.isFirstTimeOpeningApp = false;
      });
    } catch (error) {
      console.log('Error marking app as opened:', error);
    }
  }
}

export default AuthStore;
