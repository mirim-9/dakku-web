import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);
function Stickers() {
  return <div className={cx('stickers-container')}>스티커 페이지입니다.</div>;
}
export default Stickers;

export const path = '/stickers';
