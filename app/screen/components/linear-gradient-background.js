import React from 'react';
import {View} from 'react-native-ui-lib';
import LinearGradient from 'react-native-linear-gradient';
import {color} from '../../theme';

export function LinearGradientBackground({style, children, colors}) {
  return (
    <LinearGradient
      colors={colors || [color.wildRed, color.roseRed]}
      style={style}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      {children}
    </LinearGradient>
  );
}
