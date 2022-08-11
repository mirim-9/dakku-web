import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import DefaultModal from 'Components/organisms/Modal/DefaultModal';
import { LoadingScreen } from 'Components/organisms';
import SvgArrowBack from 'Assets/svgs/arrow_back.svg';
import SvgClose from 'Assets/svgs/close.svg';
import SvgHelp from 'Assets/svgs/help.svg';
import SvgHouse from 'Assets/svgs/house.svg';
import SvgProfile from 'Assets/svgs/profile.svg';
import SvgShare from 'Assets/svgs/share.svg';
import amplitude from 'amplitude-js';
import classNames from 'classnames/bind';
import { observer } from 'mobx-react';
import style from './DaangnNavigationBar.module.scss';
import { withRouter } from 'react-router-dom';

const cx = classNames.bind(style);

function DaangnNavigationBar(props) {
  const { title } = props;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
  return (
    <>
      <div
        className={cx(
          'header-container',
          isIOS && 'header-container-ios',
          props?.noPadding && 'header-container-no-padding',
          props?.buttonWhite && 'header-button-white',
        )}
      >
        <div className={cx('title-wrapper')} style={props?.style}>
          {!props?.leftIcon &&
            !props?.noLeftIcon &&
            (props?.backTo ? (
              <a className={cx('button', 'button-back')} href={props?.backTo}>
                <SvgArrowBack />
              </a>
            ) : (
              <button
                className={cx('button', 'button-back')}
                onClick={() =>
                  props?.leftClick
                    ? props?.leftClick()
                    : history.length === 1
                    ? history.push('/')
                    : history.go(-1)
                }
              >
                <SvgArrowBack />
              </button>
            ))}
          {props?.leftIcon && (
            <button className={cx('button', `button-${props?.leftIcon}`)} onClick={props.leftClick}>
              {props?.leftIcon === 'profile' && <SvgProfile />}
              {props?.leftIcon === 'close' && (
                <img
                  src={require('Assets/close.png').default}
                  style={{ width: '13.41px', height: ' 13.13px' }}
                />
              )}
            </button>
          )}
          {!props?.noHomeButton && (
            <a
              className={cx('button-home')}
              href="/"
              style={{ margin: props?.noLeftIcon && 0 }}
              onClick={() => {
                amplitude.getInstance().logEvent('appbar_tap_home');
                sessionStorage.clear();
              }}
            >
              <SvgHouse />
            </a>
          )}
          <div className={cx('title')}>{title}</div>
        </div>
      </div>
      <div />
    </>
  );
}
export default withRouter(observer(DaangnNavigationBar));
