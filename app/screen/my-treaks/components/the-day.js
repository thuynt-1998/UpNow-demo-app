import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {color, size, spacing} from '../../../theme';
import {LinearGradientBackground} from '../../components';
const SIZE = (size.screen.width - spacing[3] * 2) / 7;

export function TheDay({date, state, marking}) {
  const Container =
    marking?.startingDay || marking?.endingDay
      ? LinearGradientBackground
      : View;

  const renderBackgroundColor = selected =>
    selected ? color.black25 : color.transparent;

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.selectedLeftContainer} row>
        <View
          flex
          backgroundColor={renderBackgroundColor(
            marking?.selected || marking?.endingDay,
          )}
        />
        <View
          flex
          backgroundColor={renderBackgroundColor(
            marking?.selected || marking?.startingDay,
          )}
        />
      </View>
      <Container style={styles.activeBackground}>
        <Text color={state === 'disabled' ? color.chateauGrey : color.white}>
          {date?.day}
        </Text>
      </Container>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: size.day.height,
  },
  activeBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: size.day.width / 2,
    ...size.day,
    alignSelf: 'center',
  },
  selectedLeftContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
