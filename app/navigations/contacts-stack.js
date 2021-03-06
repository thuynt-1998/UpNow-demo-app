import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ContactListScreen, Modal} from '../screen';
import {HeaderStyle, MenuButton} from '../screen/components';
import {color} from '../theme';

const Stack = createStackNavigator();

export function ContactsStack() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerLeft: () => <MenuButton />,
          headerTransparent: true,
          cardStyle: {
            backgroundColor: color.transparent,
          },
          gestureEnabled: true,
          cardOverlayEnabled: true,
        }}
        mode="modal">
        <Stack.Screen
          name="contacts"
          component={ContactListScreen}
          options={HeaderStyle}
        />
        <Stack.Screen name="modal" component={Modal} options={HeaderStyle} />
      </Stack.Navigator>
    </>
  );
}
