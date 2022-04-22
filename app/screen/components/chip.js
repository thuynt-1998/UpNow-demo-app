import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
import {LinearGradientBackground} from './linear-gradient-background';
import {StyleSheet} from 'react-native';
import {color, spacing} from '../../theme';

export function Chip({label, icon, isSelected, onValueChange, style}) {
  return (
    <LinearGradientBackground
      style={[styles.container, style]}
      colors={isSelected ? undefined : [color.black25, color.black25]}>
      <TouchableOpacity
        center
        onPress={onValueChange}
        activeOpacity={1}
        flex
        style={styles.wrapper}>
        <View row>
          <Text color={color.white} style={styles.text}>
            {label}
          </Text>
          {icon}
        </View>
      </TouchableOpacity>
    </LinearGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    borderRadius: spacing[5],
    height: spacing[7],
    justifyContent: 'center',
  },
  wrapper: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  text: {
    fontSize: spacing[4],
  },
});
