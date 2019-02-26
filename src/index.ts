import { useEffect, useState, useCallback } from 'react';

export default function useContentOverflow(
  ref: React.RefObject<HTMLElement>
): boolean {
  let [overflow, setOverflow] = useState(false);
  const checkWidth = useCallback(
    function check() {
      let { current } = ref;
      if (current) {
        let currentOverflow = current.offsetWidth < current.scrollWidth;
        if (currentOverflow !== overflow) {
          setOverflow(currentOverflow);
        }
      }
    },
    [overflow]
  );
  useEffect(() => {
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => {
      window.removeEventListener('resize', checkWidth);
    };
  });
  return overflow;
}
