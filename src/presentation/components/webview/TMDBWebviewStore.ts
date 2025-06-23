import {makeAutoObservable} from 'mobx';

export type TMDBWebViewResult =
  | 'allowed'
  | 'denied'
  | 'cancelled_by_user'
  | 'none';

class TMDBWebviewStore {
  webviewResult: TMDBWebViewResult = 'none';

  constructor() {
    makeAutoObservable(this);
  }

  setResult(result: TMDBWebViewResult) {
    this.webviewResult = result;
  }

  onBackPressed() {
    this.webviewResult =
      this.webviewResult !== 'none' ? this.webviewResult : 'cancelled_by_user';
  }
}

export default TMDBWebviewStore;
