import React from 'react';
import {Picker} from '../home/demo1';
import {ImageBackground, StyleSheet, Platform} from 'react-native';
import {image} from '../../assets/image';
import {spacing} from '../../theme';
import {Clock, getHour} from './components/clock';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {parse} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import {MenuButton} from '../components';

export function ReminderScreen() {
  const navigation = useNavigation();
  const defaultMinutes = new Date()?.getMinutes();
  const defaultHour = new Date()?.getHours();
  const [value, setValue] = React.useState({
    hour: getHour(defaultHour),
    minutes: defaultMinutes,
    moment: defaultHour > 12 ? 'PM' : 'AM',
  });
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <MenuButton />,
    });
  }, [navigation]);
  const onValueChange = React.useCallback(
    newValue => {
      setValue({
        ...value,
        ...newValue,
      });
    },
    [value],
  );
  return (
    <ImageBackground source={image.bgDarkTheme} style={styles.container}>
      <Clock minutes={value.minutes} hour={value.hour} />
      {Platform.OS === 'android' ? (
        <Picker onChange={onValueChange} value={value} />
      ) : (
        <RNDateTimePicker
          value={parse(`${value?.hour}:${value?.minutes}`, 'HH:mm', new Date())}
          display="spinner"
          mode="time"
          onChange={(value, date) => {
            setValue({
              hour: getHour(new Date(date).getHours()),
              minutes: new Date(date).getMinutes(),
              moment: new Date(date).getHours() > 11 ? 'PM' : 'AM',
            });
          }}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing[8] + spacing[4],
    paddingHorizontal: spacing[3],
  },
});
