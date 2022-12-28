import React, { useEffect } from 'react';

const useDetectOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  handleOutsideClick: () => void
) => {
  useEffect(() => {
    const detectClick = (evt: MouseEvent) => {
      if (ref.current && !ref.current.contains(evt.target as Node)) {
        handleOutsideClick();
      }
    };

    document.addEventListener('mousedown', detectClick);

    return () => {
      document.removeEventListener('mousedown', detectClick);
    };
  }, [ref, handleOutsideClick]);
};

export default useDetectOutsideClick;
