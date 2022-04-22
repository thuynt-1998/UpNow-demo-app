import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {addMonths, format} from 'date-fns';

import {color, size, spacing} from '../../../theme';
import {LinearGradientBackground} from '../../components';

export function CustomHeader({month, onMonthChange}) {
  return (
    <View row>
      <TouchableOpacity
        style={[styles.container]}
        onPress={onMonthChange(month.toDate(), -1)}>
        <View flex center>
          <Text color={color.chateauGrey}>
            {format(addMonths(month?.toDate?.(), -1), 'MMMM')}
          </Text>
        </View>
        <View backgroundColor={color.black25} style={[styles.gadientLine]} />
      </TouchableOpacity>
      <View style={[styles.container]}>
        <View flex center>
          <Text color={color.white}>{format(month.toDate(), 'MMMM')}</Text>
        </View>
        <LinearGradientBackground style={styles.gadientLine} />
      </View>
      <TouchableOpacity
        style={[styles.container]}
        onPress={onMonthChange(month.toDate(), 1)}>
        <View flex center>
          <Text color={color.chateauGrey}>
            {format(addMonths(month.toDate(), 1), 'MMMM')}
          </Text>
        </View>
        <View backgroundColor={color.black25} style={[styles.gadientLine]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: (size.screen.width - spacing[3] * 2) / 3,
    height: spacing[7],
  },
  gadientLine: {
    width: '100%',
    height: 2,
  },
  opacity: {
    opacity: 0.25,
  },
});
