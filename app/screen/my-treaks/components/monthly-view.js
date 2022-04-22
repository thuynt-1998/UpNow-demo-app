import React, {useState, useCallback} from 'react';
import {View} from 'react-native-ui-lib';
import {Calendar} from 'react-native-calendars';
import {CustomHeader} from './custom-header';
import {color, size, spacing} from '../../../theme';
import {TheDay} from './the-day';
import {addMonths, format} from 'date-fns';

const calendarTheme = {
  'stylesheet.calendar.header': {
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    arrow: {},
    week: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      height: size.day.height,
      alignItems: 'center',
      marginTop: spacing[6],
    },
  },
  'stylesheet.calendar.main': {
    container: {},
  },
  textSectionTitleColor: color.white,
  textDayHeaderFontWeight: 'bold',
};
const useCalendarTheme = () => {
  return {
    ...calendarTheme,
    calendarBackground: color.transparent,
  };
};

export function MonthlyView() {
  const theme = useCalendarTheme();
  const defaultDate = format(new Date(), 'yyyy-MM-dd');

  const [currentMonth, setCurrentMonth] = useState(defaultDate);

  const onMonthChange = useCallback(
    (curentMonth, index) => () => {
      setCurrentMonth(format(addMonths(curentMonth, index), 'yyyy-MM-dd'));
    },
    [],
  );

  return (
    <View>
      <Calendar
        theme={theme}
        initialDate={currentMonth}
        dayComponent={props => <TheDay {...props} />}
        hideArrows={true}
        markedDates={{
          '2022-04-03': {startingDay: true},
          '2022-04-04': {selected: true},
          '2022-04-05': {selected: true},
          '2022-04-06': {endingDay: true},
        }}
        renderHeader={month => (
          <CustomHeader month={month} onMonthChange={onMonthChange} />
        )}
      />
    </View>
  );
}
