import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import SvgHeart from 'Assets/svgs/heart/filled.svg';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

function NavigationBar() {
  return (
    <div className={cx('navigation-bar-container')}>
      <div className={cx('menu-container')}>
        <div className={cx('menu-left')}>
          <Link to="/" className={cx('logo')}>
            <SvgHeart />
          </Link>
          <Link to="/board" className={cx('title2BD')}>
            게시판
          </Link>
          <Link to="/stickers" className={cx('title2BD')}>
            스티커
          </Link>
        </div>
        <div className={cx('menu-right')}>
          <Link to="/dakku" className={cx('title2BD', 'goto-dakku')}>
            다꾸하러 가기
          </Link>
          <Link to="/mypage" className={cx('title2BD')}>
            마이페이지
          </Link>
        </div>
      </div>
    </div>
  );
}
export default NavigationBar;
