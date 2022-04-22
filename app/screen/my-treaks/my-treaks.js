import React, {useLayoutEffect} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {MonthlyView} from './components/monthly-view';
import {useNavigation} from '@react-navigation/native';
import {color, size, spacing} from '../../theme';

import {StyleSheet} from 'react-native';
import {Screen} from '../components';
import {image} from '../../assets/image';

export function MyTreacksScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'My Treaks',
    });
  }, [navigation]);

  return (
    <Screen style={styles.container}>
      <View row backgroundColor={color.black25} style={styles.aimSection}>
        <Image source={image.aim} style={size.aimImage} />
        <View style={styles.content} centerV>
          <Text color={color.white}>Current streack: 1</Text>
          <Text color={color.chateauGrey}>Longest streack: 2</Text>
        </View>
      </View>
      <View>
        <MonthlyView />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing[4],
    paddingHorizontal: spacing[3],
  },
  aimSection: {
    borderRadius: spacing[3],
    padding: spacing[2],
    marginBottom: spacing[5],
  },
  content: {
    marginHorizontal: spacing[3],
  },
});
