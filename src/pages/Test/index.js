import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);
function Test() {
  return <div className={cx('test-container')}>테스트 페이지입니다.</div>;
}
export default Test;

export const path = '/test';
