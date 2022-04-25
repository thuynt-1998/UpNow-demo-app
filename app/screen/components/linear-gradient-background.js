import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {usePlayerContext} from '../../context/player-context';

export function LinearGradientBackground({style, children, colors}) {
  const {
    linearGradientContext: {linearGradientColor},
  } = usePlayerContext();
  return (
    <LinearGradient
      colors={colors || linearGradientColor}
      style={style}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      {children}
    </LinearGradient>
  );
}
