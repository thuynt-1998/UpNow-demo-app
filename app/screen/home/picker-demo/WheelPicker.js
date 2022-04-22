// TODO: Support style customization
import {isFunction} from 'lodash';
import React, {useCallback, useRef, useMemo, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Platform} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import Item from './Item';
import usePresenter from './usePresenter';
import {Colors, Fader, Spacings, View} from 'react-native-ui-lib';

const isAndroid = Platform.OS === 'android';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
var WheelPickerAlign;

(function (WheelPickerAlign) {
  WheelPickerAlign.CENTER = 'center';
  WheelPickerAlign.RIGHT = 'right';
  WheelPickerAlign.LEFT = 'left';
})(WheelPickerAlign || (WheelPickerAlign = {}));

export const WheelPicker = ({
  items: propItems,
  itemHeight = 44,
  numberOfVisibleRows = 5,
  activeTextColor = Colors.primary,
  inactiveTextColor,
  textStyle,
  label,
  onChange,
  align,
  style,
  children,
  initialValue,
  selectedValue,
  testID,
}) => {
  const scrollView = useRef();
  const offset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(e => {
    offset.value = e.contentOffset.y;
  });
  const {
    height,
    items,
    shouldControlComponent,
    index: currentIndex,
    getRowItemAtOffset,
  } = usePresenter({
    initialValue,
    selectedValue,
    items: propItems,
    children,
    itemHeight,
    preferredNumVisibleRows: numberOfVisibleRows,
  });
  const prevIndex = useRef(currentIndex);
  const [scrollOffset, setScrollOffset] = useState(currentIndex * itemHeight);
  const keyExtractor = useCallback((item, index) => `${item}.${index}`, []);

  useEffect(() => {
    if (shouldControlComponent(scrollOffset)) {
      scrollToIndex(currentIndex, true);
    }
  });

  useEffect(() => {
    scrollToIndex(currentIndex, true);
  }, [currentIndex]);
  const scrollToPassedIndex = useCallback(() => {
    scrollToIndex(currentIndex, false);
  }, []);

  const scrollToOffset = (index, animated) => {
    if (isFunction(scrollView.current?.scrollToOffset)) {
      scrollView.current?.scrollToOffset({
        offset: index * itemHeight,
        animated,
      });
    } else {
      //@ts-expect-error
      scrollView.current?.getNode()?.scrollToOffset({
        offset: index * itemHeight,
        animated,
      });
    }
  };

  const scrollToIndex = (index, animated) => {
    if (isAndroid && prevIndex.current !== index) {
      prevIndex.current = index;
      onChange?.(items?.[index]?.value, index);
    }

    setTimeout(() => scrollToOffset(index, animated), 100);
  };

  const selectItem = useCallback(
    index => {
      scrollToIndex(index, true);
    },
    [itemHeight],
  );
  const onValueChange = useCallback(
    event => {
      setScrollOffset(event.nativeEvent.contentOffset.y);
      const {index, value} = getRowItemAtOffset(
        event.nativeEvent.contentOffset.y,
      );
      onChange?.(value, index);
    },
    [onChange],
  );
  const alignmentStyle = useMemo(
    () =>
      align === WheelPickerAlign.RIGHT
        ? {
            alignSelf: 'flex-end',
          }
        : align === WheelPickerAlign.LEFT
        ? {
            alignSelf: 'flex-start',
          }
        : {
            alignSelf: 'center',
          },
    [align],
  );
  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <Item
          index={index}
          itemHeight={itemHeight}
          offset={offset}
          activeColor={activeTextColor}
          inactiveColor={inactiveTextColor}
          style={textStyle}
          {...item}
          centerH={!label}
          onSelect={selectItem}
          testID={`${testID}.item_${index}`}
          align={align}
        />
      );
    },
    [itemHeight,align],
  );
  const separators = useMemo(() => {
    return (
      <View absF centerV pointerEvents="none">
        <View style={styles.separators} />
      </View>
    );
  }, []);
  const fader = useMemo(
    () => position => {
      return <Fader visible position={position} size={60} />;
    },
    [],
  );
  const getItemLayout = useCallback(
    (_data, index) => {
      return {
        length: itemHeight,
        offset: itemHeight * index,
        index,
      };
    },
    [itemHeight],
  );
  const contentContainerStyle = useMemo(() => {
    return [
      {
        paddingVertical: height / 2 - itemHeight / 2,
      },
      alignmentStyle,
    ];
  }, [height, itemHeight, alignmentStyle]);
  return (
    <View testID={testID} bg-white style={style}>
      <View row centerH>
        {separators}
        <View flexG>
          <AnimatedFlatList
            testID={`${testID}.list`}
            height={height}
            data={items}
            keyExtractor={keyExtractor}
            scrollEventThrottle={100}
            onScroll={scrollHandler}
            onMomentumScrollEnd={onValueChange}
            showsVerticalScrollIndicator={false}
            onLayout={scrollToPassedIndex}
            ref={scrollView}
            contentContainerStyle={contentContainerStyle}
            snapToInterval={itemHeight}
            decelerationRate={isAndroid ? 0.98 : 'normal'}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            initialScrollIndex={currentIndex}
          />
        </View>
      </View>
      {fader('BOTTOM')}
      {fader('TOP')}
    </View>
  );
};
const styles = StyleSheet.create({
  separators: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: Spacings.s9,
    backgroundColor: Colors.grey60,
  },
  label: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },
});
