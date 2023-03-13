import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);
function Dakku() {
  const [step, setStep] = useState('search');
  return (
    <div className={cx('dakku-container')}>
      <div className={cx('container-left')}>
        <div className={cx('size-selector-container')}>A4 A3 뭐 어쩌고..</div>
        <div className={cx('page-container')}>드래그 앤 드롭</div>
      </div>
      <div className={cx('container-right')}>
        <div className={cx('index-button-container')}>
          <button
            onClick={() => setStep('search')}
            className={cx(
              step === 'search' && 'active-step',
              step === 'search' ? 'bodyBD' : 'bodyMD',
            )}
          >
            검색
          </button>
          <button
            onClick={() => setStep('text')}
            className={cx(step === 'text' && 'active-step', step === 'text' ? 'bodyBD' : 'bodyMD')}
          >
            텍스트
          </button>
        </div>
        <div className={cx('save-button-container')}>
          <button onClick={() => setStep('search')} className={cx('bodyBD')}>
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dakku;

export const path = '/dakku';
