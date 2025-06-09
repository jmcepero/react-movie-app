import {makeAutoObservable, runInAction} from 'mobx';
import {authInstance} from '../../../utils/Firebase';
import {getAuthErrorMessage} from '../constants/AuthErrors';

class RegisterStore {
  email: string = '';
  password: string = '';
  loading: boolean = false;
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

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  onErrorHide() {
    this.error = null;
  }

  async registerWithEmail() {
    try {
      this.setLoading(true);
      await authInstance.createUserWithEmailAndPassword(
        this.email,
        this.password,
      );
      this.resetForm();
    } catch (error: any) {
      runInAction(() => {
        this.error = getAuthErrorMessage(error.code ?? 'app/unknown-error');
        this.setLoading(false);
      });
    }
  }

  resetForm() {
    this.email = '';
    this.password = '';
    this.error = null;
  }
}

export default RegisterStore;
