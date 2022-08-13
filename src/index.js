import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './common.scss';
import './polyfills/polyfill';
import './common/styles/index.scss';
import './common/styles/textFormat.scss';

import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import RootRouter from './router/RootRouter';

ReactDOM.render(
  <Provider>
    <RootRouter />
  </Provider>,
  document.getElementById('root'),
);
