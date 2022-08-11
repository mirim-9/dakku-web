import * as PropTypes from 'prop-types';

import { inject, observer } from 'mobx-react';

import MainRouter from './MainRouter';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './util/ScrollToTop';

function RootRouter() {
  return (
    <Router>
      <ScrollToTop>
        <>
          <MainRouter />
        </>
      </ScrollToTop>
    </Router>
  );
}

export default observer(RootRouter);
