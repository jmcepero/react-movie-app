import {action, makeAutoObservable, runInAction} from 'mobx';
import auth, {
  FirebaseAuthTypes,
  updateProfile,
} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '137817280284-p277vjlo9sa184vkkvem5utv108hlo4b.apps.googleusercontent.com',
});

class AuthStore {
  email: string = '';
  password: string = '';
  name: string = '';
  user: FirebaseAuthTypes.User | null | undefined = undefined;
  loading: boolean | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
    this.authStateListener();
  }

  setUser(user: any) {
    this.user = user;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  onEmailChange(value: string) {
    this.email = value;
  }

  onPasswordChange(value: string) {
    this.password = value;
  }

  onNameChange(value: string) {
    this.name = value;
  }

  async signInWithEmail() {
    try {
      this.setLoading(true);
      await auth().signInWithEmailAndPassword(this.email, this.password);
    } catch (error) {
      runInAction(() => {
        console.error(error);
        this.setLoading(false);
      });
    }
  }

  async registerWithEmail() {
    try {
      this.setLoading(true);
      await auth().createUserWithEmailAndPassword(this.email, this.password);
    } catch (error) {
      runInAction(() => {
        console.error(error);
        this.setLoading(false);
      });
    }
  }

  async signInWithGoogle() {
    try {
      this.setLoading(true);
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      runInAction(() => {
        console.error(error);
        this.setLoading(false);
      });
    }
  }

  authStateListener() {
    auth().onAuthStateChanged(async user => {
      if (user) {
        const isUserVerify = await this.verifyAccount(user);
        if (isUserVerify) {
          runInAction(() => {
            this.onEmailChange('');
            this.onPasswordChange('');
            this.onNameChange('');
            this.setUser(user);
            this.setLoading(false);
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
          this.setLoading(false);
        });
      }
    });
  }

  async signOut() {
    runInAction(() => {
      this.setLoading(true);
    });
    try {
      await auth().signOut();
      runInAction(() => {
        this.setUser(null);
      });
    } catch (error) {
      console.error(error);
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
}

export default AuthStore;
