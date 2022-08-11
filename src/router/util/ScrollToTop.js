import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const ScrollToTop = ({ children, location: { pathname, search } }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.ga) {
      window.ga('set', 'page', pathname + search);
      window.ga('send', 'pageview');
    }
  }, [pathname, search]);

  return children;
};

export default withRouter(ScrollToTop);
