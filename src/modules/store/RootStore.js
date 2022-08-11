import { action, computed, observable } from 'mobx';

const MIN_AJAX_DURATION = 200;
class RootStore {
  @observable
  _pageLoading = false;

  @observable
  _redirectUrl = null;

  @observable
  _loadingStartTime = 0;

  @observable
  _waitingForLoadingDuration = false;

  constructor() {
    const savedRedirectUrl = localStorage.getItem('redirectUrl');
    if (savedRedirectUrl) {
      this._redirectUrl = savedRedirectUrl;
    }
  }

  @action.bound
  setStore(storeName, store) {
    this[storeName] = store;
  }

  @action.bound
  setRedirectUrl(url) {
    if (url) {
      this._redirectUrl = url;
      localStorage.setItem('redirectUrl', url);
    }
  }

  @computed
  get redirectUrl() {
    const redirectUrl = this._redirectUrl;
    localStorage.removeItem('redirectUrl');
    this._redirectUrl = null;
    return redirectUrl;
  }

  @action.bound
  setPageLoading(value) {
    if (!this._pageLoading && value) {
      this._pageLoading = true;
      this._loadingStartTime = Date.now();
    } else if (this._pageLoading && !value) {
      if (this._waitingForLoadingDuration) {
        return;
      }
      if (Date.now() - this._loadingStartTime < MIN_AJAX_DURATION) {
        this._waitingForLoadingDuration = true;
        setTimeout(() => {
          this._pageLoading = false;
          this._waitingForLoadingDuration = false;
        }, MIN_AJAX_DURATION - (Date.now() - this._loadingStartTime));
      } else {
        this._pageLoading = false;
      }
    }
  }

  @computed
  get pageLoading() {
    return this._pageLoading;
  }
}

export default RootStore;
