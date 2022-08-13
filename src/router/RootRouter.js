import 'react-router-modal/css/react-router-modal.css';

import { inject, observer } from 'mobx-react';

import MainRouter from './MainRouter';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './util/ScrollToTop';
import moment from 'moment';

function RootRouter() {
  return (
    <Router>
      <ScrollToTop>
        <MainRouter />
      </ScrollToTop>
    </Router>
  );
}

export default observer(RootRouter);
