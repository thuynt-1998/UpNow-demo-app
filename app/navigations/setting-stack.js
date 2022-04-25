import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SettingsScreen} from '../screen';
import {color} from '../theme';
import {MenuButton} from '../screen/components';

const Stack = createStackNavigator();

export function SettingsStack() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerLeft: () => <MenuButton />,
          headerTransparent: true,
          cardStyle: {
            backgroundColor: color.transparent,
          },
        }}>
        <Stack.Screen
          name="settings"
          component={SettingsScreen}
          options={{title: null}}
        />
      </Stack.Navigator>
    </>
  );
}
