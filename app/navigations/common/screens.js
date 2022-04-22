import React from 'react';
import Animated from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import {color, spacing} from '../../theme';

export function Screens({style, component: Component, ...props}) {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Animated.View
        backgroundColor={color.black25}
        style={[styles.hiddenView, {borderRadius: style?.borderRadius || 0}]}
      />
      <Animated.View
        style={{
          borderRadius: style?.borderRadius || 0,
          overflow: 'hidden',
          flex: 1,
        }}>
        <Component {...props} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  stack: {
    flex: 1,
  },
  drawerStyles: {flex: 1, width: '50%', backgroundColor: 'transparent'},
  drawerItem: {
    marginLeft: spacing[5],
    borderTopLeftRadius: spacing[5],
    borderBottomLeftRadius: spacing[5],
  },
  drawerLabel: {color: 'white', marginLeft: -16},
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
  hiddenView: {
    position: 'absolute',
    left: -20,
    width: '100%',
    height: '90%',
    top: '5%',
  },
});
