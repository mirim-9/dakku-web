import { Provider } from 'mobx-react';
import RootStore from './RootStore';

const rootStore = new RootStore();
const stores = {
  rootStore,
};

export default stores;

export { Provider };
