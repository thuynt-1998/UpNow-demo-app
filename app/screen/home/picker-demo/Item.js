import React, {useCallback, useMemo, memo} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Colors, Spacings, Text, TouchableOpacity} from 'react-native-ui-lib';
import {spacing} from '../../../theme';
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedText = Animated.createAnimatedComponent(Text);
export default memo(
  ({
    index,
    label,
    itemHeight,
    onSelect,
    offset,
    activeColor = Colors.primary,
    inactiveColor = Colors.grey20,
    style,
    testID,
    centerH = true,
    align,
  }) => {
    const selectItem = useCallback(() => onSelect(index), [index]);
    const itemOffset = index * itemHeight;
    const translateXWithAlign =
      align === 'left' ? -1 : align === 'right' ? 1 : 0;
    const animatedColorStyle = useAnimatedStyle(() => {
      const color = interpolateColor(
        offset.value,
        [itemOffset - itemHeight, itemOffset, itemOffset + itemHeight],
        [inactiveColor, activeColor, inactiveColor],
      );
      const scaleY = interpolate(
        offset.value,
        [itemOffset - itemHeight, itemOffset, itemOffset + itemHeight],
        [0.8, 1, 0.8],
      );
      const translateX = interpolate(
        offset.value,
        [itemOffset - itemHeight, itemOffset, itemOffset + itemHeight],
        [spacing[1] * translateXWithAlign, 0, spacing[1] * translateXWithAlign],
      );
      const translateY = interpolate(
        offset.value,
        [
          itemOffset - itemHeight - itemHeight,
          itemOffset - itemHeight,
          itemOffset,
          itemOffset + itemHeight,
          itemOffset + itemHeight + itemHeight,
        ],
        [-spacing[3], -spacing[2], 0, spacing[2], spacing[3]],
      );
      return {
        color,
        transform: [{scaleY}, {translateX}, {translateY}],
      };
    }, [itemHeight]);
    const containerStyle = useMemo(() => {
      return [
        {
          height: itemHeight,
        },
        styles.container,
      ];
    }, [itemHeight]);
    return (
      <AnimatedTouchableOpacity
        activeOpacity={1}
        style={containerStyle}
        key={index}
        centerV
        centerH={centerH}
        right={!centerH}
        onPress={selectItem} // @ts-ignore reanimated2
        index={index}
        testID={testID}
        row>
        <AnimatedText
          text60R
          style={[animatedColorStyle, style, styles.textPadding]}>
          {label}
        </AnimatedText>
      </AnimatedTouchableOpacity>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    minWidth: Spacings.s10,
  },
  textPadding: {
    paddingHorizontal: Spacings.s5,
  },
  textWithLabelPadding: {
    paddingLeft: Spacings.s5,
  },
});
