import React, { useState } from 'react';

import ReactDOM from 'react-dom';
import { Rnd } from 'react-rnd';
import StyledRect from 'react-resizable-rotatable-draggable';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);
const StyledRnd = styled(Rnd)`
  border: 1px solid blue;
`;

const Item = styled.div`
  border: 1px solid black;
`;

const Container = styled.div`
  width: 800px;
  height: 800px;
  border: 1px solid red;
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(https://vignette.wikia.nocookie.net/blogclan-2/images/b/b9/Random-image-15.jpg/revision/latest?cb=20160706220047);
  background-size: 100% 100%;
`;
const images = [
  {
    url:
      'https://vignette.wikia.nocookie.net/blogclan-2/images/b/b9/Random-image-15.jpg/revision/latest?cb=20160706220047',
  },
];

function Test() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    width: 320,
    height: 390,
  });

  function onResize(event, direction, ref, delta) {
    const { width, height } = ref.style;

    setPosition((prevPosition) => ({
      ...prevPosition,
      width,
      height,
    }));
  }

  function onDragStop(e, d) {
    const { x, y } = d;
    setPosition((prevPosition) => ({
      ...prevPosition,
      x,
      y,
    }));
  }

  return (
    <div className={cx('drag-drop-test-container')}>
      {images?.map((item) => {
        return (
          <Rnd
            default={position}
            onResize={onResize}
            onDragStop={onDragStop}
            bounds="parent"
            lockAspectRatio={true}
          >
            <div className={cx('item')} style={{ backgroundImage: `url('${item?.url}')` }} />
          </Rnd>
        );
      })}
    </div>
  );
}
export default Test;

export const path = '/test';
