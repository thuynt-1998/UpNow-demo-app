import React from 'react';
import {Image, View} from 'react-native-ui-lib';
import {image} from '../../../assets/image';
import {size, spacing} from '../../../theme';
import {StyleSheet, Animated} from 'react-native';

const clockSize = size.clock.height - 20;
const lanMinutes = -clockSize / 3.75 / 2;
const defaultMinutes = new Date()?.getMinutes();
const defaultHour = new Date()?.getHours();

export const getHour = hour => (hour > 12 ? hour - 12 : hour);
const getHourRotate = (hour, minutes) =>
  (getHour(hour) + minutes / 12) * 30 + 'deg';

const getMinutesRotate = minutes => minutes * 30 + 'deg';

export function Clock({hour: hourProp, minutes: minutesProp}) {
  const minutes = React.useMemo(
    () => (minutesProp || defaultMinutes) / 5,
    [minutesProp],
  );

  const hour = React.useMemo(() => hourProp || defaultHour, [hourProp]);

  return (
    <View center>
      <View style={size.clock} centerH>
        <Image source={image.clock} style={styles.clockImage} />
        <View center style={styles.clockContent}>
          <Image
            source={image.hour}
            style={[
              styles.hour,
              {
                transform: [
                  {rotate: getHourRotate(hour, minutes)},
                  {translateY: lanMinutes},
                ],
              },
            ]}
          />
          <Image
            source={image.hour}
            style={[
              styles.minutes,
              {
                transform: [
                  {rotate: getMinutesRotate(minutes)},
                  {translateY: lanMinutes},
                ],
              },
            ]}
          />
          <Image source={image.point} style={styles.center} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  clockImage: {
    resizeMode: 'stretch',
    ...size.clock,
  },
  clockContent: {
    width: clockSize,
    height: clockSize,
    bottom: spacing[2] + 1,
    position: 'absolute',
  },
  center: {
    position: 'absolute',
    height: spacing[3],
    width: spacing[3],
  },
  hour: {
    position: 'absolute',
    height: spacing[4],
    width: spacing[2],
    resizeMode: 'stretch',
  },
  minutes: {
    position: 'absolute',
    height: spacing[6],
    width: spacing[2],
    resizeMode: 'stretch',
  },
});
