import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MiniPlayer} from './common/mini-player';
import {ReminderScreen} from '../screen';
import {HeaderStyle, MenuButton} from '../screen/components';
import {color} from '../theme';

const Stack = createStackNavigator();

export function ReminderStack() {
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
          name="reminder"
          component={ReminderScreen}
          options={HeaderStyle}
        />
      </Stack.Navigator>
    </>
  );
}
