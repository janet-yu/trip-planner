import React, { useEffect } from 'react';

const useDetectOutsideClick = (ref, handleOutsideClick) => {
  useEffect(() => {
    const detectClick = (evt) => {
      if (ref.current && !ref.current.contains(evt.target)) {
        handleOutsideClick();
      }
    };

    document.addEventListener('mousedown', detectClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [ref, handleOutsideClick]);
};

export default useDetectOutsideClick;
