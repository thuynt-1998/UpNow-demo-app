import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import {TransitionPresets} from '@react-navigation/stack';
import {Screen} from '../components';
export function Modal() {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...TransitionPresets.ModalPresentationIOS,
    });
  }, [navigation]);
  return (
    <Screen backgroundColor="white">
      <Text>Modal</Text>
    </Screen>
  );
}
