import {useCallback, useRef, useState, useEffect} from 'react';
import {View} from 'react-native';

export const useLayout = () => {
  const ref = useRef(null);

  const [{x, y, width, height, pageX, pageY}, setState] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
  });
  const onLayout = useCallback(() => {
    ref.current?.measure((x, y, width, height, pageX, pageY) => {
      setState({
        x,
        y,
        width,
        height,
        pageX,
        pageY,
      });
    });
  }, []);

  useEffect(() => {
    onLayout(); // run on mount only
  }, []);

  return {
    ref,
    onLayout,
    x,
    y,
    width,
    height,
    pageX,
    pageY,
  };
};
