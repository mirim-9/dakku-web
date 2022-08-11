import * as Page from 'Pages';

import { Redirect, Route, Switch } from 'react-router-dom';

import LoadingState from './util/LoadingState';
import { Provider } from 'mobx-react';
import React from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';

const cx = classNames.bind(style);

function MainRouter() {
  const routes = Object.keys(Page).map((pageName) => Page[pageName]);

  return (
    <div className={cx('router')}>
      <Provider loading={LoadingState}>
        <Switch>
          {routes.map((route) => {
            return <Route key={route?.path} exact path={route?.path} component={route.default} />;
          })}
          <Redirect path="*" to="/" />
        </Switch>
      </Provider>
    </div>
  );
}

export default MainRouter;
