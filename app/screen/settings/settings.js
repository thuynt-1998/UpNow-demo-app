import React from 'react';
import {Colors, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import {usePlayerContext} from '../../context/player-context';
import {color, spacing} from '../../theme';
import {LinearGradientBackground, Screen, SearchHeader} from '../components';
import {StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useIsDrawerOpen} from '@react-navigation/drawer';

const data = [
  {label: 'red', value: [color.redOrange, color.tangerineOrange]},
  {label: 'pink', value: [color.wildRed, color.roseRed]},
  {label: 'orange', value: [color.neonOrange, color.tangerineYellow]},
  {label: 'green', value: [color.elfGreen, color.kellyGreen]},
  {label: 'cian', value: [color.turquoiseBlue, color.brightTurquoiseBlue]},
  {label: 'blue', value: [color.dodgerBlue, color.cornflowerBlue]},
  {label: 'purple', value: [color.mediumSlateBlue, color.slateBlue]},
  {label: 'black', value: [color.russianGrey, color.biscayblue]},
];
export function SettingsScreen() {
  const {
    linearGradientContext: {linearGradientColor, onChange},
  } = usePlayerContext();
  const [isColorsOpen, setColorsOpen] = React.useState(false);
  const isFocus = useIsFocused();
  const isDrawerOpen = useIsDrawerOpen();
  React.useEffect(() => {
    (!isFocus || isDrawerOpen) && setColorsOpen(false);
  }, [isFocus, isDrawerOpen]);
  return (
    <Screen>
      <View row centerV style={styles.selectColorContainer}>
        <Text color={color.white}>Selected color:</Text>
        <View flex>
          <SearchHeader
            data={data}
            inputContainerStyle={styles.inputContainer}
            renderInput={onLayout => (
              <View row>
                <TouchableOpacity
                  onPress={() => {
                    setColorsOpen(!isColorsOpen);
                    onLayout?.();
                  }}>
                  <LinearGradientBackground
                    style={styles.selectLinearGradient}
                    colors={linearGradientColor}
                  />
                </TouchableOpacity>
              </View>
            )}
            isShow={isColorsOpen}
            contentContainerStyle={styles.contentContainer}
            dropdownStyle={styles.dropdown}
            dropdownItem={item => (
              <TouchableOpacity
                style={{
                  margin: spacing[1],
                }}
                onPress={() => {
                  onChange?.(item?.value);
                  setColorsOpen(false);
                }}>
                <LinearGradientBackground
                  style={styles.item}
                  colors={item?.value}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  selectColorContainer: {
    marginHorizontal: spacing[3],
  },
  dropdown: {
    marginHorizontal: spacing[4],
    backgroundColor: Colors.black25,
  },
  selectLinearGradient: {
    width: spacing[7],
    height: spacing[7],
    borderRadius: spacing[7] / 2,
  },
  item: {
    width: spacing[5],
    height: spacing[5],
    borderRadius: spacing[5] / 2,
  },
  inputContainer: {
    backgroundColor: color.transparent,
    marginTop: -spacing[5],
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
