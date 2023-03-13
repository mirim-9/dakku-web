import React, { useEffect, useState } from 'react';

import ReactDOM from 'react-dom';
import { Rnd } from 'react-rnd';
import StyledRect from 'react-resizable-rotatable-draggable';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Button({ onClick, children, size, theme, isBorder, borderColor, textFormat, ...props }) {
  return (
    <button
      className={cx(
        'button',
        theme && 'button-theme-' + theme,
        isBorder && 'button-border',
        `button-${size}`,
        textFormat
          ? textFormat
          : size === 'LG'
          ? 'title2BD'
          : size === 'MD'
          ? 'bodyBD'
          : size === 'SM' && 'captionBD',
      )}
      onClick={onClick ?? null}
    >
      {children}
    </button>
  );
}
export default Button;
