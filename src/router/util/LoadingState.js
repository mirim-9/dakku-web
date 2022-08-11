import { action, observable } from 'mobx';

class LoadingState {
  @observable
  isLoading = false;

  @action.bound
  setStatus(state) {
    this.isLoading = !!state;
  }

  /**
   * @param func
   * @returns {Promise<void>}
   */
  @action.bound
  async do(func) {
    this.setStatus(true);
    await func();
    this.setStatus(false);
  }
}

export default LoadingState;
