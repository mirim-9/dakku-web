import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);
function Mypage() {
  return <div className={cx('mypage-container')}>마이페이지 페이지입니다.</div>;
}
export default Mypage;

export const path = '/mypage';
