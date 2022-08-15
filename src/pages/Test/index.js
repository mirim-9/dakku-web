import React, { useEffect, useState } from 'react';

import Button from 'Components/molecules/Button';
import ReactDOM from 'react-dom';
import { Rnd } from 'react-rnd';
import StyledRect from 'react-resizable-rotatable-draggable';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Test() {
  const [images, setImages] = useState([
    {
      url: 'https://vignette.wikia.nocookie.net/blogclan-2/images/b/b9/Random-image-15.jpg/revision/latest?cb=20160706220047',
      x: 0,
      y: 0,
      width: 320,
      height: 390,
    },
    {
      url: 'https://images.unsplash.com/photo-1660474303054-5892df372dde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
      x: 0,
      y: 0,
      width: 320,
      height: 390,
    },
  ]);

  function onResize(event, direction, ref, delta, idx) {
    const { width, height } = ref.style;

    const resizeTemp = {
      url: images[idx].url,
      x: images[idx].x,
      y: images[idx].y,
      width,
      height,
    };
    images[idx] = resizeTemp;
    setImages(images);
  }

  function onDragStop(e, d, idx) {
    const { x, y } = d;
    const rePositionTemp = {
      url: images[idx].url,
      x: x,
      y: y,
      width: images[idx].width,
      height: images[idx].height,
    };
    images[idx] = rePositionTemp;
    setImages(images);
  }

  return (
    <>
      <div className={cx('drag-drop-test-container')}>
        {images?.map((item, idx) => {
          return (
            <Rnd
              resizable
              default={item}
              onResize={(e, direction, ref, delta) => {
                onResize(e, direction, ref, delta, idx);
              }}
              onDragStop={(e, data) => {
                onDragStop(e, data, idx);
              }}
              bounds="parent"
              style={{ width: 'auto', height: 'auto' }}
              // lockAspectRatio={true}
            >
              <div className={cx('item')} style={{ backgroundImage: `url('${item?.url}')` }} />
            </Rnd>
          );
        })}
      </div>
      <Button size="LG" isBorder text={'버튼 컴포넌트'} />
    </>
  );
}
export default Test;

export const path = '/test';
