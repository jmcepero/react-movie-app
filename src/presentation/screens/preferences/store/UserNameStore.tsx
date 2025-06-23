import {FirebaseAuthTypes, updateProfile} from '@react-native-firebase/auth';
import {makeAutoObservable} from 'mobx';

class UserNameStore {
  name: string = '';
  loading: boolean | undefined = undefined;
  error: string | null = null;
  user: FirebaseAuthTypes.User | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  onScreenLoaded(user: FirebaseAuthTypes.User) {
    this.user = user;
  }

  onNameChange(value: string) {
    this.name = value;
  }

  setLoading(value: boolean) {
    this.loading = value;
  }

  async saveDisplayName(onFinish: Function) {
    if (this.user) {
      this.setLoading(true);
      try {
        await updateProfile(this.user, {
          displayName: this.name,
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.setLoading(false);
        onFinish();
      }
    }
  }
}

export default UserNameStore;
