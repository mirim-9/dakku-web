import { useCallback, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

const useScrollMove = (name) => {
  const history = useHistory();
  const scrollInfos = localStorage.getItem(`${name}_scroll_pos`);
  const offset = scrollInfos ? parseInt(scrollInfos) : 0;
  const [scrollTop, setScrollTop] = useState(offset);

  const scrollSave = (location) => {
    if (location.pathname !== name) {
      const scrollPos = window.scrollY;
      localStorage.setItem(`${name}_scroll_pos`, scrollPos);
      setScrollTop(scrollPos);
    }
  };

  const scrollRemove = () => {
    localStorage.removeItem(`${name}_scroll_pos`);
  };

  const scrollRemoveAndRefresh = () => {
    scrollRemove();
    setScrollTop(0);
  };

  useEffect(() => {
    const listen = history.listen(scrollSave);
    return () => listen();
  });

  useEffect(() => {
    if (history.action === 'PUSH') {
      scrollRemoveAndRefresh();
    } else if (history.action === 'POP') {
      scrollRemove();
    }
  }, []);

  return { scrollTop, scrollSave, scrollRemove, scrollRemoveAndRefresh };
};

export default useScrollMove;
