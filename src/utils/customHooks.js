export function useQuery(location) {
  return new URLSearchParams(location?.search);
}

export function useScroll() {
  const screen = document.getElementById('screen');

  return {
    scrollToTop: () => screen?.scrollTo(0, 0),
    scrollToBottom: () => screen?.scrollTo(0, 500),
    scrollTo: (offset = 0) => screen?.scrollTo(0, offset),
    scrollToElement: (elementId, offset = 0) => {
      const el = document.getElementById(elementId);
      try {
        el.offsetTop !== null && screen.scrollTo(0, el.offsetTop + offset - 20);
      } catch (e) {
        console.error(e);
      }
    },
  };
}
