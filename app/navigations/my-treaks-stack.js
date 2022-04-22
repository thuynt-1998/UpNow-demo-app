import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MiniPlayer} from './common/mini-player';
import {MyTreacksScreen, ReminderScreen} from '../screen';
import {HeaderStyle, MenuButton} from '../screen/components';
import {color} from '../theme';

const Stack = createStackNavigator();

export function MyTreaksStack() {
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
          name="myTreaks"
          component={MyTreacksScreen}
          options={HeaderStyle}
        />
      </Stack.Navigator>
    </>
  );
}
