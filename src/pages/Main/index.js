import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);
function Main() {
  return <div className={cx('main-container')}>메인 페이지입니다.</div>;
}
export default Main;

export const path = '/';
