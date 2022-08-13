import * as Page from 'Pages';

import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import LoadingState from './util/LoadingState';
import { Provider } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './style.module.scss';

const cx = classNames.bind(style);

function MainRouter() {
  const routes = Object.keys(Page).map((pageName) => Page[pageName]);
  const [loadingState, setLoadingState] = useState(new LoadingState());
  console.log(loadingState);
  return (
    <div className={cx('router')}>
      {/* <Provider loading={loadingState}> */}
      <Switch>
        {routes.map((route) => {
          return (
            <Route
              key={route?.path}
              exact
              path={route?.path}
              component={route.loginRequired ? notLoginedRedirect(route.default) : route.default}
            />
          );
        })}
        <Redirect path="*" to="/" />
      </Switch>
      {/* </Provider> */}
    </div>
  );
}

export default MainRouter;
