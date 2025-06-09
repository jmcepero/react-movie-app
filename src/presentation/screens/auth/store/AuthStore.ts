import {makeAutoObservable, runInAction} from 'mobx';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {isUserCompleteOnBoardingUseCase} from '../../../../domain/preferences/usecases/IsUserCompleteOnBoardingUseCase';
import {authInstance} from '../../../utils/Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  webClientId:
    '137817280284-p277vjlo9sa184vkkvem5utv108hlo4b.apps.googleusercontent.com',
});

class AuthStore {
  user: FirebaseAuthTypes.User | null | undefined = undefined;
  loading: boolean | undefined = undefined;
  error: string | null = null;
  isFirstTimeOpeningApp: boolean | null = null;
  isOnBoardingComplete: boolean | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
    this.initializeStore();
  }

  private async initializeStore() {
    await this.checkIfFirstTimeOpeningApp();
    this.setupAuthStateListener();
  }

  setUser(user: any) {
    this.user = user;
  }

  setIsOnBoardingComplete(value: boolean | undefined) {
    this.isOnBoardingComplete = value;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  private setIsFirstTimeOpeningApp(value: boolean | null) {
    this.isFirstTimeOpeningApp = value;
  }

  onErrorHide() {
    runInAction(() => {
      this.error = null;
    });
  }

  private setupAuthStateListener() {
    authInstance.onAuthStateChanged(async currentUser => {
      if (currentUser) {
        const isUserVerified = await this.verifyAccount(currentUser);
        if (isUserVerified) {
          const onBoardingComplete = await this.checkIfOnBoardingCompleteStatus(
            currentUser.uid,
          );
          runInAction(() => {
            this.setUser(currentUser);
            // Default to false if undefined, or keep null if that's preferred for "not applicable"
            this.setIsOnBoardingComplete(onBoardingComplete);
            this.setLoading(false);
            this.setError(null); // Clear any previous errors on successful auth
          });
        } else {
          // User account might be disabled or marked for deletion
          await this.signOut(); // This will trigger the listener again with user = null
        }
      } else {
        // No user is signed in
        runInAction(() => {
          this.setUser(null);
          this.setIsOnBoardingComplete(false);
          this.setLoading(false);
        });
      }
    });
  }

  async signOut() {
    this.setLoading(true);
    this.setError(null); // Clear previous errors before attempting sign out
    try {
      await authInstance.signOut();
      // authStateListener will handle setting user to null and loading to false.
      // If Google Sign-In was used, also sign out from Google
      if (await GoogleSignin.signInSilently()) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
    } catch (e: any) {
      console.log('Sign out error:', e);
      runInAction(() => {
        this.setError('Failed to sign out. Please try again.'); // Placeholder if getAuthErrorMessage is not used here
        this.setLoading(false); // Ensure loading is reset on sign-out failure
      });
    }
  }

  private async verifyAccount(user: FirebaseAuthTypes.User): Promise<boolean> {
    try {
      // Force refresh the token to get the latest claims
      const idTokenResult = await user.getIdTokenResult(true);
      // If 'deleted' claim exists and is true, account is considered invalid
      return !(idTokenResult.claims && idTokenResult.claims.deleted === true);
    } catch (error) {
      console.log('Error fetching token result for verification: ', error);
      return false; // Assume not verified if an error occurs
    }
  }

  private async checkIfOnBoardingCompleteStatus(
    uid: string,
  ): Promise<boolean | undefined> {
    try {
      return await isUserCompleteOnBoardingUseCase.execute(uid);
    } catch (e) {
      console.log('Error checking onboarding status:', e);
      return undefined; // Return undefined on error, let caller decide default
    }
  }

  async checkIfFirstTimeOpeningApp() {
    try {
      const hasOpenedApp = await AsyncStorage.getItem('hasOpenedApp');
      this.setIsFirstTimeOpeningApp(hasOpenedApp === null);
    } catch (error) {
      console.log('Error checking first time app open status:', error);
      this.setIsFirstTimeOpeningApp(false);
    }
  }

  async markAppAsOpened() {
    try {
      await AsyncStorage.setItem('hasOpenedApp', 'true');
      this.setIsFirstTimeOpeningApp(false);
    } catch (error) {
      console.log('Error marking app as opened:', error);
    }
  }
}

export default AuthStore;
