import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);
function Board() {
  return <div className={cx('board-container')}>게시판 페이지입니다.</div>;
}
export default Board;

export const path = '/board';
