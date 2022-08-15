import React, { useEffect, useState } from 'react';

import ReactDOM from 'react-dom';
import { Rnd } from 'react-rnd';
import StyledRect from 'react-resizable-rotatable-draggable';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Button({ text, size, isBorder, borderColor, ...props }) {
  return <button className={cx('button', `button-${size}`, 'body1MD')}>{text}</button>;
}
export default Button;
