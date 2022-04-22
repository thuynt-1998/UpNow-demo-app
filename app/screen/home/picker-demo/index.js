import _ from 'lodash';
import React from 'react';
import {View} from 'react-native-ui-lib';
import { WheelPicker } from './WheelPicker';

/**
 * @description: SectionsWheelPicker component for presenting set of wheelPickers
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SectionsWheelPickerScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/SectionsWheelPicker/SectionsWheelPicker.gif?raw=true
 */
export const SectionsWheelPicker = props => {
  const {
    sections,
    itemHeight,
    numberOfVisibleRows,
    activeTextColor,
    inactiveTextColor,
    textStyle,
    testID,
  } = props;
  const wheelPickerProps = {
    itemHeight,
    numberOfVisibleRows,
    activeTextColor,
    inactiveTextColor,
    textStyle,
  };

  const renderSections = () =>
    _.map(sections, (section, index) => {
      return (
        <WheelPicker
          key={index}
          testID={`${testID}.${index}`}
          {...wheelPickerProps}
          {...section}
        />
      );
    });

  return (
    <View row centerH testID={testID}>
      {renderSections()}
    </View>
  );
};
