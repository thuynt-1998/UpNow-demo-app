import React from 'react';
import {Animated} from 'react-native';
import {View, TouchableOpacity} from 'react-native-ui-lib';
import {size, spacing} from '../../theme';

const ITEM_HEIGHT = Math.round(size.picker.height / 7);
const get5ColStyle = (ref, index, colIndex) => {
  const inputRange = [
    (index - 3) * ITEM_HEIGHT,
    (index - 2) * ITEM_HEIGHT,
    (index - 1) * ITEM_HEIGHT,
    index * ITEM_HEIGHT,
    (index + 1) * ITEM_HEIGHT,
    (index + 2) * ITEM_HEIGHT,
    (index + 3) * ITEM_HEIGHT,
  ];
  const scaleY = ref.interpolate({
    inputRange,
    outputRange: [0.5, 0.7, 0.8, 1, 0.8, 0.7, 0.5],
  });
  const rotateIndex = colIndex === 0 ? 1 : -1;
  const rotateZ = ref.interpolate({
    inputRange,
    outputRange: [
      -9 * rotateIndex + 'deg',
      -6 * rotateIndex + 'deg',
      -3 * rotateIndex + 'deg',
      '0deg',
      9 * rotateIndex + 'deg',
      6 * rotateIndex + 'deg',
      3 * rotateIndex + 'deg',
    ],
  });
  const translateX = ref.interpolate({
    inputRange,
    outputRange: [
      spacing[4] * rotateIndex,
      spacing[2] * rotateIndex,
      spacing[1] * rotateIndex,
      spacing[0],
      spacing[1] * rotateIndex,
      spacing[2] * rotateIndex,
      spacing[4] * rotateIndex,
    ],
  });
  const opacity = ref.interpolate({
    inputRange,
    outputRange: [0, 0, 0, 1, 0, 0, 0],
  });
  const greyOpacity = ref.interpolate({
    inputRange,
    outputRange: [0.6, 0.6, 0.8, 0, 0.8, 0.6, 0.6],
  });
  const translateY = ref.interpolate({
    inputRange,
    outputRange: [
      -spacing[1],
      spacing[1],
      spacing[2],
      spacing[0],
      -spacing[2],
      -spacing[1],
      spacing[1],
    ],
  });
  const transform = [
    {scale: scaleY},
    {translateY},
    {rotateZ: colIndex === 0 || colIndex === 2 ? rotateZ : '0deg'},
    {translateX: colIndex === 0 || colIndex === 2 ? translateX : 0},
  ];
  const text1Style = {
    position: 'absolute',
    color: 'white',
    fontSize: spacing[5],
    opacity,
    transform,
  };
  const textStyle = {
    color: '#9A99A2',
    opacity: greyOpacity,
    transform,
    fontSize: spacing[5],
  };
  return {text1Style, textStyle};
};
const List = React.memo(
  React.forwardRef(
    (
      {style, onItemIndexChange, data, onPress, colIndex, defaultValue},
      ref,
    ) => {
      const scrollY = React.useRef(new Animated.Value(0)).current;
      const [isTouch, setTouch] = React.useState(false);
      const defaultIndex = React.useMemo(
        () => data.findIndex(obj => obj === defaultValue),
        [data, defaultValue],
      );
      // React.useEffect(() => {
      //   !isTouch &&
      //     ref?.current?.scrollToIndex({
      //       index: defaultIndex,
      //       animated: true,
      //     });
      // }, [defaultIndex, isTouch, ref]);

      const onChangeIndex = React.useCallback(
        ({nativeEvent}) =>
          onItemIndexChange?.(
            Math.round(nativeEvent.contentOffset.y / ITEM_HEIGHT),
          ),
        [onItemIndexChange],
      );

      const onScroll = Animated.event(
        [{nativeEvent: {contentOffset: {y: scrollY}}}],
        {
          useNativeDriver: true,
          listener: event => {
            isTouch && onChangeIndex(event);
            setTouch(false);
          },
        },
      );

      const getItemLayout = React.useCallback((_data, index) => {
        return {
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        };
      }, []);
      const alignmentStyle = React.useMemo(
        () =>
          colIndex === 2
            ? {
                alignSelf: 'flex-end',
              }
            : colIndex === 0
            ? {
                alignSelf: 'flex-start',
              }
            : {
                alignSelf: 'center',
              },
        [colIndex],
      );
      const contentContainerStyle = React.useMemo(() => {
        return [
          {
            paddingVertical: size.picker.height / 2 - ITEM_HEIGHT / 2,
          },
          alignmentStyle,
        ];
      }, [alignmentStyle]);

      onPress = React.useCallback(
        index => {
          console.log(index, index);
          ref?.current?.scrollToOffset({
            offset: index * ITEM_HEIGHT,
            animated: true,
          });
          onItemIndexChange(index);
        },
        [ref, onItemIndexChange],
      );

      const renderItem = React.useCallback(
        ({item, index}) => {
          return (
            <View>
              <TouchableOpacity
                style={{height: ITEM_HEIGHT}}
                center
                onPress={() => onPress?.(index)}
                activeOpacity={1}>
                <Animated.Text
                  style={get5ColStyle(scrollY, index, colIndex)?.textStyle}>
                  {item}
                </Animated.Text>
                <Animated.Text
                  style={get5ColStyle(scrollY, index, colIndex)?.text1Style}>
                  {item}
                </Animated.Text>
              </TouchableOpacity>
            </View>
          );
        },
        [colIndex, onPress, scrollY],
      );
      return (
        <Animated.FlatList
          ref={ref}
          data={data}
          style={style}
          keyExtractor={(item, index) => index?.toString()}
          bounces={false}
          scrollEnabled={true}
          scrollEventThrottle={16}
          onScroll={onScroll}
          decelerationRate="fast"
          snapToInterval={ITEM_HEIGHT}
          showsVerticalScrollIndicator={false}
          renderToHardwareTextureAndroid
          renderItem={renderItem}
          initialNumToRender={defaultIndex}
          onTouchEnd={() => setTouch(true)}
          contentContainerStyle={contentContainerStyle}
          getItemLayout={getItemLayout}
        />
      );
    },
  ),
);

const data1 = [...Array(12).keys()].map((item, idx) => item + 1);

const data2 = [...Array(60).keys()].map((item, idx) =>
  item.toString().length > 1 ? item : '0' + item,
);

const data3 = ['AM', 'PM'];

const Demo = React.memo(
  ({style, colIndex, data, onValueChange, defaultValue}) => {
    const componentRef = React.useRef(null);
    console.log(defaultValue, '--default');

    return (
      <View flex>
        <View style={style}>
          <List
            data={data}
            onItemIndexChange={onValueChange}
            ref={componentRef}
            colIndex={colIndex}
            defaultValue={defaultValue}
          />
        </View>
      </View>
    );
  },
);

export function Picker({onChange, value}) {
  console.log(value, '--value');
  return (
    <View flex center>
      <View
        {...size.picker}
        backgroundColor="rgba(0, 0, 0, 1)"
        style={{borderRadius: spacing[5]}}>
        <View absF centerV>
          <View
            backgroundColor="rgba(255, 255, 255, 0.15)"
            height={ITEM_HEIGHT}
            style={{borderRadius: spacing[3], marginHorizontal: spacing[3]}}
          />
        </View>
        <View row style={{marginHorizontal: spacing[7]}}>
          <Demo
            colIndex={0}
            data={data1}
            onValueChange={index => onChange({hour: Number(data1[index])})}
            defaultValue={value.hour}
          />
          <Demo
            colIndex={1}
            data={data2}
            onValueChange={index => onChange({minutes: Number(data2[index])})}
            defaultValue={
              value.minutes?.toString()?.length > 1
                ? value.minutes
                : '0' + value.minutes
            }
          />
          <Demo
            colIndex={2}
            data={data3}
            onValueChange={index => onChange({moment: data3[index]})}
            defaultValue={value.moment}
          />
        </View>
      </View>
    </View>
  );
}
