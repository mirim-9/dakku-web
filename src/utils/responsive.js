import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const Mobile = (children) => (isMobile ? children : null);
  const Tablet = (children) => (isTablet ? children : null);
  const Desktop = (children) => (isDesktop ? children : null);

  return {
    Mobile,
    Tablet,
    Desktop,
    isMobile,
    isTablet,
    isDesktop,
  };
};
