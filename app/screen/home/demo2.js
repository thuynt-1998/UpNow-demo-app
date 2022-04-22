import _ from 'lodash';
import React, {useState, useCallback} from 'react';
import {Alert} from 'react-native';
import {Text, View, SegmentedControl, Button} from 'react-native-ui-lib';
import {SectionsWheelPicker} from './picker-demo';

export const SectionsWheelPickerScreen = () => {
  const [numOfSections, setNumOfSections] = useState(3);

  const [selectedDays, setSelectedDays] = useState(0);
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);

  const days = _.times(10, i => i);
  const hours = _.times(24, i => i);
  const minutes = _.times(60, i => i);

  const getItems = useCallback(values => {
    return _.map(values, item => ({label: '' + item, value: item}));
  }, []);

  const onDaysChange = item => {
    setSelectedDays(item);
  };

  const onHoursChange = item => {
    setSelectedHours(item);
  };

  const onMinutesChange = item => {
    setSelectedMinutes(item);
  };

  const onSavePress = () => {
    const days = selectedDays === 1 ? 'day' : 'days';
    const hours = selectedHours === 1 ? 'hour' : 'hours';
    const minutes = selectedMinutes === 1 ? 'minute' : 'minutes';

    numOfSections === 3
      ? Alert.alert(
          'Your chosen duration is:\n' +
            selectedDays +
            ' ' +
            days +
            ', ' +
            selectedHours +
            ' ' +
            hours +
            ' and ' +
            selectedMinutes +
            ' ' +
            minutes,
        )
      : numOfSections === 2
      ? Alert.alert(
          'Your chosen duration is:\n' +
            selectedDays +
            ' ' +
            days +
            ' and ' +
            selectedHours +
            ' ' +
            hours,
        )
      : Alert.alert('Your chosen duration is:\n' + selectedDays + ' ' + days);
  };

  const onResetPress = () => {
    setSelectedDays(0);
    setSelectedHours(0);
    setSelectedMinutes(0);
  };

  const sections = [
    {
      items: getItems(days),
      onChange: onDaysChange,
      initialValue: selectedDays,
      label: 'Days',
      align: 'right',
      style: {flex: 1},
    },
    {
      items: getItems(hours),
      onChange: onHoursChange,
      initialValue: selectedHours,
      label: 'Hrs',
      align: 'center',
      style: numOfSections === 2 ? {flex: 1} : undefined,
    },
    {
      items: getItems(minutes),
      onChange: onMinutesChange,
      initialValue: selectedMinutes,
      label: 'Mins',
      align: 'left',
      style: {flex: 1},
    },
  ];

  const sectionsToPresent = _.slice(sections, 0, numOfSections);

  const onChangeIndex = index => {
    return setNumOfSections(index + 1);
  };

  return (
    <View>
      <Text text40 marginL-10 marginT-20>
        Sections Wheel Picker
      </Text>
      <View centerH marginT-40>
        <SegmentedControl
          segments={[
            {label: '1 section'},
            {label: '2 sections'},
            {label: '3 sections'},
          ]}
          onChangeIndex={onChangeIndex}
          throttleTime={400}
        />
        <Text text50 marginV-20>
          Pick a duration
        </Text>
      </View>
      <SectionsWheelPicker sections={sectionsToPresent} />
      <Button marginH-150 marginT-40 label={'Save'} onPress={onSavePress} />
      <Button marginH-150 marginT-15 label={'Reset'} onPress={onResetPress} />
    </View>
  );
};
